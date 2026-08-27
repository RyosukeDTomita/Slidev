import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { load } from '@slidev/parser/fs'
import { rootDir, selectDecks } from './decks.mjs'

// GitHub Pages ではリポジトリ名がパスに入るため `/Slidev/` のようなベースが必要。
// CI からは BASE_PATH で渡す。ローカルの動作確認では `/` で十分。
const basePath = normalizeBase(process.env.BASE_PATH ?? '/')
// OGP の URL は絶対URLでないと X などのクローラが解決してくれない。
// CI からは公開サイトのオリジン(`https://<user>.github.io`)を SITE_URL で渡す。
const siteUrl = normalizeSiteUrl(process.env.SITE_URL)
const outRoot = path.join(rootDir, 'dist')
const OG_IMAGE = 'og-image.png'
const QUOTED_META = ['description', 'author', 'keywords', 'og:description']
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

  copyOgImage(deck, out)
  await writePageDirs(out, deck, base)
}

writeIndex(outRoot, basePath, decks)
console.log(`\n==> ${decks.length} deck(s) -> ${path.relative(rootDir, outRoot)}/`)

/**
 * Slidev の出力は SPA なので実体は index.html しかなく、`/<スライド名>/9/` を直接開くと
 * サーバ側の rewrite が要る。GitHub Pages にはそれが無い(Slidev が出す `_redirects` は
 * Netlify 用で、サブディレクトリの 404.html も Pages は使わない)ので、
 * ページ番号のディレクトリに index.html を実ファイルとして複製しておく。
 * これでリロードもSNSからの直リンクも 200 で開ける。
 */
async function writePageDirs(out, deck, base) {
  // hide / disabled のスライドはルートを持たないため、load の時点で除かれている。
  const { slides } = await load({ roots: [deck.dir], userRoot: deck.dir }, deck.entry)
  const index = path.join(out, 'index.html')
  const html = withAbsoluteOgImage(unquoteMeta(fs.readFileSync(index, 'utf8')), base)

  fs.writeFileSync(index, withOgUrl(html, base))

  for (let no = 1; no <= slides.length; no++) {
    const dir = path.join(out, String(no))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), withOgUrl(html, `${base}${no}/`))
  }

  console.log(`    ${slides.length} page(s) -> ${path.relative(rootDir, out)}/<番号>/index.html`)
}

/**
 * OGP のカバー画像。`<デッキ>/og-image.png` があれば Slidev が og:image を出すが、
 * seoMeta.ogImage を指定していない場合はファイル自体をコピーしてくれないので、ここで置く。
 * (seoMeta.ogImage: auto にすると未生成時に Playwright を呼びに行って CI が落ちるため使わない)
 */
function copyOgImage(deck, out) {
  const src = path.join(deck.dir, OG_IMAGE)
  if (!fs.existsSync(src)) {
    console.log(`    og:image なし (\`pnpm og ${deck.slug}\` で生成してコミットする)`)
    return
  }
  fs.copyFileSync(src, path.join(out, OG_IMAGE))
}

/**
 * Slidev は headmatter 由来の meta を JSON.stringify してから埋めるため、値が `"..."` と
 * ダブルクオートで囲まれた状態(HTMLでは `&quot;`)で出てくる。そのままだとSNSカードの
 * 説明文に引用符が見えるので剥がす。中身の `"` は先に `&quot;` へ escape 済みなので、
 * 前後1つずつを取るだけでよい。
 */
function unquoteMeta(html) {
  return QUOTED_META.reduce(
    (acc, key) => acc.replace(
      new RegExp(`((?:name|property)="${key}" content=")&quot;(.*?)&quot;(")`),
      '$1$2$3',
    ),
    html,
  )
}

/**
 * Slidev が出す og:image は `./og-image.png` という相対URLで、`/<デッキ>/9/` のような
 * ページ単位URLからは解決できないうえ、X は絶対URLしか受け付けない。公開URLに書き換え、
 * ついでに og:image にフォールバックしないクライアント向けに twitter:image も足す。
 */
function withAbsoluteOgImage(html, base) {
  if (!/property="og:image"/.test(html))
    return html

  const url = absoluteUrl(`${base}${OG_IMAGE}`)
  return html
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${url}$2`)
    .replace('</head>', `<meta property="twitter:image" content="${url}">\n</head>`)
}

/** og:url はカードに出る遷移先。ページごとに違うので複製時に入れる。 */
function withOgUrl(html, pathname) {
  const url = absoluteUrl(pathname)
  if (!url.startsWith('http'))
    return html
  return html.replace('</head>', `<meta property="og:url" content="${url}">\n</head>`)
}

/** SITE_URL が無いローカルビルドでは、せめてサイトルート基準の絶対パスにしておく。 */
function absoluteUrl(pathname) {
  return `${siteUrl}${encodeURI(pathname)}`
}

function normalizeSiteUrl(value) {
  return value ? value.replace(/\/+$/, '') : ''
}

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
