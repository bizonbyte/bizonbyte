import Head from 'next/head';
import Link from 'next/link';

const siteUrl = 'https://bizonbyte.nl';

export default function DutchTermsOfService() {
  return (
    <>
      <Head>
        <title>Algemene voorwaarden — bizonbyte.nl</title>
        <meta name="description" content="Algemene voorwaarden voor het gebruik van bizonbyte.nl en de diensten van bizonbyte." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${siteUrl}/nl/algemene-voorwaarden`} />
        <link rel="alternate" hrefLang="en-NL" href={`${siteUrl}/terms-of-service`} />
        <link rel="alternate" hrefLang="nl-NL" href={`${siteUrl}/nl/algemene-voorwaarden`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/terms-of-service`} />
      </Head>
      <article className="mx-auto w-full max-w-3xl px-5 py-16 text-text-secondary sm:px-8 md:py-24">
        <p className="text-eyebrow font-semibold uppercase text-primary-300">bizonbyte.nl</p>
        <h1 className="mt-4 font-display text-display-lg font-semibold text-white">Algemene voorwaarden</h1>
        <p className="prose-body mt-6 text-lg">
          Deze voorwaarden beschrijven de basisregels voor het gebruik van de website en de diensten van bizonbyte.nl.
        </p>

        <div className="prose-body-muted mt-12 space-y-8 text-base">
          <section><h2 className="font-display text-display-sm font-semibold text-white">1. Aanvaarding</h2><p className="mt-3">Door de website of diensten te gebruiken, ga je akkoord met deze voorwaarden. Als je niet akkoord gaat, gebruik de diensten dan niet.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">2. Wijzigingen</h2><p className="mt-3">We kunnen deze voorwaarden wijzigen. Nieuwe versies gelden vanaf het moment dat ze op deze pagina worden geplaatst.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">3. Verantwoordelijkheid</h2><p className="mt-3">Je bent verantwoordelijk voor het gebruik van de diensten en voor informatie die je aanlevert. Gebruik de diensten niet voor een onrechtmatig doel.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">4. Prijzen en opdrachten</h2><p className="mt-3">Projectscope, planning, prijs en verantwoordelijkheden worden per opdracht afgesproken. Een indicatieve bandbreedte op deze website is geen definitieve offerte.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">5. Aansprakelijkheid</h2><p className="mt-3">Voor zover wettelijk toegestaan is bizonbyte.nl niet aansprakelijk voor indirecte of gevolgschade die voortkomt uit het gebruik van de website of diensten.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">6. Toepasselijk recht</h2><p className="mt-3">Op deze voorwaarden is Nederlands recht van toepassing.</p></section>
          <section><h2 className="font-display text-display-sm font-semibold text-white">7. Contact</h2><p className="mt-3">Vragen over deze voorwaarden kun je sturen naar admin@bizonbyte.nl.</p></section>
        </div>

        <Link href="/nl" className="button-secondary mt-12 inline-flex px-5 py-3 text-sm">
          Terug naar bizonbyte.nl
        </Link>
      </article>
    </>
  );
}
