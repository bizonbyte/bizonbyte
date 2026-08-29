'use client';

import React, { useState } from 'react';
import Spinner from './Spinner';
import { trackEvent } from './Analytics';
import type { Locale } from '@/lib/locale';

const inputClassName =
  'mt-2 w-full rounded-lg border border-hairline bg-surface-900/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-faint/70 outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20';

export default function ContactForm({ locale = 'en' }: { locale?: Locale }) {
  const dutch = locale === 'nl';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        trackEvent('contact_form_submit_success');
        setStatusMessage(dutch
          ? 'Bedankt — we hebben je bericht ontvangen en reageren binnen één werkdag.'
          : 'Thanks — we received your message and will reply within one business day.');
        setIsError(false);
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        trackEvent('contact_form_submit_error', { status: response.status });
        setStatusMessage(data.message || (dutch ? 'Het bericht kon niet worden verzonden.' : 'Failed to send message.'));
        setIsError(true);
      }
    } catch {
      trackEvent('contact_form_submit_error', { status: 'network_error' });
      setStatusMessage(dutch ? 'Er is iets misgegaan.' : 'An error occurred.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="contact-form"
      data-analytics-view="contact_form_view"
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-hairline bg-surface-900/70 p-6 shadow-[0_20px_60px_rgb(0_0_0_/_0.2)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-text-primary">
          {dutch ? 'Naam' : 'Name'}
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className={inputClassName}
          />
        </label>

        <label className="text-sm font-medium text-text-primary">
          {dutch ? 'E-mail' : 'Email'}
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className={inputClassName}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-text-primary">
        {dutch ? 'Waar heb je hulp bij nodig?' : 'What do you need help with?'}
        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
          className={inputClassName}
        />
      </label>

      <div className="absolute h-px w-px overflow-hidden whitespace-nowrap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) => setFormData({ ...formData, website: event.target.value })}
        />
      </div>

      <label className="mt-5 block text-sm font-medium text-text-primary">
        {dutch ? 'Iets meer context' : 'A little more context'}
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className={`${inputClassName} resize-y`}
          rows={5}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary mt-6 w-full px-5 py-3 text-sm disabled:cursor-wait disabled:opacity-70 focus-visible:outline-primary-300"
      >
        {isSubmitting ? <Spinner /> : dutch ? 'Verstuur je bericht' : 'Send your message'}
      </button>

      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-lg border p-3 text-center text-sm font-medium ${
            isError
              ? 'border-red-400/40 bg-red-950/30 text-red-200'
              : 'border-primary-400/40 bg-primary-950/60 text-primary-200'
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
}
