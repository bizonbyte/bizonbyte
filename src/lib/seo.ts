import type { Metadata } from 'next';
import { getLanguageAlternates, siteUrl, type Locale } from './locale';

interface LocalizedMetadataOptions {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}

export function localizedMetadata({
  locale,
  pathname,
  title,
  description,
}: LocalizedMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'nl' ? 'nl_NL' : 'en_NL',
      url: `${siteUrl}${pathname}`,
      siteName: 'bizonbyte.nl',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
