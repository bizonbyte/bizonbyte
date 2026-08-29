import React, { ReactNode } from 'react';

interface SurfaceProps {
  children: ReactNode;
  className?: string;
  /** Adds the hover lift used by interactive cards (blog index, links). */
  interactive?: boolean;
}

/**
 * The card treatment, promoted from blog.css so articles and the homepage
 * read as the same publication.
 */
export default function Surface({ children, className = '', interactive = false }: SurfaceProps) {
  return (
    <div
      className={[
        'surface relative overflow-hidden rounded-2xl',
        interactive
          ? 'surface-interactive'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
