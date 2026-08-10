import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { rootDir, selectDecks } from './decks.mjs'

// `pnpm dev` は引数なしなら最初のデッキ、引数ありならそのデッキを開く。
const [slug, ...rest] = process.argv.slice(2)
const decks = selectDecks(slug ? [slug] : [])
const deck = decks[0]

console.log(`==> ${deck.slug}: ${deck.title}`)

const result = spawnSync('pnpm', ['exec', 'slidev', deck.entry, '--open', ...rest], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

process.exit(result.status ?? 1)
