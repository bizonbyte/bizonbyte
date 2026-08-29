import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';
import Section from '../components/Section';
import Surface from '../components/Surface';

export const metadata: Metadata = {
  title: 'Operational automation for Dutch logistics teams',
  description:
    'Remove manual invoice and document work from Dutch logistics operations with focused software, integrations, and automation.',
};

const calendlyHref = 'https://calendly.com/bizonbyte/30min';

const steps = [
  {
    number: '01',
    title: 'Map the bottleneck',
    description:
      'We understand the current process, systems, and exceptions before suggesting software.',
  },
  {
    number: '02',
    title: 'Build the smallest useful system',
    description:
      'You work directly with the senior engineer building the integration or internal tool.',
  },
  {
    number: '03',
    title: 'Deploy and hand over',
    description:
      'The result runs in your environment, is documented, and is ready for your team to own.',
  },
];

export default function LogisticsAutomationPage() {
  return (
    <div data-analytics-view="outbound_landing_view">
      <Section
        spacing="default"
        className="hero-section relative overflow-hidden pt-8 md:pt-10"
      >
        <div className="hero-shell relative mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">
            For Dutch logistics teams
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-display-xl font-semibold text-white">
            Stop keying invoices into your ERP by hand.
          </h1>
          <p className="prose-body mt-8 max-w-2xl text-lede text-gray-300">
            We turn one slow, manual back-office workflow into production software your team can use every day — usually in 6–12 weeks.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="calendly_click"
              data-analytics-location="logistics-landing"
              className="button-primary"
            >
              Book a 30-minute workflow fit call <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <a href="#contact-form" className="button-secondary">
              Send us the workflow
            </a>
          </div>
        </div>
      </Section>

      <Section spacing="tight" band>
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">One example</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <Surface className="p-6">
              <p className="font-display text-display-md font-semibold text-primary-300">94%</p>
              <p className="mt-2 text-sm text-text-muted">of invoices processed without manual input</p>
            </Surface>
            <Surface className="p-6">
              <p className="font-display text-display-md font-semibold text-primary-300">4 hrs → 20 min</p>
              <p className="mt-2 text-sm text-text-muted">daily finance-team time saved</p>
            </Surface>
            <Surface className="p-6">
              <p className="font-display text-display-md font-semibold text-primary-300">8 weeks</p>
              <p className="mt-2 text-sm text-text-muted">from scope to deployment</p>
            </Surface>
          </div>
          <p className="mt-5 max-w-2xl text-sm text-text-muted">
            We built a document-intelligence pipeline for a Dutch logistics company that classified, extracted, and routed invoice data automatically. Client details are anonymised.
          </p>
        </div>
      </Section>

      <Section spacing="default">
        <div className="mx-auto max-w-5xl">
          <p className="text-eyebrow font-semibold uppercase text-primary-300">How it works</p>
          <h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-white">
            A short path from manual work to a workflow your team owns.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Surface interactive key={step.number} className="p-6">
                <p className="font-mono text-sm font-semibold tracking-[0.18em] text-accent-400">
                  {step.number}
                </p>
                <h3 className="mt-6 font-display text-display-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="prose-body-muted mt-4 text-base text-gray-300">{step.description}</p>
              </Surface>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" spacing="default" band>
        <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-primary-300">Start with the workflow</p>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
              Bring us the slowest part of the process.
            </h2>
            <p className="prose-body-muted mt-6 text-lg text-gray-300">
              We’ll tell you whether software is the right answer, what a first version would involve, and what it would take to put it into production.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </div>
  );
}
