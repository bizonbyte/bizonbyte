import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './components/ContactForm';
import ClientLogos from './components/ClientLogos';
import Section from './components/Section';
import Surface from './components/Surface';

const buildItems = [
  {
    number: '01',
    title: 'Custom web applications',
    description:
      'Purpose-built tools for your internal workflows — portals, dashboards, and management systems that fit exactly how your team works.',
  },
  {
    number: '02',
    title: 'Integrations and automation',
    description:
      'Connect your existing systems and eliminate manual data entry — from ERP integrations to automated document processing.',
  },
  {
    number: '03',
    title: 'Data and AI tooling',
    description:
      'Where it makes sense: pipelines, dashboards, and AI-powered features that turn your data into decisions your team can act on.',
  },
];

const engagementSteps = [
  {
    number: '1',
    timeframe: 'Week 1',
    title: 'Scope',
    description:
      "We map your bottleneck, agree on scope, and confirm the right technical approach. If software isn't the answer, we tell you.",
  },
  {
    number: '2',
    timeframe: 'Weeks 2–8',
    title: 'Build',
    description:
      'One point of contact — the engineer writing the code. Weekly check-ins, no account managers in between.',
  },
  {
    number: '3',
    timeframe: 'Week 12',
    title: 'Deploy',
    description:
      'Deployed in your environment. Documented. Your team can run it without us.',
  },
];

const contactPoints = [
  'Direct response within one business day',
  'You speak to the engineer, not an account manager',
  'Based in Amsterdam, available throughout the Netherlands',
];

export default function Home() {
  return (
    <>
      <Section spacing="default" className="hero-section relative overflow-hidden pt-8 md:pt-10">
        <div className="hero-shell relative mx-auto max-w-5xl text-center">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">
            Amsterdam · Custom software
          </p>
          <h1 className="mx-auto mt-6 max-w-[18ch] font-display text-display-xl font-semibold text-white">
            Software that fits <span className="block text-primary-300">the way you work.</span>
          </h1>
          <p className="prose-body mx-auto mt-8 max-w-[62ch] text-lede text-gray-300">
            bizonbyte.nl is an IT consultancy based in Amsterdam. We design, build, and deploy tailor-made software — from web applications and integrations to data pipelines and AI-powered tools — in 6–12 weeks. No 6-month roadmaps. No offshore handoffs. You talk directly to the engineer building your solution.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/bizonbyte/30min"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="calendly_click"
              data-analytics-location="hero"
              className="button-primary text-base focus-visible:outline-primary-300"
            >
              Book a free diagnostic call <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <a
              href="#what-we-build"
              className="button-secondary text-base focus-visible:outline-primary-300"
            >
              See what we build
            </a>
          </div>
          <p className="mt-7 text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
            Amsterdam <span aria-hidden="true" className="px-2 text-accent-400">·</span> 6–12 weeks <span aria-hidden="true" className="px-2 text-accent-400">·</span> Direct engineer contact
          </p>
        </div>
      </Section>

      <Section spacing="tight" band>
        <div className="mx-auto max-w-5xl">
          <ClientLogos />
        </div>
      </Section>

      <Section id="what-we-build" spacing="default">
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">What we build</p>
          <h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-white">
            The right-sized system for the bottleneck in front of you.
          </h2>
          <p className="prose-body-muted mt-6 max-w-2xl text-lg">
            We turn the manual, disconnected, or hard-to-scale part of your operation into software your team can use every day.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {buildItems.map((item) => (
              <li key={item.number}>
                <Surface interactive className="h-full p-6 md:p-7">
                  <span className="font-mono text-sm font-semibold tracking-[0.18em] text-accent-400">
                    {item.number}
                  </span>
                  <h3 className="mt-8 font-display text-display-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="prose-body-muted mt-4 text-base text-gray-300">
                    {item.description}
                  </p>
                </Surface>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm italic text-text-muted">
            Every project ends with working software in your environment — not a slide deck.
          </p>
        </div>
      </Section>

      <Section spacing="default" band>
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">How an engagement works</p>
          <h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-white">
            A short path from bottleneck to working software.
          </h2>
          <p className="prose-body-muted mt-6 max-w-2xl text-lg">
            A focused engagement, clear weekly decisions, and a deployment your team can own.
          </p>

          <ol className="relative mt-12 max-w-4xl">
            <span
              className="absolute bottom-10 left-5 top-10 w-px bg-gradient-to-b from-accent-500/70 via-accent-500/40 to-primary-500/50"
              aria-hidden="true"
            />
            {engagementSteps.map((step, index) => (
              <li
                key={step.number}
                className={index < engagementSteps.length - 1 ? 'relative flex gap-6 pb-12' : 'relative flex gap-6'}
              >
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-500/60 bg-surface-950 font-mono text-sm font-semibold text-accent-400">
                  {step.number}
                </div>
                <div className="pt-0.5">
                  <p className="font-display text-lg font-semibold text-white">
                    {step.timeframe}{' '}
                    <span className="font-sans text-sm font-normal text-text-muted">— {step.title}</span>
                  </p>
                  <p className="prose-body-muted mt-2 max-w-3xl text-base text-gray-300">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section spacing="default">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-eyebrow font-semibold uppercase text-primary-300">Work in practice</p>
          <h2 className="mt-5 text-center font-display text-display-lg font-semibold text-white">
            One bottleneck. A measurable change.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-text-muted">
            One example of what we built and what it changed.
          </p>

          <Surface className="mt-12 p-6 md:p-10">
            <dl className="grid gap-6 text-center md:grid-cols-3 md:gap-8">
              <div>
                <dt className="text-eyebrow font-semibold uppercase text-text-faint">Industry</dt>
                <dd className="mt-2 font-medium text-white">Dutch logistics company</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase text-text-faint">Problem</dt>
                <dd className="mt-2 font-medium text-white">Manual invoice processing</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase text-text-faint">Time to deploy</dt>
                <dd className="mt-2 font-medium text-white">8 weeks</dd>
              </div>
            </dl>

            <div className="mt-10 border-t border-hairline pt-8">
              <p className="prose-body max-w-4xl text-lg text-gray-300">
                The finance team was spending 4+ hours per day extracting data from incoming PDF invoices and entering it into their ERP system. We built a document intelligence pipeline that classifies, extracts, and routes invoice data automatically — handling 94% of invoices without human intervention.
              </p>
              <div className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="font-display text-display-md font-semibold text-primary-300">94%</p>
                  <p className="mt-1 text-sm text-text-muted">of invoices processed without manual input</p>
                </div>
                <div>
                  <p className="font-display text-display-md font-semibold text-primary-300">4 hrs → 20 min</p>
                  <p className="mt-1 text-sm text-text-muted">daily time saved for the finance team</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-hairline pt-6">
              <Link
                href="/blog/waarom-de-meeste-ai-proof-of-concepts-mislukken-in-productie-lessen-uit-12-neder"
                className="text-sm font-medium text-primary-300 transition-colors hover:text-primary-200"
              >
                Read our article on why most AI proof-of-concepts fail in production <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Surface>
          <p className="mt-4 text-center text-xs text-text-faint">Client details anonymised at their request.</p>
        </div>
      </Section>

      <Section spacing="tight">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-eyebrow font-semibold uppercase text-primary-300">Who you&apos;re working with</p>
          <h2 className="mt-5 text-center font-display text-display-lg font-semibold text-white">
            A senior engineer, close to the work.
          </h2>
          <Surface className="mt-12 flex flex-col items-center gap-8 p-7 md:flex-row md:items-start md:p-10">
              <div className="founder-avatar h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-primary-700/70">
              <Image
                src="/founder.jpg"
                alt="Dario Mory, founder of bizonbyte.nl"
                width={96}
                height={96}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-xl font-semibold text-white">Dario Mory</p>
              <p className="mt-1 text-sm text-primary-300">Founder · bizonbyte.nl · Amsterdam</p>
              <p className="prose-body-muted mt-5 text-gray-300">
                Previously led software development at KLM. bizonbyte.nl was founded on a simple idea: mid-market companies deserve software that actually fits their operations, built by people who understand both the technology and the business.
              </p>
              <div className="mt-5">
                <a href="https://www.mory.dev/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted transition-colors hover:text-primary-200">
                  More about Dario <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Surface>
        </div>
      </Section>

      <Section id="contact" spacing="default" band>
        <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-primary-300">Start with the bottleneck</p>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-white">Tell us what is slowing you down.</h2>
            <p className="prose-body-muted mt-6 text-lg text-gray-300">
              We&apos;ll tell you in 30 minutes what the right technical solution is — and what it would cost. No sales deck. No commitment.
            </p>
            <a
              href="mailto:admin@bizonbyte.nl"
              className="mt-5 inline-flex text-sm font-medium text-primary-300 transition-colors hover:text-primary-200"
            >
              admin@bizonbyte.nl
            </a>
            <ul className="mt-8 space-y-4 text-sm text-text-muted">
              {contactPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-accent-400">+</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
