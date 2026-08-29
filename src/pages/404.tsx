import Head from 'next/head';
import NotFoundContent from '@/app/components/NotFoundContent';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page not found — bizonbyte.nl</title>
        <meta name="description" content="This Bizonbyte page could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <NotFoundContent />
    </>
  );
}
