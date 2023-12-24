'use client'
import React, { useState, ReactNode } from 'react';
import type { Metadata } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import Footer from './components/Footer';
import { FaBars } from 'react-icons/fa';
import { Inter } from 'next/font/google';
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] });

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function RootLayout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <html lang="en">
      <head>
        <title>Bizonbyte | Leading AI & Tech Solutions in the Netherlands</title>
        <meta name='description' content='Using AI and modern technologies, we deliver customized GPT solutions and consulting services. Our dedicated team in the Netherlands specializes in innovative development, steering businesses towards successful digital transformation.' />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module" async></script>
      </head>
      <body className={inter.className}>
        <main className="min-h-screen items-center justify-between">
          <div className="z-10 bg-[#00000033] w-full flex items-center justify-between text-md px-16 md:px-24 py-16">
            {/* Logo */}
            <Link href="/">
              <Image src="/logo.svg" alt="Bizon Logo" width={84} height={37} priority />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex">
              <Link href="/" className="hover:text-[#FA5700] transition-colors duration-200">Home</Link>
              <Link href="/blog" className="hover:text-[#FA5700] ml-4 transition-colors duration-200">Blog</Link>
            </div>

            {/* Burger Menu Icon */}
            <div className="lg:hidden hamburger" onClick={toggleMenu}>
              <FaBars size={24} />
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : 'closed'}`}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
              {/* Add other links as needed */}
            </div>
          </div>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
