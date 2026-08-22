export const mockRivals = [
  {
    id: 'oxylabs',
    name: 'Oxylabs',
    mark: 'OX',
    markBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    website: 'oxylabs.io',
    status: 'Healthy',
    description: 'Enterprise web scraping infrastructure, proxy networks, and automated SERP data extraction APIs.',
    surfaces: ['Pricing', 'Changelog', 'Positioning'],
    healthPct: 99.8,
    changesCount: 7,
    lastScan: '12m ago',
    activeScrapers: 3
  },
  {
    id: 'apify',
    name: 'Apify',
    mark: 'AP',
    markBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    website: 'apify.com',
    status: 'Healthy',
    description: 'Cloud web scraping and data extraction platform featuring an extensive marketplace of pre-built Actors.',
    surfaces: ['Pricing', 'Changelog', 'Positioning'],
    healthPct: 100.0,
    changesCount: 6,
    lastScan: '4m ago',
    activeScrapers: 3
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    mark: 'FC',
    markBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    website: 'firecrawl.dev',
    status: 'Healthy',
    description: 'API engine designed to turn raw websites into clean LLM-ready markdown, JSON schemas, and structured vectors.',
    surfaces: ['Pricing', 'Changelog', 'Positioning'],
    healthPct: 99.2,
    changesCount: 4,
    lastScan: '28m ago',
    activeScrapers: 3
  }
];

export const mockChanges = [
  {
    id: 'ch-1',
    rivalId: 'oxylabs',
    rivalName: 'Oxylabs',
    rivalMark: 'OX',
    rivalMarkBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    type: 'Price', // Price, Changelog, Copy
    severity: 'Major', // Major, Minor
    title: 'Enterprise Proxy Tier commitment lowered by 14%',
    summary: 'Decreased Enterprise 1TB commitment price from $800/mo to $688/mo while keeping rate limits and dedicated IP pools unchanged.',
    timestamp: '22 mins ago',
    sourceUrl: 'https://oxylabs.io/pricing',
    rawDiff: `--- old/pricing.json
+++ new/pricing.json
@@ -14,7 +14,7 @@
   "tier": "Enterprise 1TB",
-  "monthly_commitment_usd": 800,
+  "monthly_commitment_usd": 688,
   "price_per_gb_usd": 0.688,
   "dedicated_ip_nodes": 50`
  },
  {
    id: 'ch-2',
    rivalId: 'apify',
    rivalName: 'Apify',
    rivalMark: 'AP',
    rivalMarkBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    type: 'Changelog',
    severity: 'Minor',
    title: 'Released Web Scraper Actor v3.4.0 with auto-proxy rotation',
    summary: 'Added native support for persistent session cookies, TLS fingerprint spoofing, and automatic retry handling on HTTP 429 status codes.',
    timestamp: '1 hour ago',
    sourceUrl: 'https://apify.com/changelog',
    rawDiff: `--- release_v3.3.9.md
+++ release_v3.4.0.md
+ ## v3.4.0 Highlights
+ - Native cookie session persistence across crawler retries
+ - Automated JA3/TLS fingerprint randomized spoofing
+ - Exponential backoff auto-handler for HTTP 429 rate limits`
  },
  {
    id: 'ch-3',
    rivalId: 'firecrawl',
    rivalName: 'Firecrawl',
    rivalMark: 'FC',
    rivalMarkBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    type: 'Copy',
    severity: 'Major',
    title: 'Hero headline repositioned towards AI agent developers',
    summary: 'Replaced traditional headline "Web Scraping API for Developers" with "The Data Engine for Autonomous AI Agents and LLM Workflows".',
    timestamp: '3 hours ago',
    sourceUrl: 'https://firecrawl.dev',
    rawDiff: `--- index.html (Hero Block)
+++ index.html (Hero Block)
- <h1 class="hero-title">Web Scraping API for Developers</h1>
+ <h1 class="hero-title">The Data Engine for Autonomous AI Agents and LLM Workflows</h1>`
  },
  {
    id: 'ch-4',
    rivalId: 'oxylabs',
    rivalName: 'Oxylabs',
    rivalMark: 'OX',
    rivalMarkBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    type: 'Price',
    severity: 'Minor',
    title: 'Introduced Micro Pay-As-You-Go tier at $10/GB',
    summary: 'Self-serve entry tier targeting indie developers and early-stage startups with no monthly commitment or minimum spending obligations.',
    timestamp: '5 hours ago',
    sourceUrl: 'https://oxylabs.io/pricing',
    rawDiff: `--- pricing_tiers.json
+++ pricing_tiers.json
+ {
+   "id": "micro-payg",
+   "name": "Micro Pay-As-You-Go",
+   "rate_per_gb": 10.00,
+   "minimum_commitment": 0
+ }`
  }
];

export const mockSelfHealEvents = [
  {
    id: 'sh-1',
    rivalId: 'oxylabs',
    rivalName: 'Oxylabs',
    target: 'Oxylabs /pricing #enterprise-plan-card',
    selectorBroke: '#enterprise-plan-card .price-amount',
    systemRecovery: 'Fuzzy matched via DOM tree structural vector [data-test-id="tier-price"]',
    timestamp: '14m ago',
    confidenceScore: '99.4%',
    verification: 'Recovery verified · no data gap'
  },
  {
    id: 'sh-2',
    rivalId: 'apify',
    rivalName: 'Apify',
    target: 'Apify /store/web-scraper-v3',
    selectorBroke: '.actor-stats-downloads',
    systemRecovery: 'Heuristic fallback to text node pattern matching /^\\d+k? downloads/',
    timestamp: '42m ago',
    confidenceScore: '98.7%',
    verification: 'Recovery verified · no data gap'
  },
  {
    id: 'sh-3',
    rivalId: 'firecrawl',
    rivalName: 'Firecrawl',
    target: 'Firecrawl /docs/api-reference',
    selectorBroke: 'article > h2#rate-limits',
    systemRecovery: 'Anchored to semantic heading aria-label="Rate Limits"',
    timestamp: '2h ago',
    confidenceScore: '100.0%',
    verification: 'Recovery verified · no data gap'
  },
  {
    id: 'sh-4',
    rivalId: 'oxylabs',
    rivalName: 'Oxylabs',
    target: 'Oxylabs /blog/changelog-august',
    selectorBroke: 'time.published-date',
    systemRecovery: 'JSON-LD structured schema metadata fallback extraction',
    timestamp: '4h ago',
    confidenceScore: '99.1%',
    verification: 'Recovery verified · no data gap'
  },
  {
    id: 'sh-5',
    rivalId: 'apify',
    rivalName: 'Apify',
    target: 'Apify /pricing',
    selectorBroke: 'div[data-pricing-table] > .row-starter',
    systemRecovery: 'Visual layout vector tree comparison + sibling text anchor',
    timestamp: '6h ago',
    confidenceScore: '97.9%',
    verification: 'Recovery verified · no data gap'
  }
];

export const mockAlertHistory = [
  {
    id: 'alt-1',
    name: 'Oxylabs Major Price Shift Digest',
    time: '18m ago',
    channel: 'Email',
    recipient: 'team@acmeintel.io',
    status: 'sent', // sent or fail
    severity: 'Major'
  },
  {
    id: 'alt-2',
    name: 'Firecrawl Positioning Rebrand Alert',
    time: '2h ago',
    channel: 'Dashboard',
    recipient: 'Slack #market-intel',
    status: 'sent',
    severity: 'Major'
  },
  {
    id: 'alt-3',
    name: 'Apify v3.4 Release Webhook',
    time: '4h ago',
    channel: 'Dashboard',
    recipient: 'https://api.acme.io/webhooks/intel',
    status: 'fail',
    severity: 'Minor'
  },
  {
    id: 'alt-4',
    name: 'Daily Competitor Summary Digest',
    time: '8h ago',
    channel: 'Email',
    recipient: 'jordan@acmeintel.io',
    status: 'sent',
    severity: 'Minor'
  }
];

export const mockWorkspaceConfig = {
  name: 'Acme Intelligence',
  strategy: 'High-frequency competitive surface tracking for cloud web data infrastructure.',
  countermeasures: [
    'Auto-flag competitor price decreases over 10%',
    'Notify product team on major messaging repositioning',
    'Sync scraper recovery logs directly to PagerDuty'
  ],
  teamMembers: [
    { name: 'Jordan Davis', email: 'jordan@acmeintel.io', role: 'Admin', avatar: 'JD' },
    { name: 'Alex Rivera', email: 'alex@acmeintel.io', role: 'Analyst', avatar: 'AR' },
    { name: 'Sam Chen', email: 'sam@acmeintel.io', role: 'Engineer', avatar: 'SC' }
  ],
  integrations: [
    { name: 'Slack Integration', status: 'Connected', channel: '#market-intel', active: true },
    { name: 'Email Digest', status: 'Active', channel: 'Daily @ 9am EST', active: true },
    { name: 'Custom Webhook', status: 'Failing (HTTP 500)', channel: 'api.acme.io', active: false }
  ]
};
