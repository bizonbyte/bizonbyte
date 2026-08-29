'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

/**
 * The single site header. Used by both the App Router layout and the Pages
 * Router _app, so navigating between the homepage and the blog does not change
 * the site's chrome.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-transparent bg-surface-950/65 backdrop-blur-md transition-colors duration-200 ${
        scrolled
          ? 'border-primary-900/45 bg-surface-950/90 shadow-[0_8px_30px_rgb(0_0_0_/_0.16)]'
          : ''
      }`}
    >
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-5 py-4 sm:px-8 lg:px-12 lg:py-5">
        <Link href="/" aria-label="bizonbyte.nl — home" className="group flex h-16 w-[4.75rem] shrink-0 items-center">
          <Image
            src="/logo.svg"
            alt="bizonbyte.nl"
            width={76}
            height={65}
            priority
            className="h-auto w-[4.75rem] transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-primary-500/10 hover:text-primary-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://calendly.com/bizonbyte/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="calendly_click"
            data-analytics-location="header"
            className="button-primary min-h-10 rounded-lg px-4 py-2 text-sm"
          >
            <FaCalendarAlt aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-gray-200 transition-colors hover:bg-primary-500/10 hover:text-primary-300 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-primary-900/35 bg-surface-950/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex w-full max-w-container flex-col gap-1 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-gray-200 transition-colors hover:bg-white/5 hover:text-primary-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://calendly.com/bizonbyte/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              data-analytics-event="calendly_click"
              data-analytics-location="mobile-header"
              className="button-primary mt-2 w-full rounded-lg px-4 py-3 text-base"
            >
              <FaCalendarAlt aria-hidden="true" className="mr-2 h-4 w-4" />
              Book a call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
