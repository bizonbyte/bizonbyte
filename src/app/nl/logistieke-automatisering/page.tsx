import type { Metadata } from 'next';
import LocalizedMarketingPage from '../../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'nl',
  pathname: '/nl/logistieke-automatisering',
  title: 'Logistieke automatisering voor Nederlandse teams',
  description:
    'Automatiseer factuurverwerking, ERP-koppelingen en logistieke workflows met productieklare software.',
});

export default function DutchLogisticsAutomationPage() {
  return <LocalizedMarketingPage locale="nl" kind="logistics" />;
}
