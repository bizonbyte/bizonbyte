const fs = require('fs');
const path = require('path');

const siteUrl = 'https://bizonbyte.nl';

function loadEnvFiles() {
  for (const relative of ['.env.local', '.env']) {
    const filePath = path.join(__dirname, relative);
    if (!fs.existsSync(filePath)) continue;
    for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

function hasDutchPost(slug) {
  return fs.existsSync(path.join(__dirname, 'posts', `${slug}.md`));
}

const routePairs = {
  '/': '/nl',
  '/nl': '/',
  '/pricing': '/nl/prijzen',
  '/nl/prijzen': '/pricing',
  '/logistics-automation': '/nl/logistieke-automatisering',
  '/nl/logistieke-automatisering': '/logistics-automation',
  '/custom-vs-standard-software': '/nl/maatwerk-vs-standaardsoftware',
  '/nl/maatwerk-vs-standaardsoftware': '/custom-vs-standard-software',
  '/case-studies/invoice-automation': '/nl/cases/factuurautomatisering',
  '/nl/cases/factuurautomatisering': '/case-studies/invoice-automation',
  '/blog': '/nl/blog',
  '/nl/blog': '/blog',
  '/privacy-policy': '/nl/privacy-policy',
  '/nl/privacy-policy': '/privacy-policy',
  '/terms-of-service': '/nl/algemene-voorwaarden',
  '/nl/algemene-voorwaarden': '/terms-of-service',
};

const blogSlugPairs = {
  'waarom-de-meeste-ai-proof-of-concepts-mislukken-in-productie-lessen-uit-12-neder': 'why-most-ai-proof-of-concepts-fail-in-production-lessons-from-12-dutch-implementations',
  'kosten-batenanalyse-van-in-house-versus-uitbestede-aangepaste-software-voor-ai-g': 'cost-benefit-analysis-in-house-vs-outsourced-custom-software',
  'uitdagingen-voor-integratie-van-infrastructuur-voor-nederlandse-toeleveringskete': 'infrastructure-integration-challenges-for-dutch-supply-chains',
  'cloudleverancier-blokkade-wanneer-overstapkosten-een-bedrijfsrisico-worden': 'cloud-vendor-lock-in-when-switching-costs-become-a-business-risk',
  'schalen-met-low-code-waar-nederlandse-bedrijven-struikelen': 'scaling-with-low-code-where-dutch-companies-stumble',
  'post-odido-hack-veilige-pijplijnen-voor-klantgegevens-bouwen': 'post-odido-hack-building-secure-customer-data-pipelines',
  'afwegingen-bij-het-schalen-van-modellen-voor-machinaal-leren-on-prem-vs-hybride-': 'trade-offs-in-scaling-machine-learning-models-on-prem-vs-hybrid',
  'ongemiddeld-gids-opvallen': 'remarkable-a-no-nonsense-guide-to-standing-out',
};

const englishToDutchBlogSlugs = Object.entries(blogSlugPairs).reduce((result, [dutchSlug, englishSlug]) => {
  result[englishSlug] = dutchSlug;
  return result;
}, {});

function normalizePath(pathname) {
  if (pathname === '/nl/') return '/nl';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function getBlogAlternatePath(pathname) {
  if (pathname.startsWith('/nl/blog/')) {
    const dutchSlug = pathname.slice('/nl/blog/'.length);
    if (blogSlugPairs[dutchSlug]) return `/blog/${blogSlugPairs[dutchSlug]}`;
    return `/blog/${dutchSlug}`;
  }

  if (pathname.startsWith('/blog/')) {
    const englishSlug = pathname.slice('/blog/'.length);
    if (englishToDutchBlogSlugs[englishSlug]) {
      return `/nl/blog/${englishToDutchBlogSlugs[englishSlug]}`;
    }
    if (hasDutchPost(englishSlug)) return `/nl/blog/${englishSlug}`;
    return null;
  }

  return null;
}

async function getOutrankSitemapPaths() {
  loadEnvFiles();
  const apiKey = process.env.OUTRANK_BLOG_API_KEY || process.env.OUTRANK_API_KEY;
  if (!apiKey) return [];

  try {
    const { BlogClient } = require('outrank-next-js-blog');
    const client = new BlogClient(apiKey, { baseUrl: 'https://outrank.so' });
    const articles = await client.getAllArticles(100);
    const kept = new Map();
    for (const article of articles) {
      const family = article.slug.replace(/-\d+$/, '');
      const current = kept.get(family);
      const articleTime = new Date(article.updated_at || article.created_at).getTime();
      const currentTime = current ? new Date(current.updated_at || current.created_at).getTime() : 0;
      if (!current || articleTime > currentTime) kept.set(family, article);
    }
    return [...kept.values()].map((article) => `/blog/${article.slug}`);
  } catch (error) {
    console.error('Failed to add Outrank slugs to sitemap', error);
    return [];
  }
}

function alternateRefsForPath(pathname) {
  const normalized = normalizePath(pathname);
  const alternate = routePairs[normalized] || getBlogAlternatePath(normalized);

  if (!alternate) return [];

  const isDutch = normalized === '/nl' || normalized.startsWith('/nl/');
  const englishPath = isDutch ? alternate : normalized;
  const dutchPath = isDutch ? normalized : alternate;

  return [
    { href: `${siteUrl}${englishPath}`, hrefIsAbsolute: true, hreflang: 'en-NL' },
    { href: `${siteUrl}${dutchPath}`, hrefIsAbsolute: true, hreflang: 'nl-NL' },
    { href: `${siteUrl}${englishPath}`, hrefIsAbsolute: true, hreflang: 'x-default' },
  ];
}

module.exports = {
    siteUrl,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
      '/privacy-policy',
      '/terms-of-service',
      '/nl/privacy-policy',
      '/nl/algemene-voorwaarden',
    ],
    generateRobotsTxt: true,
    // exclude: ['/protected-page', '/awesome/secret-page'],
    // alternateRefs: [
    //   {
    //     href: 'https://es.example.com',
    //     hreflang: 'es',
    //   },
    //   {
    //     href: 'https://fr.example.com',
    //     hreflang: 'fr',
    //   },
    // ],
    // Default transformation function
    additionalPaths: async (config) => {
      const paths = await getOutrankSitemapPaths();
      return Promise.all(paths.map((loc) => config.transform(config, loc)));
    },
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: alternateRefsForPath(path),
      }
    },
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
        // {
        //   userAgent: 'test-bot',
        //   allow: ['/path', '/path-2'],
        // },
        // {
        //   userAgent: 'black-listed-bot',
        //   disallow: ['/sub-path-1', '/path-2'],
        // },
      ],
    //   additionalSitemaps: [
    //     'https://example.com/my-custom-sitemap-1.xml',
    //     'https://example.com/my-custom-sitemap-2.xml',
    //     'https://example.com/my-custom-sitemap-3.xml',
    //   ],
    },
  }
