import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './ContactForm';
import ClientLogos from './ClientLogos';
import Section from './Section';
import StructuredData from './StructuredData';
import Surface from './Surface';
import type { Locale } from '@/lib/locale';

const content = {
  nl: {
    eyebrow: 'Amsterdam · Maatwerksoftware',
    title: 'Software die past bij hoe je werkt.',
    intro: 'bizonbyte.nl ontwerpt, bouwt en implementeert software voor Nederlandse bedrijven die tegen de grenzen van standaardtools aanlopen. Van interne applicaties en koppelingen tot datapijplijnen en AI-workflows — meestal in 6–12 weken.',
    primary: 'Plan een verkennend gesprek',
    secondary: 'Wat we bouwen',
    buildEyebrow: 'Wat we bouwen',
    buildTitle: 'Het juiste systeem voor het knelpunt dat nu voor je ligt.',
    buildIntro: 'We maken het handmatige, versnipperde of moeilijk schaalbare deel van je operatie tot software die je team elke dag kan gebruiken.',
    builds: [['01', 'Interne webapplicaties', 'Portalen, dashboards en managementsystemen die aansluiten op hoe je team echt werkt.'], ['02', 'Koppelingen en automatisering', 'Verbind bestaande systemen en verwijder handmatige data-invoer — van ERP-koppelingen tot documentverwerking.'], ['03', 'Data- en AI-tools', 'Datapijplijnen, dashboards en AI-functies die data vertalen naar beslissingen waar je team mee kan werken.']],
    processEyebrow: 'Hoe een opdracht werkt',
    processTitle: 'Van knelpunt naar werkende software.',
    processIntro: 'Een gerichte opdracht, duidelijke beslissingen per week en een implementatie die je team kan beheren.',
    steps: [['Week 1', 'Scope', 'We brengen het knelpunt in kaart, bepalen de scope en bevestigen de technische aanpak. Als software niet het antwoord is, zeggen we dat.'], ['Week 2–8', 'Bouw', 'Eén aanspreekpunt — de engineer die de code schrijft. Wekelijkse check-ins, zonder accountmanager ertussen.'], ['Week 12', 'Livegang', 'Uitgerold in je omgeving. Gedocumenteerd. Je team kan ermee werken zonder van ons afhankelijk te blijven.']],
    workEyebrow: 'Werk in de praktijk',
    workTitle: 'Eén knelpunt. Een meetbare verandering.',
    workIntro: 'Een geanonimiseerd voorbeeld van wat we bouwden en wat het veranderde.',
    founderEyebrow: 'Met wie je werkt',
    founderTitle: 'Een senior engineer, dicht op het werk.',
    founderRole: 'Oprichter · bizonbyte.nl · Amsterdam',
    founderText: 'Dario leidde eerder softwareontwikkeling bij KLM. bizonbyte.nl is gebouwd vanuit een eenvoudig idee: middelgrote bedrijven verdienen software die echt past bij hun operatie, gemaakt door mensen die zowel de technologie als het bedrijf begrijpen.',
    contactEyebrow: 'Begin met het knelpunt',
    contactTitle: 'Vertel wat je vertraagt.',
    contactText: 'We vertellen je in 30 minuten wat de juiste technische oplossing is — en wat die ongeveer kost. Geen salesdeck. Geen verplichting.',
    points: ['Direct antwoord binnen één werkdag', 'Je spreekt met de engineer, niet met een accountmanager', 'Gevestigd in Amsterdam, actief in heel Nederland'],
  },
};

export default function LocalizedHome({ locale }: { locale: 'nl' }) {
  const c = content[locale];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'bizonbyte.nl',
    url: 'https://bizonbyte.nl/nl/',
    description: c.intro,
    areaServed: 'NL',
    address: { '@type': 'PostalAddress', addressLocality: 'Amsterdam', addressCountry: 'NL' },
    email: 'admin@bizonbyte.nl',
  };

  return (
    <div lang="nl" data-analytics-view="nl_home_view">
      <StructuredData data={jsonLd} />
      <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10">
        <div className="hero-shell relative mx-auto max-w-5xl text-center">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{c.eyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-[18ch] font-display text-display-xl font-semibold text-white">{c.title}</h1>
          <p className="prose-body mx-auto mt-8 max-w-[62ch] text-lede text-gray-300">{c.intro}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://calendly.com/bizonbyte/30min" target="_blank" rel="noopener noreferrer" data-analytics-event="calendly_click" data-analytics-location="nl-hero" className="button-primary">{c.primary} <span aria-hidden="true" className="ml-2">→</span></a>
            <a href="#what-we-build" className="button-secondary">{c.secondary}</a>
          </div>
          <p className="mt-7 text-xs font-medium uppercase tracking-[0.12em] text-text-muted">Amsterdam <span aria-hidden="true" className="px-2 text-accent-400">·</span> 6–12 weken <span aria-hidden="true" className="px-2 text-accent-400">·</span> Direct contact met de engineer</p>
          <p className="mt-4 text-sm text-text-muted">
            Bouwopdrachten starten bij <span className="font-semibold text-primary-200">€5.000</span>; productieklare workflowplatforms liggen meestal tussen <span className="font-semibold text-primary-200">€30.000–€60.000</span>.{' '}
            <Link href="/nl/prijzen" className="font-medium text-primary-300 transition-colors hover:text-primary-200">Bekijk transparante prijzen →</Link>
          </p>
        </div>
      </Section>

      <Section spacing="tight" band><div className="mx-auto max-w-5xl"><ClientLogos locale="nl" /></div></Section>

      <Section id="what-we-build" spacing="default"><div className="mx-auto max-w-5xl"><p className="text-eyebrow font-semibold uppercase text-primary-300">{c.buildEyebrow}</p><h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-white">{c.buildTitle}</h2><p className="prose-body-muted mt-6 max-w-2xl text-lg">{c.buildIntro}</p><ul className="mt-12 grid gap-5 md:grid-cols-3">{c.builds.map(([number, title, description]) => <li key={number}><Surface interactive className="h-full p-6 md:p-7"><span className="font-mono text-sm font-semibold tracking-[0.18em] text-accent-400">{number}</span><h3 className="mt-8 font-display text-display-sm font-semibold text-white">{title}</h3><p className="prose-body-muted mt-4 text-base text-gray-300">{description}</p></Surface></li>)}</ul><p className="mt-7 text-sm italic text-text-muted">Elke opdracht eindigt met werkende software in je omgeving — geen slide deck.</p></div></Section>

      <Section spacing="default" band><div className="mx-auto max-w-5xl"><p className="text-eyebrow font-semibold uppercase text-primary-300">{c.processEyebrow}</p><h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-white">{c.processTitle}</h2><p className="prose-body-muted mt-6 max-w-2xl text-lg">{c.processIntro}</p><ol className="relative mt-12 max-w-4xl"><span className="absolute bottom-10 left-5 top-10 w-px bg-gradient-to-b from-accent-500/70 via-accent-500/40 to-primary-500/50" aria-hidden="true" />{c.steps.map(([timeframe, title, description], index) => <li key={timeframe} className={index < c.steps.length - 1 ? 'relative flex gap-6 pb-12' : 'relative flex gap-6'}><div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-500/60 bg-surface-950 font-mono text-sm font-semibold text-accent-400">{index + 1}</div><div><p className="font-display text-lg font-semibold text-white">{timeframe} <span className="font-sans text-sm font-normal text-text-muted">— {title}</span></p><p className="prose-body-muted mt-2 max-w-3xl text-base text-gray-300">{description}</p></div></li>)}</ol></div></Section>

      <Section spacing="default"><div className="mx-auto max-w-5xl"><p className="text-center text-eyebrow font-semibold uppercase text-primary-300">{c.workEyebrow}</p><h2 className="mt-5 text-center font-display text-display-lg font-semibold text-white">{c.workTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-center text-text-muted">{c.workIntro}</p><Surface className="mt-12 p-6 md:p-10"><dl className="grid gap-6 text-center md:grid-cols-3 md:gap-8">{[['Sector', 'Nederlands logistiek bedrijf'], ['Probleem', 'Handmatige factuurverwerking'], ['Doorlooptijd', '8 weken']].map(([label, value]) => <div key={label}><dt className="text-eyebrow font-semibold uppercase text-text-faint">{label}</dt><dd className="mt-2 font-medium text-white">{value}</dd></div>)}</dl><div className="mt-10 border-t border-hairline pt-8"><p className="prose-body max-w-4xl text-lg text-gray-300">Het financiële team besteedde dagelijks meer dan vier uur aan het uitlezen van PDF-facturen en het invoeren ervan in het ERP-systeem. De document-intelligence-pijplijn verwerkte 94% van de facturen zonder menselijke tussenkomst en bracht die dagelijkse tijd terug naar 20 minuten.</p><div className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2"><div><p className="font-display text-display-md font-semibold text-primary-300">94%</p><p className="mt-1 text-sm text-text-muted">zonder handmatige invoer</p></div><div><p className="font-display text-display-md font-semibold text-primary-300">4 uur → 20 min</p><p className="mt-1 text-sm text-text-muted">dagelijkse tijd bespaard</p></div></div></div><div className="mt-8 border-t border-hairline pt-6"><Link href="/nl/cases/factuurautomatisering" className="text-sm font-medium text-primary-300 transition-colors hover:text-primary-200">Lees de case study →</Link></div></Surface><p className="mt-4 text-center text-xs text-text-faint">Klantdetails zijn op verzoek geanonimiseerd.</p></div></Section>

      <Section spacing="tight"><div className="mx-auto max-w-5xl"><p className="text-center text-eyebrow font-semibold uppercase text-primary-300">{c.founderEyebrow}</p><h2 className="mt-5 text-center font-display text-display-lg font-semibold text-white">{c.founderTitle}</h2><Surface className="mt-12 flex flex-col items-center gap-8 p-7 md:flex-row md:items-start md:p-10"><div className="founder-avatar h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-primary-700/70"><Image src="/founder.jpg" alt="Dario Mory, oprichter van bizonbyte.nl" width={96} height={96} className="h-full w-full object-cover object-top" /></div><div className="text-center md:text-left"><p className="font-display text-xl font-semibold text-white">Dario Mory</p><p className="mt-1 text-sm text-primary-300">{c.founderRole}</p><p className="prose-body-muted mt-5 text-gray-300">{c.founderText}</p><div className="mt-5"><a href="https://www.mory.dev/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted transition-colors hover:text-primary-200">Meer over Dario <span aria-hidden="true">→</span></a></div></div></Surface></div></Section>

      <Section id="contact" spacing="default" band><div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16"><div><p className="text-eyebrow font-semibold uppercase text-primary-300">{c.contactEyebrow}</p><h2 className="mt-5 font-display text-display-lg font-semibold text-white">{c.contactTitle}</h2><p className="prose-body-muted mt-6 text-lg text-gray-300">{c.contactText}</p><a href="mailto:admin@bizonbyte.nl" className="mt-5 inline-flex text-sm font-medium text-primary-300 transition-colors hover:text-primary-200">admin@bizonbyte.nl</a><ul className="mt-8 space-y-4 text-sm text-text-muted">{c.points.map((point) => <li key={point} className="flex gap-3"><span aria-hidden="true" className="font-semibold text-accent-400">+</span><span>{point}</span></li>)}</ul></div><ContactForm locale="nl" /></div></Section>
    </div>
  );
}
