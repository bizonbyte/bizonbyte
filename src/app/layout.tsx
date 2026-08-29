import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import Footer from './components/Footer';
import SiteHeader from './components/SiteHeader';
import { fontVariables, inter } from './fonts';
import '@/app/globals.css';

const description =
  'Bizonbyte is an Amsterdam IT consultancy building custom software for Dutch companies that have outgrown off-the-shelf tools — web applications, integrations and data tooling, deployed in 6–12 weeks.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bizonbyte.nl'),
  title: {
    default: 'Bizonbyte — Custom software for Dutch companies | Amsterdam',
    template: '%s — Bizonbyte',
  },
  description,
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_NL',
    url: 'https://bizonbyte.nl',
    siteName: 'Bizonbyte',
    title: 'Bizonbyte — Custom software for Dutch companies',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bizonbyte — Custom software for Dutch companies',
    description,
  },
};

interface Props {
  children?: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={fontVariables}>
      <body className={`${inter.className} font-sans`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
