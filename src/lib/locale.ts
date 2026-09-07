export type Locale = 'en' | 'nl';

export const siteUrl = 'https://bizonbyte.nl';

export function isDutchPath(pathname: string) {
  return pathname === '/nl' || pathname.startsWith('/nl/');
}

const routePairs: Record<string, string> = {
  '/': '/nl',
  '/pricing': '/nl/prijzen',
  '/logistics-automation': '/nl/logistieke-automatisering',
  '/custom-vs-standard-software': '/nl/maatwerk-vs-standaardsoftware',
  '/case-studies/invoice-automation': '/nl/cases/factuurautomatisering',
  '/blog': '/nl/blog',
  '/privacy-policy': '/nl/privacy-policy',
  '/terms-of-service': '/nl/algemene-voorwaarden',
};

const blogSlugPairs: Record<string, string> = {
  'waarom-de-meeste-ai-proof-of-concepts-mislukken-in-productie-lessen-uit-12-neder': 'why-most-ai-proof-of-concepts-fail-in-production-lessons-from-12-dutch-implementations',
  'kosten-batenanalyse-van-in-house-versus-uitbestede-aangepaste-software-voor-ai-g': 'cost-benefit-analysis-in-house-vs-outsourced-custom-software',
  'uitdagingen-voor-integratie-van-infrastructuur-voor-nederlandse-toeleveringskete': 'infrastructure-integration-challenges-for-dutch-supply-chains',
  'cloudleverancier-blokkade-wanneer-overstapkosten-een-bedrijfsrisico-worden': 'cloud-vendor-lock-in-when-switching-costs-become-a-business-risk',
  'schalen-met-low-code-waar-nederlandse-bedrijven-struikelen': 'scaling-with-low-code-where-dutch-companies-stumble',
  'post-odido-hack-veilige-pijplijnen-voor-klantgegevens-bouwen': 'post-odido-hack-building-secure-customer-data-pipelines',
  'afwegingen-bij-het-schalen-van-modellen-voor-machinaal-leren-on-prem-vs-hybride-': 'trade-offs-in-scaling-machine-learning-models-on-prem-vs-hybrid',
  'ongemiddeld-gids-opvallen': 'remarkable-a-no-nonsense-guide-to-standing-out',
};

const englishToDutchBlogSlugs = Object.entries(blogSlugPairs).reduce<Record<string, string>>((result, [dutchSlug, englishSlug]) => {
  result[englishSlug] = dutchSlug;
  return result;
}, {});

function getLocalizedBlogPath(pathname: string, locale: Locale) {
  if (pathname.startsWith('/nl/blog/')) {
    const dutchSlug = pathname.slice('/nl/blog/'.length);
    return locale === 'en' ? `/blog/${blogSlugPairs[dutchSlug] || dutchSlug}` : pathname;
  }

  if (pathname.startsWith('/blog/')) {
    const englishSlug = pathname.slice('/blog/'.length);
    return locale === 'nl' ? `/nl/blog/${englishToDutchBlogSlugs[englishSlug] || englishSlug}` : pathname;
  }

  return null;
}

export function getLocalePath(pathname: string, locale: Locale) {
  const localizedBlogPath = getLocalizedBlogPath(pathname, locale);
  if (localizedBlogPath) return localizedBlogPath;

  if (locale === 'en') {
    if (pathname === '/nl' || pathname === '/nl/') return '/';
    if (pathname.startsWith('/nl/')) return pathname.slice(3) || '/';
    return pathname;
  }

  if (pathname === '/') return '/nl';
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return pathname;
  return routePairs[pathname] || `/nl${pathname}`;
}

export function getAlternateLocalePath(pathname: string) {
  return isDutchPath(pathname)
    ? getLocalePath(pathname, 'en')
    : getLocalePath(pathname, 'nl');
}

export function getLanguageAlternates(pathname: string, available: Locale[] = ['en', 'nl']) {
  const englishPath = getLocalePath(pathname, 'en');
  const dutchPath = getLocalePath(pathname, 'nl');
  const hasEnglish = available.includes('en');
  const hasDutch = available.includes('nl');

  // Only advertise a translation that exists. A blog post is written in one
  // language first and translated in a later commit, so pointing hreflang at
  // the other side unconditionally sends crawlers to a redirect.
  const alternates: Record<string, string> = {};
  if (hasEnglish) alternates['en-NL'] = `${siteUrl}${englishPath}`;
  if (hasDutch) alternates['nl-NL'] = `${siteUrl}${dutchPath}`;
  alternates['x-default'] = `${siteUrl}${hasEnglish ? englishPath : dutchPath}`;

  return alternates;
}
