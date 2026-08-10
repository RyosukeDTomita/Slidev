import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const IGNORED = new Set(['node_modules', 'dist', 'scripts', 'templates', 'public'])

/**
 * リポジトリ直下のディレクトリのうち slides.md を持つものを1つの勉強会デッキとして扱う。
 * 例: 2026-08-28/slides.md -> スラッグ "2026-08-28"
 */
export function listDecks() {
  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && !IGNORED.has(entry.name))
    .map(entry => entry.name)
    .filter(slug => fs.existsSync(path.join(rootDir, slug, 'slides.md')))
    .sort()
    .map(slug => ({
      slug,
      dir: path.join(rootDir, slug),
      entry: path.join(rootDir, slug, 'slides.md'),
      ...readMeta(path.join(rootDir, slug, 'slides.md'), slug),
    }))
}

/** slides.md の先頭 frontmatter から title / info を読む。無ければ最初の見出しを使う。 */
function readMeta(entry, slug) {
  const source = fs.readFileSync(entry, 'utf8')
  const frontmatter = source.startsWith('---') ? source.slice(3).split(/^---/m)[0] : ''

  const title = matchScalar(frontmatter, 'title') ?? source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug
  const info = matchScalar(frontmatter, 'info')

  return { title, info }
}

/** YAML パーサを持ち込まずに `key: value` 形式の1行スカラーだけ拾う。 */
function matchScalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:[ \\t]*(.+)$`, 'm'))?.[1]?.trim()
  if (!value || value === '|' || value === '>')
    return undefined
  return value.replace(/^['"]|['"]$/g, '')
}

/** 引数でスラッグが指定されればそれだけ、無ければ全デッキを返す。 */
export function selectDecks(slugs) {
  const decks = listDecks()
  if (decks.length === 0)
    throw new Error('slides.md を持つディレクトリが見つかりません。`pnpm new <名前>` で作成してください。')

  if (slugs.length === 0)
    return decks

  return slugs.map((slug) => {
    const normalized = slug.replace(/[/\\]+$/, '')
    const deck = decks.find(d => d.slug === normalized)
    if (!deck)
      throw new Error(`デッキ "${slug}" が見つかりません。候補: ${decks.map(d => d.slug).join(', ')}`)
    return deck
  })
}
