'use client';

import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useRouter as useCompatRouter } from 'next/compat/router';
import { isDutchPath } from '@/lib/locale';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const appPathname = usePathname();
  const compatRouter = useCompatRouter();
  const pathname = appPathname || compatRouter?.asPath?.split(/[?#]/)[0] || '/';
  const dutch = isDutchPath(pathname);

  return (
    <footer className="w-full self-stretch border-t border-primary-900/45 bg-surface-950/65 text-gray-300">
      <div className="mx-auto flex w-full max-w-container flex-col items-center gap-3 px-5 py-10 sm:px-8 lg:px-12">
        <div className="text-sm tracking-wide text-gray-300 text-center">
          &copy; {currentYear} bizonbyte.nl | {dutch ? 'Alle rechten voorbehouden' : 'All Rights Reserved'}
        </div>
        <address className="not-italic text-sm text-gray-400 text-center">
          {dutch ? 'Amsterdam, Nederland' : 'Amsterdam, The Netherlands'}
        </address>
        <a
          href="mailto:admin@bizonbyte.nl"
          className="text-sm text-gray-300 transition-colors duration-200 hover:text-primary-300"
        >
          admin@bizonbyte.nl
        </a>
        <Link
          href={dutch ? '/nl/algemene-voorwaarden' : '/terms-of-service'}
          className="text-sm text-gray-300 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-primary-300 hover:decoration-primary-300"
        >
          {dutch ? 'Algemene voorwaarden' : 'Terms of Service'}
        </Link>
        <Link
          href={dutch ? '/nl/privacy-policy' : '/privacy-policy'}
          className="text-sm text-gray-300 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-primary-300 hover:decoration-primary-300"
        >
          {dutch ? 'Privacy & cookies' : 'Privacy & cookies'}
        </Link>
        <div className="flex items-center gap-3 pt-1">
          <a
            href="https://twitter.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-900/45 bg-primary-950/20 text-gray-300 transition-all duration-200 hover:border-primary-400/60 hover:bg-primary-500/10 hover:text-primary-300"
            aria-label="Twitter"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="https://instagram.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-900/45 bg-primary-950/20 text-gray-300 transition-all duration-200 hover:border-primary-400/60 hover:bg-primary-500/10 hover:text-primary-300"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="https://github.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-900/45 bg-primary-950/20 text-gray-300 transition-all duration-200 hover:border-primary-400/60 hover:bg-primary-500/10 hover:text-primary-300"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/company/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-900/45 bg-primary-950/20 text-gray-300 transition-all duration-200 hover:border-primary-400/60 hover:bg-primary-500/10 hover:text-primary-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
