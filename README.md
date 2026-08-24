# Slidev

[Slidev](https://sli.dev/)環境

- 全スライドの一覧: <https://ryosukedtomita.github.io/Slidev/> には全スライドの一覧が自動生成される。
- サブディレクトリごと: `https://ryosukedtomita.github.io/Slidev/<ディレクトリ名>/`
    - 例: `2026-08-28/slides.md` → <https://ryosukedtomita.github.io/Slidev/2026-08-28/>
- ページ単位: `https://ryosukedtomita.github.io/Slidev/<ディレクトリ名>/<ページ番号>/`
    - 例: 9ページ目 → <https://ryosukedtomita.github.io/Slidev/2026-08-28/9/>
    - リロードしても404にならないので、SNSなどにはこのURLを貼ればよい。仕組みは[ページ単位のURL](#ページ単位のurl)を参照。


---

## INITIAL SETTINGS

- GitHub リポジトリの **Settings -> Pages -> Build and deployment -> Source** を**GitHub Actions** に変更する。
- 必要なら Settings --> Environments -> にブランチを追加する

---

## HOW TO USE

パッケージマネージャは pnpm。node と一緒に `nix develop` で入る。

```bash
nix develop
pnpm install
```

```bash
pnpm new 2026-09-15      # 新しい勉強会のディレクトリと slides.md を作る
pnpm dev 2026-08-28      # ブラウザでプレビュー(ホットリロードあり)
pnpm build               # 全スライドを dist/ にビルド
pnpm build 2026-08-28    # 指定したスライドだけビルド
```

`pnpm dev` は引数を省略すると最初のスライドを開く。

### 画像

画像はスライドと同じディレクトリの `public/` に置き、`/icon.png` のようにスラッシュ始まりで参照する。
`public/` の中身はビルド時に公開ディレクトリ直下へコピーされ、base(`/Slidev/<ディレクトリ名>/`)は自動で前置される。

`.gitignore` は `*.png` を無視するが `public/` 配下だけは例外にしてある。
ここに置いた画像をコミットし忘れると CI のビルドに含まれず、公開サイトだけ画像が出ない状態になる。

### PDF 出力

PDF 出力には Chromium が必要なので、専用のシェルを使う。

```bash
nix develop .#export
pnpm export 2026-08-28   # 2026-08-28/2026-08-28.pdf が出力される
```

### GitHub Actions

```bash
aqua i -l                   # ツールをインストール
pinact run                  # actionをcommit SHAにピン留め
pinact run --check          # ピン留め漏れをチェックするだけ
ghalint run                 # workflowのポリシー違反をチェック
```

---

## Doc

### ページ単位のURL

Slidev のビルド結果は SPA で、実体は `index.html` 1枚しかない。
`/<ディレクトリ名>/9/` のようなURLを直接開くにはサーバ側の rewrite が必要だが、
GitHub Pages にはその仕組みがない(Slidev が出力する `_redirects` は Netlify 用で、
サブディレクトリの `404.html` も GitHub Pages は参照しない)。
そのままだとブラウザのリロードや外部からの直リンクが404になる。

そこで `pnpm build` はビルド後に、ページ番号のディレクトリへ `index.html` を複製する。

```text
dist/2026-08-28/index.html
dist/2026-08-28/1/index.html
dist/2026-08-28/9/index.html   # /Slidev/2026-08-28/9/ が実ファイルとして 200 で返る
```

ページ数は `@slidev/parser` で `slides.md` を解析して数える(`hide` / `disabled` のスライドはルートを持たないため除外される)。
スライドを増減させてもビルドし直せば追従する。

