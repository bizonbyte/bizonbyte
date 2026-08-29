import type { Metadata } from 'next';
import LocalizedMarketingPage from '../../../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'nl',
  pathname: '/nl/cases/factuurautomatisering',
  title: 'Case study: factuurautomatisering',
  description:
    'Een geanonimiseerde case over document intelligence, factuurautomatisering en meetbare tijdsbesparing.',
});

export default function DutchInvoiceAutomationCasePage() {
  return <LocalizedMarketingPage locale="nl" kind="case" />;
}
