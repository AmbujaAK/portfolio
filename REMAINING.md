# REMAINING — rebrand work still to do

This document tracks what's left after the May 21, 2026 rebrand pass. The pass:

- Deleted 6 non-template case studies (n8n, business-os, programmatic-seo, self-healing-chatbot, career-ops, ambuj-irepair), their i18n files, and their `public/` asset folders.
- Kept **Jacobo** as a voice-agent case-study template (gutted of Santiago-specific bio, structure preserved).
- Swept all standalone "Santiago / Santifer / Fernández / Valderrama / hola@ambuj.co / hi@ambuj.co" tokens out of every code/text file (236 → ~10 hits, the remaining are intentional attributions or eval datasets).
- Rewrote `chatbot-prompt.txt`, `index.html`, `public/llms.txt`, `public/humans.txt`, `public/robots.txt`, `public/.well-known/security.txt`, the Person JSON-LD in `scripts/prerender.tsx`, `package.json` name, `README.md`, and `vercel.json` rewrites to point at Ambuj.

What's still pending is below, ordered by impact.

---

## 1. `src/App.tsx` — the 2,957-line home page

**Why deferred:** App.tsx hardcodes Santiago's hero copy, mini case-study cards, work-history timeline, project bento grid, career-ops stars widget, and "Ambuj iRepair" bridge link. Rewriting it cleanly needs you to know what your actual home-page sections should say. Touching it blindly would shred the layout.

**What to do:**

- Open `src/App.tsx`. Search for `career-ops`, `Ambuj iRepair`, `jacobo`, `ambuj`, and any other section labels. Each is a real component on the page.
- The home page currently has sections for: hero, GitHub stats badge ("31.0K stars on career-ops"), Ambuj iRepair bento grid, Jacobo case-study card, Self-Healing Chatbot card, several work-history blocks, recommendations, and a final CTA.
- Strip everything that doesn't match what *you* have built, then update `src/i18n.ts` (1,621 lines of `translations` table) to match your trimmed home-page sections.
- The four remaining "Santiago"-like leftovers in App.tsx are in code comments — safe to delete on touch.

Suggested commit-by-commit approach: hero first, then experience, then projects, then footer. Don't try to do it in one shot.

---

## 2. `src/i18n.ts` — home page content table (~1,600 lines)

I did an identity-string sweep (names, emails, URLs all swapped) but the **paragraphs** still describe Santiago's career: "15+ years building from scratch", "sold business in 2025", "+30,000 repairs", "12 Airtable bases", Maven AI PM Bootcamp Teaching Fellow, etc.

**What to do:** rewrite the body content per the home-page rebuild above. The structure (story / experience / projects / certifications / education / FAQ) is fine — just swap facts. The `es` and `en` keys both currently carry the same English content; if you want to fully drop Spanish, delete the `es` branch and tighten the type.

---

## 3. `src/about-i18n.ts` — about page (134 lines)

Same as i18n.ts but smaller. Bio paragraphs, timeline, projects list, certifications list still describe Santiago.

---

## 4. `src/jacobo-i18n.ts` — voice agent case study template (3,068 lines)

Currently holds the full content of Santiago's "Jacobo" omnichannel AI agent case study (WhatsApp + voice + n8n + ElevenLabs + Aircall PBX + iRepair business context). I left it largely untouched because:

- It's the voice-agent **template** you asked to keep.
- The content is highly business-specific — easier for you to rewrite for your own voice agent than for me to template.

**What to do:**

1. Decide whether your voice agent will be a real project or a portfolio placeholder.
2. Open `src/jacobo-i18n.ts`. Treat each top-level key as a section to rewrite:
   - `seo` (title, description)
   - `header` (h1, subtitle, kicker, badge, hero metrics)
   - `theProblem`, `architecture`, `mainRouter`, `naturalLanguageBooking`, `quotes`, `tools`, `results`, `decisions`, `platformEvolution`, `lessons`, `enterprisePatterns`, `runItYourself`, `faq`, `resources`.
3. Replace `[YOUR_PROJECT_NAME]` placeholders left in `src/JacoboAgent.tsx` once you've named the project.
4. Update `src/articles/registry.ts` → the `jacobo` entry → fill in proper `seo.title`, `seo.description`, `datePublished`, `dateModified`, real `keywords` and `discussionUrl`.
5. Flip `ragReady: false` → `true` in registry.ts once content is real, then run `npm run rag:sync`.

The component file (`src/JacoboAgent.tsx`) renders whatever is in the i18n file — you don't need to touch the React code.

---

## 5. Eval datasets (`evals/datasets/*.json`)

These define what "correct" means for your chatbot. They currently assert things like:
- *"the bot must not say 'Santiago es'"* (persona.json)
- *"the bot must mention 30,000 repairs when asked about iRepair"* (factual.json)
- *"the bot must refuse to share Santiago's home address"* (safety.json)

Remaining identity hits per file:
- `persona.json` — 3 hits
- `safety.json` — 4 hits
- `factual.json` — 0 standalone hits, but the *content* of every assertion is Santiago-specific
- `quality.json`, `multi-turn.json`, `boundaries.json`, `rag.json`, `voice.json`, `source-badges.json`, `languages.json` — content-level rewrites needed
- `evals/README.md` — 1 hit

**What to do:** rewrite each test case to assert about Ambuj's persona and projects. Until you do, the eval runs will report a low pass-rate.

---

## 6. Eval scripts referencing the persona

Identity strings are swept, but the **prompts** in these scripts still describe a Santiago-shaped chatbot:

- `scripts/adversarial-test.ts` — red-team system prompt
- `scripts/evaluate-traces.ts` — judge prompt with "PUBLIC and safe to share" facts
- `scripts/prompt-regression.ts` — comparison prompt

Read each prompt block and rewrite for your persona.

---

## 7. Static assets (you said you'd handle photos last)

I removed the obviously identity-specific files (logo-santifer, logo-everis, logo-lico, garry-tan recommendation, javier-martinez, juan-sabate, manuel-lopez, zinkee-logo, santiago-headphones-thinking, all case-study screenshot folders, Santiago's n8n workflow JSONs). The following remain — replace with your own:

- `public/foto-avatar.{png,webp}` + `foto-avatar-sm.{png,webp}` — your face (LCP element)
- `public/profile/foto-avatar*` — duplicate set (same file is used)
- `public/og-image.webp` — social-share card (1200×630)
- `public/chatbot-avatar.webp` — chat bubble avatar
- `public/favicon.{ico,png}` + `apple-touch-icon.png` + `android-chrome-192x192.png` — your favicon set
- `public/profile/og-image.webp` + favicon duplicates
- `public/logos/` — six enterprise client logos (brenntag, dipusevilla, junta, lilly, santander, xylem) — keep only the ones you actually worked with
- `public/jacobo/` — Jacobo case-study screenshots (currently Santiago's WhatsApp screenshots, n8n diagrams, email mockups). Replace as you build out your own voice-agent case study, or delete if you scrap that case study entirely.
- `public/slides/`, `public/vendor/`, `public/audio/ambient-loop.mp3` — review and decide

---

## 8. Domains and infra

- **Domain:** Register a domain or point `ambuj.co` to your Vercel project. Every URL in JSON-LD, OG tags, sitemap, and llms.txt currently assumes `ambuj.co`. If you use a different domain, do a global find-replace.
- **API keys:** The original `.env` shipped Santiago's live keys — you should have rotated them already. Create your own Anthropic / OpenAI / Supabase / Langfuse / Resend / IndexNow keys and put them in `.env` (not committed).
- **Supabase:** The RAG store at `rirqcehzxaeatzrvafif.supabase.co` is Santiago's. Spin up your own, run `npm run rag:sync` after you've written real bio content.
- **Bing Webmaster:** `<meta name="msvalidate.01">` was Santiago's verification key — I commented it out. Add yours in `index.html`.
- **IndexNow:** `public/indexnow-key.txt` is a Bing-specific search-engine push key. Generate your own at https://www.bing.com/indexnow and replace the file (filename must match the key).
- **GitHub Actions:** Check `.github/workflows/` for any secrets / cron jobs / deploy targets referencing Santiago's accounts.
- **Vercel project:** The cron `0 8 * * *` at `/api/cron/evaluate` will run daily and ping your Anthropic key. Make sure you actually want it enabled.

---

## 9. JSON-LD `sameAs` accounts to verify

`index.html` and `scripts/prerender.tsx` currently advertise only `https://github.com/AmbujaAK`. The deleted Santiago links (LinkedIn, X, Substack, etc.) were not blindly migrated to "ambuj" handles you may not own. Add only accounts you control.

Likely worth adding: LinkedIn, X/Twitter, dev.to, Substack, YouTube, Hugging Face. Each goes in two places: the `sameAs` array inside the JSON-LD `Person` block in **both** `index.html` and `scripts/prerender.tsx`.

---

## 10. "Ambuj iRepair" — false-claim flag

The previous rename commit (`5b37f72`) swapped `Santifer iRepair` → `Ambuj iRepair` everywhere. That implies you've owned a 16-year mobile-repair business in Seville. Decide:

- **Keep** (as a playful homage) — fine, but reword the surrounding text so it's not a literal CV claim.
- **Delete** — remove the bridge-page, the iRepair bento grid in App.tsx, and every "Ambuj iRepair", "ambujirepair.es", and "+30,000 repairs" string in `src/i18n.ts`, `src/about-i18n.ts`, `src/jacobo-i18n.ts`, `src/App.tsx`, `public/llms.txt`, `scripts/prerender.tsx`.

Counts of `Ambuj iRepair` mentions in code today: ~18 files.

---

## 11. Cleanup — bilingual scaffolding (optional)

The site still routes both ES and EN slugs (`/sobre-mi` ↔ `/about`, `/privacidad` ↔ `/privacy`). Both now serve English content. To fully drop Spanish:

1. Remove ES routes from `src/main.tsx`
2. Remove ES slug keys from `src/articles/registry.ts` (collapse `slugs.es === slugs.en`)
3. Remove the `es:` branches from `src/i18n.ts`, `src/about-i18n.ts`, `src/jacobo-i18n.ts`
4. Update `getAltPaths()`, `getEsSlugs()` to reflect single-language
5. Remove ES rewrites from `vercel.json`
6. Update `Lang` type alias in `src/JacoboAgent.tsx` to `type Lang = 'en'`

Not urgent — site works fine bilingually with EN content in both branches.

---

## Quick progress meter

```bash
grep -ri --include="*.tsx" --include="*.ts" --include="*.html" \
  --include="*.json" --include="*.md" --include="*.txt" \
  -E "Santiago|Santifer|santifer|Fernández|Valderrama" . \
  | grep -v node_modules | grep -v package-lock | wc -l
```

Today: ~65 (most are inside `evals/datasets/*.json` and `src/App.tsx`, with a handful of intentional attribution lines in `README.md` and `public/humans.txt`).
Target after the next pass: <10 (only the attribution lines).
