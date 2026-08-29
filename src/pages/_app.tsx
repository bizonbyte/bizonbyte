import { AppProps } from 'next/app';
import Footer from '@/app/components/Footer';
import Analytics from '@/app/components/Analytics';
import LocaleAttribute from '@/app/components/LocaleAttribute';
import SiteHeader from '@/app/components/SiteHeader';
import { inter } from '@/app/fonts';
import '@/app/globals.css';
import '@/app/blog.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} flex min-h-screen flex-col`}>
      <Analytics />
      <LocaleAttribute />
      <SiteHeader />
      <main className="w-full flex-1 px-4 md:px-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
