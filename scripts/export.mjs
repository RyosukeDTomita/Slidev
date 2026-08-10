import { spawnSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { rootDir, selectDecks } from './decks.mjs'

// PDF 出力には playwright-chromium が要る。`nix develop .#export` で入るシェルを使うこと。
const decks = selectDecks(process.argv.slice(2))

for (const deck of decks) {
  const out = path.join(deck.dir, `${deck.slug}.pdf`)
  console.log(`\n==> exporting ${deck.slug} -> ${path.relative(rootDir, out)}`)

  const result = spawnSync('pnpm', ['exec', 'slidev', 'export', deck.entry, '--output', out], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.status !== 0)
    process.exit(result.status ?? 1)
}
