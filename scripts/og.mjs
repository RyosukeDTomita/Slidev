import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { rootDir, selectDecks } from './decks.mjs'

// SNSのOGP画像を1ページ目のスクリーンショットから作る。
// Slidev は `<デッキ>/og-image.png` があれば og:image を自動で出すので、
// ここで生成したものをコミットしておけば `pnpm build` 側に Playwright は要らない。
// 実行には Chromium が必要なので `nix develop .#export` のシェルを使うこと。
const decks = selectDecks(process.argv.slice(2))

// X の summary_large_image は 1200x628 以上が推奨。canvasWidth(980) の2倍で足りる。
const SCALE = 2

for (const deck of decks) {
  const out = path.join(deck.dir, 'og-image.png')
  console.log(`\n==> generating og image ${deck.slug} -> ${path.relative(rootDir, out)}`)

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'slidev-og-'))
  try {
    // png は --output をディレクトリとして扱い、その中にページ番号ごとのファイルを吐く。
    const result = spawnSync(
      'pnpm',
      [
        'exec',
        'slidev',
        'export',
        deck.entry,
        '--format',
        'png',
        '--range',
        '1',
        '--scale',
        String(SCALE),
        '--output',
        tmp,
      ],
      { cwd: rootDir, stdio: 'inherit', shell: process.platform === 'win32' },
    )

    if (result.status !== 0)
      process.exit(result.status ?? 1)

    const png = fs.readdirSync(tmp).find(file => file.endsWith('.png'))
    if (!png)
      throw new Error(`[${deck.slug}] png が出力されませんでした。`)

    fs.copyFileSync(path.join(tmp, png), out)
  }
  finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }
}

console.log('\n==> 生成した og-image.png はコミットすること (CI では再生成しない)')
