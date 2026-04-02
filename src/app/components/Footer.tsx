import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full self-stretch mt-12 border-t border-white/10 bg-[#00000055] text-gray-300">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 py-10 flex flex-col items-center gap-3">
        <div className="text-sm tracking-wide text-gray-300 text-center">
          &copy; {currentYear} Bizonbyte | All Rights Reserved
        </div>
        <address className="not-italic text-sm text-gray-400 text-center">
          Amsterdam, The Netherlands
        </address>
        <Link
          href="/terms-of-service"
          className="text-sm text-gray-300 hover:text-[#93e8d4] transition-colors duration-200 underline underline-offset-4 decoration-white/25 hover:decoration-[#93e8d4]"
        >
          Terms of Service
        </Link>
        <div className="flex items-center gap-3 pt-1">
          <a
            href="https://twitter.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-blue-400 hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-200 flex items-center justify-center"
            aria-label="Twitter"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="https://instagram.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-pink-400 hover:border-pink-400/60 hover:bg-pink-500/10 transition-all duration-200 flex items-center justify-center"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="https://github.com/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:border-white/70 hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/company/bizonbyte"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-blue-400 hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-200 flex items-center justify-center"
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
