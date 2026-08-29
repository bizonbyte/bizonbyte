import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

export default function NotFoundContent() {
  return (
    <section className="not-found-shell">
      <div className="not-found-glow" aria-hidden="true" />
      <div className="not-found-inner">
        <p className="text-eyebrow text-primary-300">404 / PAGE NOT FOUND</p>

        <div className="not-found-mascot" role="img" aria-label="A small Bizonbyte bison that is looking for the missing page">
          <span className="not-found-streak not-found-streak-one" aria-hidden="true" />
          <span className="not-found-streak not-found-streak-two" aria-hidden="true" />
          <span className="not-found-face">X_X</span>
        </div>

        <h1 className="mt-8 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
          That page wandered off.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-primary-100/70 sm:text-lg">
          The link is missing or the page has moved. Let’s get you back to useful software conversations.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            <FaArrowLeft aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
            Back to bizonbyte.nl
          </Link>
          <Link href="/blog" className="button-secondary">
            Read the blog
          </Link>
          <a
            href="https://calendly.com/bizonbyte/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            <FaCalendarAlt aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
