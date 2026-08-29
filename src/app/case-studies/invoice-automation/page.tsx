import type { Metadata } from 'next';
import LocalizedMarketingPage from '../../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'en',
  pathname: '/case-studies/invoice-automation',
  title: 'Case study: invoice automation',
  description:
    'An anonymized case study about document intelligence, invoice automation, and measurable operational time savings.',
});

export default function InvoiceAutomationCasePage() {
  return <LocalizedMarketingPage locale="en" kind="case" />;
}
