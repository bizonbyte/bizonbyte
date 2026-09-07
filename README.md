This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Production setup

The contact form sends two transactional emails through Loops: one to bizonbyte.nl and one confirmation to the person who submitted the form. Create and publish both Loops templates with these variables:

- Owner notification: `name`, `email`, `subject`, `message`, `requestId`
- Visitor confirmation: `name`, `requestId`

Copy `.env.example` to `.env.local` and set the Loops API key, both published transactional template IDs, and `CONTACT_TO_EMAIL`. Keep the API key server-side and rotate any key that has been shared in chat before using it in production. Slack is not used by the contact flow.

Google Analytics uses measurement ID `G-4R7V57RQV0` and is denied by default until a visitor accepts the consent notice. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if the property changes.

Before sending real mail, add the Loops DNS records shown in the Loops dashboard for `envelope.bizonbyte.nl`: the MX, SPF, DMARC, three DKIM CNAME records, and `_loops-verification` TXT record. Verify the domain in Loops, then add the same environment variables to the production host.

## Outrank publishing pipeline

The Outrank webhook runs a final DeepSeek V4 Flash editorial pass before publishing English content. DeepSeek can make evidence-backed corrections and citation edits by calling Parallel Search once. Set `DEEPSEEK_API_KEY`, `PARALLEL_API_KEY`, `OUTRANK_TARGET_DOMAIN`, `OUTRANK_TIER`, and (if needed) `OUTRANK_POST_PROCESS_TIMEOUT_MS` in the production environment. The default target domain is `bizonbyte.nl`, the default tier is `2`, and the final-pass timeout is 30 seconds.

Articles whose final pass still reports blocking flags are opened as English-only GitHub review PRs under the `outrank/review/` branch prefix. After such a PR is merged, `.github/workflows/translate-merged-outrank-review.yml` generates and commits the Dutch translation. The production `GITHUB_TOKEN` needs contents and pull-request write access, and the repository Actions configuration needs `DEEPSEEK_API_KEY` as a secret with permission to write repository contents.

The focused outbound page is available at `/logistics-automation` for Dutch logistics outreach. UTM parameters can be appended to that URL and are available to GA4 after consent.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
