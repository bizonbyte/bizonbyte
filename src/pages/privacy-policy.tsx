import Head from 'next/head';
import Link from 'next/link';

const siteUrl = 'https://bizonbyte.nl';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy & cookies — bizonbyte.nl</title>
        <meta name="description" content="Information about contact data, cookies, and optional analytics on bizonbyte.nl." />
        <link rel="canonical" href={`${siteUrl}/privacy-policy`} />
        <link rel="alternate" hrefLang="en-NL" href={`${siteUrl}/privacy-policy`} />
        <link rel="alternate" hrefLang="nl-NL" href={`${siteUrl}/nl/privacy-policy`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/privacy-policy`} />
      </Head>
      <article className="mx-auto w-full max-w-3xl px-5 py-16 text-text-secondary sm:px-8 md:py-24">
      <p className="text-eyebrow font-semibold uppercase text-primary-300">bizonbyte.nl</p>
      <h1 className="mt-4 font-display text-display-lg font-semibold text-white">Privacy & cookies</h1>
      <p className="prose-body mt-6 text-lg">
        This page explains what happens when you contact bizonbyte.nl through this website or choose to allow optional analytics.
      </p>

      <div className="prose-body-muted mt-12 space-y-8 text-base">
        <section>
          <h2 className="font-display text-display-sm font-semibold text-white">Contact form</h2>
          <p className="mt-3">
            When you send a message, we receive the name, email address, subject, and project context you provide. We use this information only to respond to your enquiry and manage the resulting business conversation. Delivery is handled by Loops, our transactional email provider.
          </p>
        </section>

        <section>
          <h2 className="font-display text-display-sm font-semibold text-white">Optional analytics</h2>
          <p className="mt-3">
            Google Analytics is optional. It is loaded with analytics storage denied by default and becomes active only if you select “Accept analytics” in the consent notice. You can decline; the site and contact form continue to work.
          </p>
        </section>

        <section>
          <h2 className="font-display text-display-sm font-semibold text-white">Your choices</h2>
          <p className="mt-3">
            You can withdraw analytics consent by clearing this site’s local storage or using your browser’s site-data controls. For questions about a contact-form submission or your data, email admin@bizonbyte.nl.
          </p>
        </section>

        <section>
          <h2 className="font-display text-display-sm font-semibold text-white">More information</h2>
          <p className="mt-3">
            This is a plain-language website notice, not a substitute for legal advice. The exact legal entity, retention periods, and rights process should be reviewed and completed for bizonbyte.nl’s operating setup before relying on this as a formal privacy statement.
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="button-secondary mt-12 inline-flex px-5 py-3 text-sm"
      >
        Back to bizonbyte.nl
      </Link>
      </article>
    </>
  );
}
