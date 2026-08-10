# Slidev

[Slidev](https://sli.dev/)環境

- 全スライドの一覧: <https://ryosukedtomita.github.io/Slidev/> には全スライドの一覧が自動生成される。
- サブディレクトリごと: `https://ryosukedtomita.github.io/Slidev/<ディレクトリ名>/`
    - 例: `2026-08-28/slides.md` → <https://ryosukedtomita.github.io/Slidev/2026-08-28/>


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

## INITIAL SETTINGS

- GitHub リポジトリの **Settings -> Pages -> Build and deployment -> Source** を**GitHub Actions** に変更する。
- 必要なら Settings --> Environments -> にブランチを追加する
