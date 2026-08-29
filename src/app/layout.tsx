import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import LocaleAttribute from './components/LocaleAttribute';
import SiteHeader from './components/SiteHeader';
import { fontVariables, inter } from './fonts';
import { getLanguageAlternates } from '@/lib/locale';
import '@/app/globals.css';

const description =
  'bizonbyte.nl is an Amsterdam IT consultancy building custom software for Dutch companies that have outgrown off-the-shelf tools — web applications, integrations and data tooling, deployed in 6–12 weeks.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bizonbyte.nl'),
  title: {
    default: 'bizonbyte.nl — Custom software for Dutch companies | Amsterdam',
    template: '%s — bizonbyte.nl',
  },
  description,
  icons: { icon: '/favicon.ico' },
  alternates: { canonical: '/', languages: getLanguageAlternates('/') },
  openGraph: {
    type: 'website',
    locale: 'en_NL',
    url: 'https://bizonbyte.nl',
    siteName: 'bizonbyte.nl',
    title: 'bizonbyte.nl — Custom software for Dutch companies',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bizonbyte.nl — Custom software for Dutch companies',
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
        <Analytics />
        <LocaleAttribute />
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
