import type { ComponentType } from 'react'

export interface ArticleSeo {
  title: string
  description: string
}

export interface ArticleSeoMeta {
  datePublished: string
  dateModified: string
  keywords: string[]
  articleType: 'Article' | 'TechArticle'
  articleTags: string
  images: string[]
  about: Array<Record<string, string>>
  extra?: Record<string, string>
  citation?: Array<{ '@type': string; name: string; url: string }>
  isBasedOn?: Record<string, unknown>
  mentions?: Array<Record<string, string | string[]>>
  discussionUrl?: string
  relatedLink?: string
  video?: Record<string, unknown>
  subjectOf?: Record<string, unknown>
}

export interface ArticleConfig {
  id: string
  slugs: { es: string; en: string }
  titles: { es: string; en: string }
  seo: { es: ArticleSeo; en: ArticleSeo }
  sectionLabels: { es: Record<string, string>; en: Record<string, string> }
  type: 'collab' | 'case-study' | 'bridge'
  ogImage?: string
  heroImage?: string
  component: () => Promise<{ default: ComponentType<{ lang: 'es' | 'en' }> }>
  xDefaultSlug?: string
  ragReady?: boolean
  i18nFile?: string
  seoMeta?: ArticleSeoMeta
}

// NOTE: Only the Jacobo case study is kept as a voice-agent template.
// The other case studies (n8n-for-pms, business-os, programmatic-seo,
// self-healing-chatbot, career-ops, ambuj-irepair) were removed during
// the rebrand. Fill out src/jacobo-i18n.ts with your own voice-agent
// content, then duplicate this entry to add more case-studies later.
export const articleRegistry: ArticleConfig[] = [
  {
    id: 'jacobo',
    slugs: { es: 'agente-ia-jacobo', en: 'ai-agent-jacobo' },
    titles: { es: 'Voice Agent (template)', en: 'Voice Agent (template)' },
    seo: {
      es: {
        title: '[YOUR_VOICE_AGENT_NAME]: Voice + Multi-Agent Case Study | ambuj.co',
        description: '[YOUR_ONE_LINE_VOICE_AGENT_DESCRIPTION] — case study template. Edit src/jacobo-i18n.ts to fill in your details.',
      },
      en: {
        title: '[YOUR_VOICE_AGENT_NAME]: Voice + Multi-Agent Case Study | ambuj.co',
        description: '[YOUR_ONE_LINE_VOICE_AGENT_DESCRIPTION] — case study template. Edit src/jacobo-i18n.ts to fill in your details.',
      },
    },
    sectionLabels: {
      es: {
        'the-problem': 'The Problem',
        'architecture': 'Architecture',
        'e2e-flows': 'E2E Flows',
        'main-router': 'Router',
        'natural-language-booking': 'Deep Dive: Booking',
        'deep-dive-quotes': 'Deep Dive: Quotes',
        'deep-dive-others': 'Deep Dive: Tools',
        'results': 'Results',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolution',
        'what-id-do-differently': 'Lessons',
        'enterprise-patterns': 'Patterns',
        'run-it-yourself': 'Workflows',
        'faq': 'FAQ',
        'resources': 'Resources',
      },
      en: {
        'the-problem': 'The Problem',
        'architecture': 'Architecture',
        'e2e-flows': 'E2E Flows',
        'main-router': 'Router',
        'natural-language-booking': 'Deep Dive: Booking',
        'deep-dive-quotes': 'Deep Dive: Quotes',
        'deep-dive-others': 'Deep Dive: Tools',
        'results': 'Results',
        'decisions': 'ADRs',
        'platform-evolution': 'Evolution',
        'what-id-do-differently': 'Lessons',
        'enterprise-patterns': 'Patterns',
        'run-it-yourself': 'Workflows',
        'faq': 'FAQ',
        'resources': 'Resources',
      },
    },
    type: 'case-study',
    ragReady: false,
    i18nFile: 'src/jacobo-i18n.ts',
    ogImage: 'https://ambuj.co/jacobo/og-jacobo-agent.webp',
    heroImage: 'https://ambuj.co/jacobo/og-jacobo-agent.webp',
    component: () => import('../JacoboAgent.tsx'),
    seoMeta: {
      datePublished: '2026-01-01',
      dateModified: '2026-01-01',
      keywords: ['voice agent', 'multi-agent AI', 'tool calling', 'voice AI'],
      articleType: 'TechArticle',
      articleTags: 'voice agent,multi-agent,tool calling,AI',
      images: ['https://ambuj.co/jacobo/og-jacobo-agent.webp'],
      about: [
        { '@type': 'Thing', name: 'Voice AI Agents' },
        { '@type': 'Thing', name: 'Multi-Agent Orchestration' },
      ],
      extra: { proficiencyLevel: 'Expert' },
      mentions: [],
    },
  },
]

export function getAltPaths(): Record<string, string> {
  const map: Record<string, string> = {
    '/': '/es',
    '/en': '/es',
    '/es': '/',
    '/sobre-mi': '/about',
    '/about': '/sobre-mi',
    '/privacidad': '/privacy',
    '/privacy': '/privacidad',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = `/${article.slugs.en}`
    map[`/${article.slugs.en}`] = `/${article.slugs.es}`
  }
  return map
}

export function getPageTitles(): Record<string, string> {
  const map: Record<string, string> = {
    '/': "Ambuj's Portfolio",
    '/en': "Ambuj's Portfolio",
    '/sobre-mi': 'About',
    '/about': 'About',
  }
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = article.titles.es
    map[`/${article.slugs.en}`] = article.titles.en
  }
  return map
}

export function getSectionLabels(): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {}
  for (const article of articleRegistry) {
    map[`/${article.slugs.es}`] = article.sectionLabels.es
    map[`/${article.slugs.en}`] = article.sectionLabels.en
  }
  return map
}

/** All ES slugs (for lang detection) */
export function getEsSlugs(): Set<string> {
  const slugs = new Set<string>(['/es', '/privacidad', '/sobre-mi'])
  for (const article of articleRegistry) {
    slugs.add(`/${article.slugs.es}`)
  }
  return slugs
}
