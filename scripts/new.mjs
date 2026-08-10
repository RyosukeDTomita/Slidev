import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { rootDir } from './decks.mjs'

// `pnpm new 2026-09-15` で勉強会用のディレクトリと slides.md を作る。
const slug = process.argv[2] ?? new Date().toISOString().slice(0, 10)

if (!/^[\w.-]+$/.test(slug)) {
  console.error(`不正なディレクトリ名です: ${slug}`)
  process.exit(1)
}

const dir = path.join(rootDir, slug)
const entry = path.join(dir, 'slides.md')

if (fs.existsSync(entry)) {
  console.error(`${slug}/slides.md は既に存在します`)
  process.exit(1)
}

fs.mkdirSync(dir, { recursive: true })
fs.copyFileSync(path.join(rootDir, 'templates', 'slides.md'), entry)

console.log(`==> ${path.relative(rootDir, entry)} を作成しました`)
console.log(`    pnpm dev ${slug}`)
