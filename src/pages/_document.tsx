import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { fontVariables } from '@/app/fonts';

interface DocumentProps extends DocumentInitialProps {
  locale: 'en' | 'nl';
}

export default class CustomDocument extends NextDocument<DocumentProps> {
  static async getInitialProps(context: DocumentContext): Promise<DocumentProps> {
    const initialProps = await NextDocument.getInitialProps(context);
    const locale = context.pathname === '/nl' || context.pathname.startsWith('/nl/') ? 'nl' : 'en';
    return { ...initialProps, locale };
  }

  render() {
    return (
      <Html lang={this.props.locale} className={fontVariables}>
        <Head />
        <body className="font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
