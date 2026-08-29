import type { Metadata } from 'next';
import LocalizedHome from '../components/LocalizedHome';
import { localizedMetadata } from '@/lib/seo';

export const metadata: Metadata = localizedMetadata({
  locale: 'nl',
  pathname: '/nl',
  title: 'Maatwerksoftware voor Nederlandse bedrijven',
  description:
    'bizonbyte.nl ontwerpt en bouwt maatwerksoftware, koppelingen en automatisering voor Nederlandse bedrijven.',
});

export default function DutchHome() {
  return <LocalizedHome locale="nl" />;
}
