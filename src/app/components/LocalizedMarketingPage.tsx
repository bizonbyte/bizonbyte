import Link from 'next/link';
import ContactForm from './ContactForm';
import Section from './Section';
import StructuredData from './StructuredData';
import Surface from './Surface';
import type { Locale } from '@/lib/locale';

export type MarketingPageKind = 'pricing' | 'logistics' | 'comparison' | 'case';

interface LocalizedMarketingPageProps {
  locale: Locale;
  kind: MarketingPageKind;
}

const calendlyHref = 'https://calendly.com/bizonbyte/30min';

const copy = {
  en: {
    pricing: {
      eyebrow: 'Pricing',
      title: 'What custom software costs when it has to work in production.',
      intro: 'The useful answer is a project range, not a day rate. We price around the workflow, the systems it touches, and the operational risk that has to be removed.',
      cta: 'Discuss your workflow',
      secondary: 'See how an engagement works',
      budgetBands: [
        ['Paid diagnostic sprint', 'Map the workflow, constraints, and a buildable first scope', '€1,500–€3,000', '3–5 business days'],
        ['Focused integration or automation', 'One system, such as a WMS, TMS, ERP, or finance workflow', '€5,000–€15,000', '1–3 weeks'],
        ['Workflow MVP', 'A narrow, usable first release around one operational bottleneck', '€15,000–€35,000', '3–6 weeks'],
        ['Production workflow platform', 'Multiple roles, systems, exceptions, and production ownership', '€30,000–€60,000', '6–10 weeks'],
        ['AI-driven data or workflow system', 'Document intelligence, data pipelines, and operational safeguards', '€35,000–€85,000+', '6–12 weeks'],
      ],
      tableTitle: 'What moves the range',
      table: [
        ['Number of systems', 'A single controlled input is simpler than a workflow crossing ERP, email, storage, and finance tools.'],
        ['Exception handling', 'The happy path is rarely the production requirement. Exceptions, review queues, and fallbacks affect scope.'],
        ['Deployment and ownership', 'Security, hosting, monitoring, documentation, and handover are part of a system that can actually be owned.'],
      ],
      afterLaunchTitle: 'After launch',
      support: 'Ongoing support: €600–€1,200/month, cancel monthly.',
      consulting: 'Ad-hoc senior consulting: €120–€160/hour.',
      pricingNote: 'These are public planning ranges, not bait-and-switch “from” prices. Final scope is confirmed after the diagnostic; hosting, third-party licences, and VAT are separate where applicable.',
      speedNote: 'LLMs make implementation faster. They do not remove the work of getting access to real systems, validating edge cases, securing the deployment, or handing it over. The shorter ranges above describe a focused first release; broader production hardening is scoped openly.',
      note: 'We will give you an indicative range after understanding the workflow. If software is not the right answer, we will say so before a build starts.',
    },
  },
  nl: {
    pricing: {
      eyebrow: 'Prijzen',
      title: 'Wat kost maatwerksoftware als het in productie moet werken?',
      intro: 'Het nuttige antwoord is een projectbandbreedte, geen dagtarief. We prijzen op basis van de workflow, de systemen die gekoppeld moeten worden en het operationele risico dat moet verdwijnen.',
      cta: 'Bespreek je workflow',
      secondary: 'Bekijk onze werkwijze',
      budgetBands: [
        ['Betaalde diagnosticsprint', 'De workflow, beperkingen en een realistische eerste scope in kaart brengen', '€1.500–€3.000', '3–5 werkdagen'],
        ['Gerichte integratie of automatisering', 'Eén systeem, zoals een WMS, TMS, ERP of financiële workflow', '€5.000–€15.000', '1–3 weken'],
        ['Workflow-MVP', 'Een smalle, bruikbare eerste versie rond één operationeel knelpunt', '€15.000–€35.000', '3–6 weken'],
        ['Productieklaar workflowplatform', 'Meerdere rollen, systemen, uitzonderingen en eigenaarschap in productie', '€30.000–€60.000', '6–10 weken'],
        ['AI-gedreven data- of workflowsysteem', 'Document intelligence, datapijplijnen en operationele waarborgen', '€35.000–€85.000+', '6–12 weken'],
      ],
      tableTitle: 'Wat de bandbreedte bepaalt',
      table: [
        ['Aantal systemen', 'Eén gecontroleerde invoer is eenvoudiger dan een workflow over ERP, e-mail, opslag en financiële systemen.'],
        ['Uitzonderingen', 'De normale route is zelden de volledige productie-eis. Uitzonderingen, controlewachtrijen en fallbacks bepalen de scope.'],
        ['Deployment en eigenaarschap', 'Security, hosting, monitoring, documentatie en overdracht horen bij software die je team echt kan beheren.'],
      ],
      afterLaunchTitle: 'Na de livegang',
      support: 'Doorlopende support: €600–€1.200 per maand, maandelijks opzegbaar.',
      consulting: 'Ad-hoc senior consultancy: €120–€160 per uur.',
      pricingNote: 'Dit zijn openbare planningsbandbreedtes, geen lokprijzen met “vanaf”. De definitieve scope bevestigen we na de diagnosticsprint; hosting, licenties van derden en btw zijn waar van toepassing apart.',
      speedNote: 'LLM’s maken implementatie sneller. Ze nemen niet het werk weg van toegang tot echte systemen, het testen van uitzonderingen, een veilige uitrol of een goede overdracht. De kortere bandbreedtes hierboven gaan uit van een gerichte eerste versie; bredere productiehardening spreken we transparant af.',
      note: 'Na een eerste gesprek over de workflow geven we een indicatieve bandbreedte. Als software niet het juiste antwoord is, zeggen we dat voordat er gebouwd wordt.',
    },
  },
};

function PricingContent({ locale }: { locale: Locale }) {
  const content = copy[locale].pricing;
  return (
    <>
      <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10">
        <div className="hero-shell relative mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{content.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-white">{content.title}</h1>
          <p className="prose-body mt-8 max-w-2xl text-lede text-gray-300">{content.intro}</p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a href={calendlyHref} target="_blank" rel="noopener noreferrer" data-analytics-event="calendly_click" data-analytics-location={`${locale}-pricing`} className="button-primary">
              {content.cta} <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <Link href={locale === 'nl' ? '/nl/logistieke-automatisering' : '/logistics-automation'} className="button-secondary">
              {content.secondary}
            </Link>
          </div>
        </div>
      </Section>

      <Section spacing="tight" band>
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Typische scope' : 'Typical scope'}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.budgetBands.map(([title, description, price, timeframe]) => {
              const typical = title === (locale === 'nl' ? 'Productieklaar workflowplatform' : 'Production workflow platform');
              return (
                <Surface interactive key={title} className={`p-6 ${typical ? 'border-primary-500/45 shadow-[0_0_0_1px_rgb(24_166_128_/_0.12)]' : ''}`}>
                  {typical && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-400">{locale === 'nl' ? 'Meest voorkomende opdracht' : 'Typical engagement'}</p>}
                  <p className="font-display text-display-sm font-semibold text-white">{title}</p>
                  <p className="prose-body-muted mt-4 text-sm">{description}</p>
                  <p className="mt-7 font-display text-display-md font-semibold tracking-[-0.03em] text-primary-300">{price}</p>
                  <p className="mt-2 font-mono text-sm font-semibold tracking-[0.12em] text-accent-400">{timeframe}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-text-faint">{locale === 'nl' ? 'indicatieve doorlooptijd' : 'indicative delivery time'}</p>
                </Surface>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-text-muted">{content.pricingNote}</p>
          <p className="mt-4 max-w-3xl border-l-2 border-accent-500/60 pl-4 text-sm leading-7 text-text-muted">{content.speedNote}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Surface className="p-6">
              <p className="text-eyebrow font-semibold uppercase text-primary-300">{content.afterLaunchTitle}</p>
              <p className="mt-3 text-base text-gray-200">{content.support}</p>
            </Surface>
            <Surface className="p-6">
              <p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Los advieswerk' : 'Ad-hoc advice'}</p>
              <p className="mt-3 text-base text-gray-200">{content.consulting}</p>
            </Surface>
          </div>
        </div>
      </Section>

      <Section spacing="default">
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{content.tableTitle}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface-900/70">
            {content.table.map(([title, description], index) => (
              <div key={title} className={`grid gap-3 p-6 md:grid-cols-[0.35fr_0.65fr] md:gap-10 ${index < content.table.length - 1 ? 'border-b border-hairline' : ''}`}>
                <p className="font-display text-display-sm font-semibold text-white">{title}</p>
                <p className="prose-body-muted text-base text-gray-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" spacing="default" band>
        <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Begin met de workflow' : 'Start with the workflow'}</p>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-white">{locale === 'nl' ? 'Krijg een eerlijke eerste bandbreedte.' : 'Get an honest first range.'}</h2>
            <p className="prose-body-muted mt-6 text-lg text-gray-300">{content.note}</p>
          </div>
          <ContactForm locale={locale} />
        </div>
      </Section>
    </>
  );
}

const logisticsCopy = {
  en: {
    eyebrow: 'For Dutch logistics and operations teams',
    title: 'Stop keying invoices into your ERP by hand.',
    intro: 'We turn one slow, manual back-office workflow into production software your team can use every day — usually in 6–12 weeks.',
    proof: 'A document-intelligence pipeline classified, extracted, and routed invoice data automatically. It handled 94% of invoices without human intervention and reduced daily finance-team time from 4 hours to 20 minutes.',
    questions: [
      ['Do you need a new TMS or WMS?', 'Not always. We first map the bottleneck and check whether an integration, workflow, or focused internal tool solves it with less disruption.'],
      ['Can you connect existing ERP systems?', 'We design around the systems already in the operation. The exact integration depends on the interfaces, data quality, and ownership requirements.'],
      ['What happens after launch?', 'The system is deployed in your environment, documented, monitored where needed, and handed over to the team that owns the process.'],
    ],
  },
  nl: {
    eyebrow: 'Voor Nederlandse logistieke en operationele teams',
    title: 'Stop met facturen handmatig overtypen in je ERP.',
    intro: 'We maken van één trage, handmatige backoffice-workflow productieklare software die je team elke dag kan gebruiken — meestal in 6–12 weken.',
    proof: 'Een document-intelligence-pijplijn classificeerde, extraheerde en routeerde factuurgegevens automatisch. 94% van de facturen werd zonder handmatige tussenkomst verwerkt en de dagelijkse tijd voor het financiële team daalde van 4 uur naar 20 minuten.',
    questions: [
      ['Heb je een nieuw TMS of WMS nodig?', 'Niet altijd. We brengen eerst het knelpunt in kaart en onderzoeken of een koppeling, workflow of gerichte interne tool het probleem met minder verstoring oplost.'],
      ['Kunnen jullie bestaande ERP-systemen koppelen?', 'We ontwerpen rond de systemen die al in de operatie aanwezig zijn. De exacte koppeling hangt af van interfaces, datakwaliteit en eigenaarschap.'],
      ['Wat gebeurt er na de livegang?', 'De software wordt in je omgeving uitgerold, gedocumenteerd, waar nodig gemonitord en overgedragen aan het team dat het proces beheert.'],
    ],
  },
};

function LogisticsContent({ locale }: { locale: Locale }) {
  const content = logisticsCopy[locale];
  const pricingHref = locale === 'nl' ? '/nl/prijzen' : '/pricing';
  const caseHref = locale === 'nl' ? '/nl/cases/factuurautomatisering' : '/case-studies/invoice-automation';
  return (
    <>
      <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10">
        <div className="hero-shell relative mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{content.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-white">{content.title}</h1>
          <p className="prose-body mt-8 max-w-2xl text-lede text-gray-300">{content.intro}</p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a href={calendlyHref} target="_blank" rel="noopener noreferrer" data-analytics-event="calendly_click" data-analytics-location={`${locale}-logistics`} className="button-primary">{locale === 'nl' ? 'Plan een workflowgesprek' : 'Book a workflow fit call'} <span aria-hidden="true" className="ml-2">→</span></a>
            <Link href={pricingHref} className="button-secondary">{locale === 'nl' ? 'Bekijk prijzen' : 'See pricing'}</Link>
          </div>
        </div>
      </Section>
      <Section spacing="tight" band>
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Eén voorbeeld' : 'One example'}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[['94%', locale === 'nl' ? 'van de facturen zonder handmatige invoer' : 'of invoices without manual input'], ['4 uur → 20 min', locale === 'nl' ? 'dagelijkse tijd voor het financiële team' : 'daily finance-team time'], ['8 weken', locale === 'nl' ? 'van scope naar livegang' : 'from scope to deployment']].map(([value, label]) => <Surface key={value} className="p-6"><p className="font-display text-display-md font-semibold text-primary-300">{value}</p><p className="mt-2 text-sm text-text-muted">{label}</p></Surface>)}
          </div>
          <p className="prose-body-muted mt-6 max-w-3xl text-base">{content.proof}</p>
          <Link href={caseHref} className="mt-6 inline-flex text-sm font-medium text-primary-300 transition-colors hover:text-primary-200">{locale === 'nl' ? 'Bekijk de case study →' : 'Read the case study →'}</Link>
        </div>
      </Section>
      <Section spacing="default">
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Veelgestelde vragen' : 'Questions operations teams ask'}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface-900/70">
            {content.questions.map(([question, answer], index) => <div key={question} className={`p-6 md:grid md:grid-cols-[0.38fr_0.62fr] md:gap-10 ${index < content.questions.length - 1 ? 'border-b border-hairline' : ''}`}><h2 className="font-display text-display-sm font-semibold text-white">{question}</h2><p className="prose-body-muted mt-3 text-base md:mt-0">{answer}</p></div>)}
          </div>
        </div>
      </Section>
      <Section id="contact" spacing="default" band>
        <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16"><div><p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Begin met het knelpunt' : 'Start with the bottleneck'}</p><h2 className="mt-5 font-display text-display-lg font-semibold text-white">{locale === 'nl' ? 'Breng ons de traagste stap.' : 'Bring us the slowest step.'}</h2><p className="prose-body-muted mt-6 text-lg text-gray-300">{locale === 'nl' ? 'We zeggen eerlijk of software hier het juiste antwoord is, wat een eerste versie vraagt en hoe je team die kan beheren.' : 'We will tell you whether software is the right answer, what a first version involves, and how your team can own it.'}</p></div><ContactForm locale={locale} /></div>
      </Section>
    </>
  );
}

const comparisonCopy = {
  en: {
    eyebrow: 'A practical decision guide',
    title: 'Custom software or a standard tool?',
    intro: 'The right answer depends on the bottleneck, not on whether custom software sounds more impressive. Use this guide to decide where a focused build is justified.',
    rows: [['Time to first useful result', 'Standard tools can be faster when the workflow already fits. Custom work is useful when configuration has become the bottleneck.'], ['Flexibility', 'Standard tools trade flexibility for repeatability. Custom software can reflect the exceptions your operation actually has.'], ['Ownership', 'A standard tool gives you a vendor roadmap. A custom system gives you more control, but also more responsibility for maintenance.'], ['Integrations', 'If your systems are well supported, configure first. If data still moves through spreadsheets and inboxes, an integration may be the better first step.']],
  },
  nl: {
    eyebrow: 'Een praktisch besliskader',
    title: 'Maatwerksoftware of een standaardtool?',
    intro: 'Het juiste antwoord hangt af van het knelpunt, niet van de vraag of maatwerk indrukwekkender klinkt. Gebruik dit kader om te bepalen wanneer een gerichte bouwopdracht zinvol is.',
    rows: [['Tijd tot eerste resultaat', 'Standaardsoftware kan sneller zijn als de workflow al past. Maatwerk helpt wanneer configuratie het knelpunt is geworden.'], ['Flexibiliteit', 'Standaardtools ruilen flexibiliteit in voor herhaalbaarheid. Maatwerk kan aansluiten op de uitzonderingen die je operatie echt heeft.'], ['Eigenaarschap', 'Een standaardtool geeft je een roadmap van de leverancier. Een eigen systeem geeft meer controle, maar ook meer verantwoordelijkheid voor onderhoud.'], ['Koppelingen', 'Als je systemen goed ondersteund worden, configureer dan eerst. Als data nog door spreadsheets en inboxen gaat, kan een koppeling een betere eerste stap zijn.']],
  },
};

function ComparisonContent({ locale }: { locale: Locale }) {
  const content = comparisonCopy[locale];
  return <>
    <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10"><div className="hero-shell relative mx-auto max-w-5xl"><p className="text-eyebrow font-semibold uppercase text-primary-300">{content.eyebrow}</p><h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-white">{content.title}</h1><p className="prose-body mt-8 max-w-2xl text-lede text-gray-300">{content.intro}</p></div></Section>
    <Section spacing="default" band><div className="mx-auto max-w-5xl"><div className="overflow-hidden rounded-2xl border border-hairline bg-surface-900/70">{content.rows.map(([title, description], index) => <div key={title} className={`grid gap-3 p-6 md:grid-cols-[0.32fr_0.68fr] md:gap-10 ${index < content.rows.length - 1 ? 'border-b border-hairline' : ''}`}><h2 className="font-display text-display-sm font-semibold text-white">{title}</h2><p className="prose-body-muted text-base text-gray-300">{description}</p></div>)}</div><div className="mt-10 flex flex-col gap-4 sm:flex-row"><Link href={locale === 'nl' ? '/nl/prijzen' : '/pricing'} className="button-primary">{locale === 'nl' ? 'Bekijk prijsinformatie' : 'See pricing'} <span aria-hidden="true" className="ml-2">→</span></Link><a href={calendlyHref} target="_blank" rel="noopener noreferrer" data-analytics-event="calendly_click" data-analytics-location={`${locale}-comparison`} className="button-secondary">{locale === 'nl' ? 'Bespreek je workflow' : 'Discuss your workflow'}</a></div></div></Section>
  </>;
}

const caseCopy = {
  en: { eyebrow: 'Anonymized case study', title: 'From four hours of invoice work to twenty minutes.', intro: 'A Dutch logistics finance team was spending more than four hours each day extracting data from PDF invoices and entering it into an ERP system.', proof: 'We built a document-intelligence pipeline that classifies, extracts, and routes invoice data automatically. It handled 94% of invoices without human intervention and was deployed in eight weeks.', labels: ['Industry', 'Problem', 'Time to deploy'], values: ['Dutch logistics company', 'Manual invoice processing', '8 weeks'] },
  nl: { eyebrow: 'Geanonimiseerde case study', title: 'Van vier uur factuurwerk naar twintig minuten.', intro: 'Een financieel team bij een Nederlands logistiek bedrijf besteedde dagelijks meer dan vier uur aan het uitlezen van PDF-facturen en het invoeren ervan in een ERP-systeem.', proof: 'We bouwden een document-intelligence-pijplijn die factuurgegevens automatisch classificeert, extraheert en routeert. 94% van de facturen werd zonder menselijke tussenkomst verwerkt en de software ging in acht weken live.', labels: ['Sector', 'Probleem', 'Doorlooptijd'], values: ['Nederlands logistiek bedrijf', 'Handmatige factuurverwerking', '8 weken'] },
};

function CaseContent({ locale }: { locale: Locale }) {
  const content = caseCopy[locale];
  return <>
    <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10"><div className="hero-shell relative mx-auto max-w-5xl"><p className="text-eyebrow font-semibold uppercase text-primary-300">{content.eyebrow}</p><h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-white">{content.title}</h1><p className="prose-body mt-8 max-w-2xl text-lede text-gray-300">{content.intro}</p></div></Section>
    <Section spacing="default" band><div className="mx-auto max-w-5xl"><Surface className="p-6 md:p-10"><dl className="grid gap-6 text-center md:grid-cols-3 md:gap-8">{content.labels.map((label, index) => <div key={label}><dt className="text-eyebrow font-semibold uppercase text-text-faint">{label}</dt><dd className="mt-2 font-medium text-white">{content.values[index]}</dd></div>)}</dl><div className="mt-10 border-t border-hairline pt-8"><p className="prose-body max-w-4xl text-lg text-gray-300">{content.proof}</p><div className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2"><div><p className="font-display text-display-md font-semibold text-primary-300">94%</p><p className="mt-1 text-sm text-text-muted">{locale === 'nl' ? 'zonder handmatige invoer' : 'without manual input'}</p></div><div><p className="font-display text-display-md font-semibold text-primary-300">4 uur → 20 min</p><p className="mt-1 text-sm text-text-muted">{locale === 'nl' ? 'dagelijkse tijd bespaard' : 'daily time saved'}</p></div></div></div></Surface><p className="mt-4 text-center text-xs text-text-faint">{locale === 'nl' ? 'Klantdetails zijn op verzoek geanonimiseerd.' : 'Client details are anonymized at the client’s request.'}</p></div></Section>
    <Section id="contact" spacing="default"><div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16"><div><p className="text-eyebrow font-semibold uppercase text-primary-300">{locale === 'nl' ? 'Vergelijkbare workflow?' : 'A similar workflow?'}</p><h2 className="mt-5 font-display text-display-lg font-semibold text-white">{locale === 'nl' ? 'Begin met het knelpunt.' : 'Start with the bottleneck.'}</h2><p className="prose-body-muted mt-6 text-lg text-gray-300">{locale === 'nl' ? 'We brengen de huidige route, uitzonderingen en systemen in kaart voordat we software voorstellen.' : 'We map the current route, exceptions, and systems before suggesting software.'}</p></div><ContactForm locale={locale} /></div></Section>
  </>;
}

export default function LocalizedMarketingPage({ locale, kind }: LocalizedMarketingPageProps) {
  const pathname = locale === 'nl' ? `/nl/${kind === 'pricing' ? 'prijzen' : kind === 'logistics' ? 'logistieke-automatisering' : kind === 'comparison' ? 'maatwerk-vs-standaardsoftware' : 'cases/factuurautomatisering'}` : `/${kind === 'pricing' ? 'pricing' : kind === 'logistics' ? 'logistics-automation' : kind === 'comparison' ? 'custom-vs-standard-software' : 'case-studies/invoice-automation'}`;
  const title = kind === 'pricing' ? (locale === 'nl' ? 'Wat kost maatwerksoftware?' : 'What does custom software cost?') : kind === 'logistics' ? (locale === 'nl' ? 'Logistieke automatisering voor Nederlandse teams' : 'Operational automation for Dutch logistics teams') : kind === 'comparison' ? (locale === 'nl' ? 'Maatwerksoftware of standaardsoftware?' : 'Custom software or a standard tool?') : (locale === 'nl' ? 'Case study: factuurautomatisering' : 'Case study: invoice automation');
  const description = kind === 'pricing' ? (locale === 'nl' ? 'Een praktisch besliskader voor de kosten, scope en doorlooptijd van maatwerksoftware.' : 'A practical guide to the scope, cost drivers, and delivery time of custom software.') : kind === 'logistics' ? (locale === 'nl' ? 'Automatiseer factuurverwerking, ERP-koppelingen en logistieke workflows.' : 'Automate invoice processing, ERP integrations, and logistics workflows.') : kind === 'comparison' ? (locale === 'nl' ? 'Wanneer past maatwerksoftware beter dan een standaardtool?' : 'When is custom software a better fit than a standard tool?') : (locale === 'nl' ? 'Een geanonimiseerde case over document intelligence en factuurautomatisering.' : 'An anonymized case study about document intelligence and invoice automation.');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': kind === 'case' ? 'CaseStudy' : 'WebPage',
    name: title,
    description,
    url: `https://bizonbyte.nl${pathname}`,
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', name: 'bizonbyte.nl', url: 'https://bizonbyte.nl' },
  };

  return <div lang={locale} data-analytics-view={`${locale}_${kind}_view`}><StructuredData data={jsonLd} />{kind === 'pricing' ? <PricingContent locale={locale} /> : kind === 'logistics' ? <LogisticsContent locale={locale} /> : kind === 'comparison' ? <ComparisonContent locale={locale} /> : <CaseContent locale={locale} />}</div>;
}
