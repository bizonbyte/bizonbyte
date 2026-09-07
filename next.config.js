/** @type {import('next').NextConfig} */
const legacyEnglishBlogRedirects = [
  ['waarom-de-meeste-ai-proof-of-concepts-mislukken-in-productie-lessen-uit-12-neder', 'why-most-ai-proof-of-concepts-fail-in-production-lessons-from-12-dutch-implementations'],
  ['kosten-batenanalyse-van-in-house-versus-uitbestede-aangepaste-software-voor-ai-g', 'cost-benefit-analysis-in-house-vs-outsourced-custom-software'],
  ['uitdagingen-voor-integratie-van-infrastructuur-voor-nederlandse-toeleveringskete', 'infrastructure-integration-challenges-for-dutch-supply-chains'],
  ['cloudleverancier-blokkade-wanneer-overstapkosten-een-bedrijfsrisico-worden', 'cloud-vendor-lock-in-when-switching-costs-become-a-business-risk'],
  ['schalen-met-low-code-waar-nederlandse-bedrijven-struikelen', 'scaling-with-low-code-where-dutch-companies-stumble'],
  ['post-odido-hack-veilige-pijplijnen-voor-klantgegevens-bouwen', 'post-odido-hack-building-secure-customer-data-pipelines'],
  ['afwegingen-bij-het-schalen-van-modellen-voor-machinaal-leren-on-prem-vs-hybride-', 'trade-offs-in-scaling-machine-learning-models-on-prem-vs-hybrid'],
  ['ongemiddeld-gids-opvallen', 'remarkable-a-no-nonsense-guide-to-standing-out'],
];

const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/outrank-webhook': ['./prompts/outrank-post-process.md'],
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bizonbyte.nl' }],
        destination: 'https://bizonbyte.nl/:path*',
        permanent: true,
      },
      {
        source: '/blog/agentic-ai-workflows-1',
        destination: '/blog/agentic-ai-workflows',
        permanent: true,
      },
      {
        source: '/nl/blog/agentic-ai-workflows-1',
        destination: '/nl/blog/agentic-ai-workflows',
        permanent: true,
      },
      ...legacyEnglishBlogRedirects.map(([legacySlug, englishSlug]) => ({
        source: `/blog/${legacySlug}`,
        destination: `/blog/${englishSlug}`,
        permanent: true,
      })),
    ];
  },
}

module.exports = nextConfig
