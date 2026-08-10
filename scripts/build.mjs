import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { rootDir, selectDecks } from './decks.mjs'

// GitHub Pages ではリポジトリ名がパスに入るため `/Slidev/` のようなベースが必要。
// CI からは BASE_PATH で渡す。ローカルの動作確認では `/` で十分。
const basePath = normalizeBase(process.env.BASE_PATH ?? '/')
const outRoot = path.join(rootDir, 'dist')
const decks = selectDecks(process.argv.slice(2))

for (const deck of decks) {
  const base = `${basePath}${deck.slug}/`
  const out = path.join(outRoot, deck.slug)
  console.log(`\n==> building ${deck.slug} (base: ${base})`)
  fs.rmSync(out, { recursive: true, force: true })

  // --out は slides.md のあるディレクトリ基準で解決されるため絶対パスを渡す。
  const result = spawnSync(
    'pnpm',
    ['exec', 'slidev', 'build', deck.entry, '--base', base, '--out', out],
    { cwd: rootDir, stdio: 'inherit', shell: process.platform === 'win32' },
  )

  if (result.status !== 0)
    process.exit(result.status ?? 1)
}

writeIndex(outRoot, basePath, decks)
console.log(`\n==> ${decks.length} deck(s) -> ${path.relative(rootDir, outRoot)}/`)

function normalizeBase(value) {
  const trimmed = `/${value.replace(/^\/+|\/+$/g, '')}/`
  return trimmed === '//' ? '/' : trimmed
}

/** dist/index.html: 各勉強会スライドへのリンク一覧。 */
function writeIndex(outDir, base, entries) {
  const items = entries
    .map(deck => `      <li>
        <a href="${base}${deck.slug}/">
          <span class="slug">${escapeHtml(deck.slug)}</span>
          <span class="title">${escapeHtml(deck.title)}</span>
        </a>${deck.info ? `\n        <p class="info">${escapeHtml(deck.info)}</p>` : ''}
      </li>`)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Slides</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0 auto;
        padding: 3rem 1.5rem;
        max-width: 44rem;
        font-family: ui-sans-serif, system-ui, "Hiragino Sans", "Noto Sans JP", sans-serif;
        line-height: 1.7;
      }
      h1 { font-size: 1.6rem; margin-bottom: 2rem; }
      ul { list-style: none; padding: 0; }
      li { border-top: 1px solid color-mix(in srgb, currentColor 15%, transparent); padding: 1rem 0; }
      a { display: flex; flex-wrap: wrap; gap: 0 0.75rem; align-items: baseline; text-decoration: none; color: inherit; }
      a:hover .title { text-decoration: underline; }
      .slug { font-variant-numeric: tabular-nums; opacity: 0.6; font-size: 0.9rem; }
      .title { font-weight: 600; }
      .info { margin: 0.25rem 0 0; opacity: 0.7; font-size: 0.9rem; }
    </style>
  </head>
  <body>
    <h1>Slides</h1>
    <ul>
${items}
    </ul>
  </body>
</html>
`

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
  }[char]))
}
