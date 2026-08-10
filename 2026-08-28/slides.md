---
theme: seriph
title: 2026-08-28 勉強会
info: Slidev + Nix + GitHub Pages のサンプルスライド
class: text-center
transition: slide-left
mdc: true
---

# 2026-08-28 勉強会

Slidev のサンプルスライド

<div class="pt-12">
  <span class="px-2 py-1 rounded bg-white bg-opacity-10">
    Space キーで次へ →
  </span>
</div>

---

## このリポジトリの使い方

```bash
nix develop            # 開発シェルに入る
npm install            # 初回のみ
npm run dev 2026-08-28 # プレビュー
```

`main` に push すると GitHub Actions が
`/Slidev/2026-08-28/` へ公開する。

---
layout: center
class: text-center
---

# 本文を書き換えて使う

`2026-08-28/slides.md`
