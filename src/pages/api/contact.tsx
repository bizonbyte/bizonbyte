import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  website?: unknown
}

type LoopsResponse = {
  success?: boolean
  message?: string
}

const LOOPS_TRANSACTIONAL_URL = 'https://app.loops.so/api/v1/transactional'
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

const requestLog = new Map<string, number[]>()

function getClientAddress(req: NextApiRequest) {
  const forwarded = req.headers['x-forwarded-for']
  const address = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return address?.trim() || req.socket.remoteAddress || 'unknown'
}

function isRateLimited(address: string) {
  const now = Date.now()
  const recentRequests = (requestLog.get(address) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(address, recentRequests)
    return true
  }

  recentRequests.push(now)
  requestLog.set(address, recentRequests)
  return false
}

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendTransactionalEmail(
  transactionalId: string,
  email: string,
  dataVariables: Record<string, string>,
  requestId: string
) {
  const response = await fetch(LOOPS_TRANSACTIONAL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `${requestId}:${transactionalId}`,
    },
    body: JSON.stringify({
      transactionalId,
      email,
      dataVariables,
      addToAudience: false,
    }),
  })

  let responseBody: LoopsResponse = {}
  try {
    responseBody = (await response.json()) as LoopsResponse
  } catch {
    // Loops can return an empty response body for some errors.
  }

  if (!response.ok || responseBody.success === false) {
    throw new Error(responseBody.message || `Loops request failed with ${response.status}`)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const requestId = crypto.randomUUID()
  const clientAddress = getClientAddress(req)

  if (isRateLimited(clientAddress)) {
    return res.status(429).json({
      message: 'Too many messages from this connection. Please try again later.',
    })
  }

  const payload = (req.body || {}) as ContactPayload
  const name = asTrimmedString(payload.name)
  const email = asTrimmedString(payload.email).toLowerCase()
  const subject = asTrimmedString(payload.subject)
  const message = asTrimmedString(payload.message)
  const website = asTrimmedString(payload.website)

  // Quietly accept honeypot submissions so automated senders do not learn the rule.
  if (website) {
    return res.status(200).json({ message: 'Message sent successfully.' })
  }

  if (!name || name.length > 120) {
    return res.status(400).json({ message: 'Please enter your name.' })
  }

  if (!isValidEmail(email) || email.length > 254) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (!message || message.length > 5000) {
    return res.status(400).json({ message: 'Please tell us a little about your project.' })
  }

  // Record lead in Loops if configured
  if (process.env.LOOPS_API_KEY) {
    try {
      await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          eventName: 'contact_form_submission',
          eventProperties: {
            name,
            subject: subject || 'New contact inquiry',
            message,
          },
        }),
      })
    } catch (err) {
      console.warn('Loops event sync failed:', err)
    }
  }

  return res.status(200).json({
    message: 'Thanks — we received your message and will reply within one business day.',
  })
}
