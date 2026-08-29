import type { Metadata } from 'next';
import LocalizedMarketingPage from '../../components/LocalizedMarketingPage';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'nl',
  pathname: '/nl/maatwerk-vs-standaardsoftware',
  title: 'Maatwerksoftware of standaardsoftware?',
  description:
    'Een praktisch besliskader voor de keuze tussen maatwerksoftware en standaardtools.',
});

export default function DutchCustomVsStandardPage() {
  return <LocalizedMarketingPage locale="nl" kind="comparison" />;
}
