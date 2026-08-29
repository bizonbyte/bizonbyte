import { Html, Head, Main, NextScript } from 'next/document';
import { fontVariables } from '@/app/fonts';

// Applies the shared font variables on <html> so the Pages Router blog
// resolves the same faces as the App Router homepage.
export default function Document() {
  return (
    <Html lang="en" className={fontVariables}>
      <Head />
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
