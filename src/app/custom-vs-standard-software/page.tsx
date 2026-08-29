import type { Metadata } from 'next';
import LocalizedMarketingPage from '../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'en',
  pathname: '/custom-vs-standard-software',
  title: 'Custom software or a standard tool?',
  description:
    'A practical decision guide for choosing between custom software and standard tools.',
});

export default function CustomVsStandardPage() {
  return <LocalizedMarketingPage locale="en" kind="comparison" />;
}
