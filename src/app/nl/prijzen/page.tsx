import type { Metadata } from 'next';
import LocalizedMarketingPage from '../../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'nl',
  pathname: '/nl/prijzen',
  title: 'Wat kost maatwerksoftware?',
  description:
    'Een praktisch overzicht van scope, kostendrijvers en doorlooptijd voor maatwerksoftware.',
});

export default function DutchPricingPage() {
  return <LocalizedMarketingPage locale="nl" kind="pricing" />;
}
