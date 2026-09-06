import Head from 'next/head';
import Link from 'next/link';

const siteUrl = 'https://bizonbyte.nl';

export default function DutchPrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy & cookies — bizonbyte.nl</title>
        <meta name="description" content="Informatie over contactgegevens, cookies en optionele analytics op bizonbyte.nl." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${siteUrl}/nl/privacy-policy`} />
        <link rel="alternate" hrefLang="en-NL" href={`${siteUrl}/privacy-policy`} />
        <link rel="alternate" hrefLang="nl-NL" href={`${siteUrl}/nl/privacy-policy`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/privacy-policy`} />
      </Head>
      <article className="mx-auto w-full max-w-3xl px-5 py-16 text-text-secondary sm:px-8 md:py-24">
        <p className="text-eyebrow font-semibold uppercase text-primary-300">bizonbyte.nl</p>
        <h1 className="mt-4 font-display text-display-lg font-semibold text-white">Privacy & cookies</h1>
        <p className="prose-body mt-6 text-lg">
          Op deze pagina lees je wat er gebeurt wanneer je contact opneemt met bizonbyte.nl of optionele analytics toestaat.
        </p>

        <div className="prose-body-muted mt-12 space-y-8 text-base">
          <section>
            <h2 className="font-display text-display-sm font-semibold text-white">Contactformulier</h2>
            <p className="mt-3">
              Wanneer je een bericht verstuurt, ontvangen we de naam, het e-mailadres, het onderwerp en de projectcontext die je invult. We gebruiken deze gegevens alleen om te reageren en het zakelijke gesprek te beheren. De e-mailbezorging loopt via Loops, onze leverancier voor transactionele e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-semibold text-white">Optionele analytics</h2>
            <p className="mt-3">
              Google Analytics is optioneel. Analytics-opslag staat standaard uit en wordt alleen actief wanneer je kiest voor ‘Analytics accepteren’. Je kunt weigeren; de website en het contactformulier blijven werken.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-semibold text-white">Jouw keuzes</h2>
            <p className="mt-3">
              Je kunt toestemming voor analytics intrekken door de lokale opslag van deze site te wissen of de sitegegevens in je browser te verwijderen. Voor vragen over een contactformulier of je gegevens kun je mailen naar admin@bizonbyte.nl.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm font-semibold text-white">Meer informatie</h2>
            <p className="mt-3">
              Dit is een begrijpelijke website-mededeling en geen vervanging voor juridisch advies. De juridische entiteit, bewaartermijnen en procedure voor privacyrechten moeten worden gecontroleerd en aangevuld voor de bedrijfsvoering van bizonbyte.nl voordat dit als formeel privacybeleid wordt gebruikt.
            </p>
          </section>
        </div>

        <Link href="/nl" className="button-secondary mt-12 inline-flex px-5 py-3 text-sm">
          Terug naar bizonbyte.nl
        </Link>
      </article>
    </>
  );
}
