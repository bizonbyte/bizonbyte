import React, { ReactNode } from 'react';

type Spacing = 'tight' | 'default';

interface SectionProps {
  children: ReactNode;
  id?: string;
  spacing?: Spacing;
  /** Muted band background, used to separate a section from its neighbours. */
  band?: boolean;
  className?: string;
}

const spacingClass: Record<Spacing, string> = {
  tight: 'py-12 md:py-16',
  default: 'py-20 md:py-28',
};

/**
 * One container for every section. Vertical rhythm comes from padding only —
 * no margins — so gaps never double up between adjacent sections.
 */
export default function Section({
  children,
  id,
  spacing = 'default',
  band = false,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full ${spacingClass[spacing]} ${band ? 'section-band' : ''} ${className}`}
    >
      <div className="mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}
