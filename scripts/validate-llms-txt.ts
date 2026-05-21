/**
 * Build-time validation: checks that llms.txt stays in sync with i18n.ts content.
 *
 * The original proof-points (Santiago-specific terms like "Teaching Fellow",
 * "6-layer", "Hiperautomatiza", etc.) were removed during the rebrand because
 * the matching content was deleted from i18n.ts. Add your own proof-points
 * back here once you've filled in real bio content — see the example below.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-llms-txt.ts
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

interface ProofPoint {
  source: string
  terms: string[]
}

const proofPoints: ProofPoint[] = [
  // EXAMPLE — uncomment and fill in once your llms.txt has real content:
  // {
  //   source: 'llms.txt → contact',
  //   terms: ['itsambuja@gmail.com', 'github.com/AmbujaAK'],
  // },
]

const llmsTxt = readFileSync(resolve(root, 'public/llms.txt'), 'utf8').toLowerCase()
const failures: string[] = []

for (const point of proofPoints) {
  for (const term of point.terms) {
    if (!llmsTxt.includes(term.toLowerCase())) {
      failures.push(`✗ ${point.source}: missing "${term}"`)
    }
  }
}

if (failures.length > 0) {
  console.error('llms.txt is out of sync with i18n.ts:')
  failures.forEach((f) => console.error('  ' + f))
  process.exit(1)
} else {
  console.log(`✓ llms.txt validated (${proofPoints.length} proof points checked)`)
}
