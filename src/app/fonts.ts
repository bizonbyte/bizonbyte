import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// Shared by both routers so the App Router homepage and the Pages Router blog
// resolve to the same faces.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const display = localFont({
  src: './fonts/space-grotesk-latin.woff2',
  weight: '500 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
});

export const fontVariables = `${inter.variable} ${display.variable}`;
