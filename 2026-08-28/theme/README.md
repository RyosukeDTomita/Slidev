# slidev-theme-tomogashima

夏の海と島(友ヶ島)をモチーフにした Slidev のローカルテーマ。

`slides.md` の headmatter で `theme: ./theme` と書くと有効になる。

---

## デザインの方針

- **Solarized Dark の色相はそのまま、明度差だけ広げる**
  - Solarized Dark をそのまま投影すると本文 (`base0` = `#839496`) が背景に沈む
  - 背景をより深く、本文をより明るくして、コントラストだけ稼いでいる
- **海の断面**: 上が空、`62%` の位置が水平線、下が海。表紙・章扉・エンドで共通
- **アクセントは金**: デスティニーの光の翼と夕日を兼ねた色。強調はすべてこの金に寄せる
- **動くのは表紙とエンディングだけ**: 本編で波が流れていると話の邪魔になるので、
  `section` と `statement` の波は止めてある。`<Waves :animated="false">` で制御している

### 配色

CSS 変数として `styles/index.css` の `:root` に定義してある。

| 変数 | 値 | 用途 | Solarized の対応 |
| --- | --- | --- | --- |
| `--tg-abyss` | `#001019` | 最深部の背景 | (base03 より深い) |
| `--tg-deep` | `#002b36` | 背景 | base03 |
| `--tg-shallow` | `#073642` | パネル背景 | base02 |
| `--tg-text` | `#dbe8e6` | 本文 | (base1 より明るい) |
| `--tg-bright` | `#fdf6e3` | 見出し | base3 |
| `--tg-muted` | `#93a8ab` | 補足 | base1 |
| `--tg-gold` | `#f5c542` | 強調・光の翼 | yellow 系 |
| `--tg-cyan` | `#3fd0c4` | リンク・箇条書き | cyan |
| `--tg-red` / `--tg-green` / `--tg-blue` ほか | - | 補助 | 各アクセント |

コードハイライトは`setup/shiki.ts`で`solarized-dark` / `solarized-light`を指定している。
ただし`solarized-dark`はプロジェクタだと沈む色が多いので、`styles/index.css`でトークンごとに上書きしている。

Slidevはダーク/ライトのデュアルテーマなので、Shikiは色を`color`ではなく`--shiki-dark` / `--shiki-light`の
インライン変数として吐く。上書きは`html.dark .slidev-layout .shiki span[style*='--shiki-dark: <色>' i]`という
属性セレクタで拾う(`--shiki-dark: `まで含めること。色だけで一致させると`--shiki-light`側に同じ色を持つ
無関係なトークンを巻き込む)。Slidev側にはfont-style / font-weightを当てるCSSがないので、斜体・太字も
ここで拾い直している。

| トークン | Solarized | 上書き後 |
| --- | --- | --- |
| コード本文 | base0 `#839496` | `#b5cac9` |
| コメント | base01 `#586e75` | `#769298`(斜体) |
| 型 | base1 `#93a1a1` | `--tg-cyan`(太字) |
| 関数名・型変数 | `#268bd2` | `--tg-blue` |
| キーワード・演算子 | `#859900` | `--tg-green` |
| データ構築子 | `#cb4b16` | `--tg-orange` |
| 数値リテラル | `#d33682` | `--tg-magenta` |

---

## レイアウト

| layout | 用途 | frontmatter |
| --- | --- | --- |
| `cover` | 表紙。夕日 + 島 + 光の翼 | `icon` / `speaker` / `meta` / `link` |
| `section` | 章扉。風景を下げてタイトルを大きく出す | `index`: 章番号(`"01"` のように**クォートする**) |
| `statement` | 一番言いたいことを1行だけ置く | - |
| `end` | エンディング。夕暮れの海 | `qr` / `qrCaption` / `qr2` / `qr2Caption` |

上記以外(`default`、`two-cols`、`center` など)は Slidev の組み込みレイアウトがそのまま使える。

### `cover`

左下に「アイコン + 発表者名 + イベント名」、右下にイベントページの URL を出す。

| キー | 内容 |
| --- | --- |
| `icon` | `public/` 配下の画像。`/icon.png` のようにスラッシュ始まりで書く(base は自動で前置される) |
| `speaker` | 発表者名 |
| `meta` | イベント名や日付 |
| `link` | イベントページの URL。右下に小さく出る |

```markdown
---
layout: cover
icon: /icon.png
speaker: sigma (Ryosuke Tomita)
meta: "Netadashi Meetup #17 / 2026-08-28"
link: https://peatix.com/event/5095532
---
```

### `end`

`qr` を渡すと、夕日と島を避けた左下に QR コードが出る。
`qr2` を渡すと2枚目がその右隣に並ぶ(発表資料 + Qiita記事、のように使う)。

```markdown
---
layout: end
qr: /資料QR.png
qrCaption: 発表資料
qr2: /qiitaQR.png
qr2Caption: Qiita
---
```

### `section`

```markdown
---
layout: section
index: "01"
---

# なぜHaskellなのか

誓約と制約
```

各スライドの上部に出る大項目(章)表示は、そのページから手前に遡って最初に見つかった
章扉の `index` と見出しを使う。ただし `end` レイアウトに当たった時点で打ち切るので、
締めより後ろに置いたReferenceやAppendixは、直前の章を引きずらない。

---

## コンポーネント

### `<Tag>`

キーワードを目立たせるピル。`color` は `gold` / `cyan` / `red` / `green` / `blue` / `muted`。

```markdown
- 好きなもの: <Tag color="cyan">Solarized</Tag> <Tag color="gold">夏の海と島</Tag>
```

### `<Callout>`

主張や補足を囲むボックス。`type` は `point`(既定、金) / `info`(シアン) / `warn`(オレンジ)。
`title` を省略すると、`info` は「補足」、`warn` は「ハマりどころ」が入る。
`point` は既定の見出しを持たず、本文だけが出る。

```markdown
<Callout type="warn" title="ハマりどころ">
ただし抽象化は、<strong>手を動かした量</strong>の後にしか来ない。
</Callout>
```

> [!NOTE]
> Callout の中身は HTML として書く。Markdown の `**強調**` ではなく `<strong>` を使う。

### `<QrCode>`

QR コード。読み取れることが最優先なので、必ず白いカードに載せてクワイエットゾーンを確保する。
`src` は `public/` 配下のパス、`size` は QR 本体の一辺(既定 `260px`)、`caption` は下の説明。

```markdown
<QrCode src="/資料QR.png" size="265px" />
```

1枚まるごと QR にするなら `layout: statement` と組み合わせるとちょうどよい。
エンディングに小さく添えるだけなら `end` レイアウトの `qr` を使う。

### `<SeaScape>` / `<Waves>`

背景の風景と波。レイアウトから使われる。個別のスライドで直接使うことは基本ない。

---

## ユーティリティクラス

| クラス | 用途 |
| --- | --- |
| `tg-gold` / `tg-cyan` / `tg-red` / `tg-green` / `tg-muted` | 文字色 |
| `tg-dense` | 1枚に収まらないときに文字を少し詰める |
| `tg-anim` | アニメーション対象の目印(`prefers-reduced-motion` で停止する) |
| `tg-quote` | 名言の引用。`tg-quote__body` に台詞、`tg-quote__cite` に話者を入れる |
| `tg-annotated` | コードの一部を枠で囲んで注釈する。中で `tg-focus`(金) / `tg-pat`・`tg-either`(金) / `tg-rec`・`tg-fn`(シアン) を使う |

```html
<div class="tg-quote">
  <p class="tg-quote__body">まだだ! まだ終わらんよ!</p>
  <p class="tg-quote__cite">クワトロ・バジーナ『機動戦士Ζガンダム』(宇宙世紀0087年)</p>
</div>
```

引用符と em ダッシュは CSS が足すので、本文には書かない。

---

## 既知の注意点

- 章番号 `index` はクォートしないと YAML が数値として解釈し、`"02"` が `2` になる。
- YAML では空白のあとの `#` から行末がコメントになる。
  `meta: Netadashi Meetup #17` は `Netadashi Meetup` に切り詰められるので、クォートが必須。
- 発表者名のキーが `presenter` ではなく `speaker` なのは、`presenter` が
  プレゼンターモードを制御する Slidev の設定キーと衝突するため。
- 日本語の直後に `**` を置いて `「` などの約物が続くと、markdown-it が強調として扱わない。
  `そこに**「意味」**を` ではなく `そこへ**意味**を` のように書くか、`<strong>` を使う。
- 配色は `colorSchema: dark` 固定。ライトテーマには対応していない。

---

## 他の回でも使いたくなったら

いまは `2026-08-28/theme/` に置いてあるので、この回の `slides.md` からしか参照できない。
使い回すならリポジトリ直下に移して、各 `slides.md` から相対パスで参照する。

```markdown
---
theme: ../themes/tomogashima
---
```
