import type { Metadata } from 'next';
import LocalizedMarketingPage from '../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'en',
  pathname: '/logistics-automation',
  title: 'Operational automation for Dutch logistics teams',
  description:
    'Remove manual invoice and document work from Dutch logistics operations with focused software, integrations, and automation.',
});

export default function LogisticsAutomationPage() {
  return <LocalizedMarketingPage locale="en" kind="logistics" />;
}
