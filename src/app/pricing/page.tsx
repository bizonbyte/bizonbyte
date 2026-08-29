import type { Metadata } from 'next';
import LocalizedMarketingPage from '../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'en',
  pathname: '/pricing',
  title: 'What does custom software cost?',
  description:
    'A practical guide to the scope, cost drivers, and delivery time of custom software projects.',
});

export default function PricingPage() {
  return <LocalizedMarketingPage locale="en" kind="pricing" />;
}
