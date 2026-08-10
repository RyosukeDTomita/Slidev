---
theme: ./theme
title: Haskellで挑む競技プログラミング
info: "Haskellで意味(セマンティクス)を拡張する - Netadashi Meetup #17"
author: sigma (Ryosuke Tomita)
layout: cover
icon: /icon.png
speaker: sigma (Ryosuke Tomita)
meta: "Netadashi Meetup #17 / 2026-08-28"
link: https://peatix.com/event/5095532
transition: fade-out
mdc: true
---

# Haskellで挑む<br>競技プログラミング

## 意味(セマンティクス)を拡張する

---
layout: statement
---

# 資料はこちら

<QrCode src="/資料QR.png" size="265px" />

---
layout: section
index: "00"
---

# 自己紹介

友ヶ島から来ました(嘘)

---

## whoami

- セキュリティエンジニア出身、いまはSWEに寄っていく途中
- 育休中に**Haskellで競技プログラミング**を始めた
- 好きなもの
  - <Tag color="cyan">Solarized</Tag> <Tag color="gold">夏の海と島</Tag> <Tag color="red">デスティニーガンダム</Tag>
  - 人の葛藤を描いた作品、マイナーなもの、集めること
- 直近の遠征: **友ヶ島**(和歌山)
  - 砲台跡とラピュタ感、そして`サマータイムレンダ`の聖地

<Callout type="info" title="このスライドについて">
配色は Solarized Dark 由来。ただし投影で沈まないよう、明度差だけ広げてあります。
</Callout>

---
layout: statement
---

# 理解する楽しさを、**AIに奪わせるな**

競技プログラミングは、その練習場として都合がいい

---
layout: section
index: "01"
---

# なぜHaskellなのか

誓約と制約

---

## モチベーションは「フラストレーション」

- ツールの使い方に逃げていないか?
  - 手は動くが、**本質的な成長**をしている感じがしない
- 自分のコードに自信が持てない
  - パフォーマンスの悪いコード
  - テストが書きづらいコード
  - AIが書いたコードを、何を根拠にレビューするのか

<Callout>
コードを評価する<strong>軸</strong>がほしかった。<br>
「動く」以外の物差しを持つために、言語のほうを縛ることにした。
</Callout>

---

## Haskellという「縛り」

<div class="tg-dense">

| 普通の言語でできること | Haskellでの扱い |
| --- | --- |
| どこでも副作用を起こす | 型 (`IO`) に閉じ込める |
| 変数を書き換える | 基本しない。値を作り直す |
| 必要になったら評価 | 遅延評価がデフォルト (call-by-need) |
| 型はバグ避け | 型が**設計**そのもの |

</div>

- 「できないこと」が増えると、**問題の捉え方**が変わる
- 関数型プログラミングは、数学の高度な抽象化を使うための<Tag color="gold">縛り</Tag>

---
layout: section
index: "02"
---

# 競技プログラミングで何が見えたか

私にも敵が見えるぞ

---

## 計算量が「見える」ようになった

```haskell
-- O(n^2): リストの ++ を繰り返すと、毎回コピーが走る
slow :: [Int] -> [Int]
slow = foldl (\acc x -> acc ++ [x]) []

-- O(n): 先頭に積んで最後に1回だけ反転する
fast :: [Int] -> [Int]
fast = reverse . foldl' (flip (:)) []
```

- クソコードは**TLE**という形で即座に殴ってくる
  - フィードバックが速い。これが自分には効く
- GC、遅延評価、サンクの積み上がり
  - 普段意識しないものを、意識せざるを得なくなる

---

## 入出力は一本の変換として書く

```haskell
import qualified Data.ByteString.Char8 as BS

main :: IO ()
main = BS.interact $ solve . map readInt . BS.words
  where
    readInt = maybe (error "parse error") fst . BS.readInt

solve :: [Int] -> BS.ByteString
solve (n : xs) = BS.pack . show . sum $ take n xs
solve _        = error "invalid input"
```

- `IO`は**入口と出口だけ**。真ん中は全部純粋関数
- 純粋関数はテストが書きやすい。**再現性がある**

---
layout: section
index: "03"
---

# 意味(セマンティクス)を拡張する

今日の本題

---

## 同じ型に、別の意味を与える

```haskell
newtype MinInt = MinInt Int deriving (Eq, Show)

instance Semigroup MinInt where
  MinInt a <> MinInt b = MinInt (min a b)

instance Monoid MinInt where
  mempty = MinInt maxBound
```

- `Int`はただの整数。そこへ**畳み込み方という意味**を後付けする
- `<>`が何をするかは、**型が決める**

<Callout type="info">
<code>newtype</code> は実行時のコストがゼロ。意味だけを足して、表現は変えない。
</Callout>

---

## 意味を差し替えると、アルゴリズムが再利用できる

```haskell
-- モノイドでありさえすれば、同じセグメント木が動く
newtype SegTree a = SegTree (V.Vector a)

query :: Monoid a => SegTree a -> Int -> Int -> a
query t l r = mconcat [ get t i | i <- [l .. r - 1] ]
```

- <Tag color="gold">Sum</Tag> を渡せば区間和、<Tag color="cyan">MinInt</Tag> を渡せば区間最小値
- 実装は**1つ**。変えるのは「意味」だけ

<Callout>
抽象化 = 問題の捉え方を変えること。<br>
パターン化が効くと、<strong>復習が複利で効いてくる</strong>。
</Callout>

---

## 抽象化は、脳のメモリを節約する

- 「区間最小値クエリ」ではなく「モノイドの畳み込み」として覚える
  - 覚える対象が減り、**思い出すコストが下がる**
- 同じ構造が別の問題で顔を出す
  - ここで初めて「見える、私にも敵が見える」になる

<Callout type="warn">
ただし抽象化は、<strong>手を動かした量</strong>の後にしか来ない。<br>
先に抽象論から入ると、ただの呪文になる。
</Callout>

---
layout: section
index: "04"
---

# 伝えたいこと

理解を手放さない

---

## 理解がないと、勇気が出ない

- ボトルネックは、だいたい**自分**
  - 「俺の敵はだいたい俺」
- 分からないものは怖い。**恐怖を減らすのは理解だけ**
  - 低レイヤーに降りる、型に降りる、数学に降りる
- 理解は外注できない
  - AIに委ねられるのは**作業**であって、**理解**ではない

---
layout: statement
---

# 理解に時間をかける → **勇気が出る** → 次の世界へ

自分の見える世界を拡張することが、たぶん一番おもしろい

---

## まとめ

1. Haskellの「縛り」は、問題の捉え方を変える装置だった
2. 競技プログラミングは、**フィードバックが速い**練習場
3. `newtype`とモノイドで**意味を拡張**すると、実装は1つで済む
4. 理解は外注できない。だから理解に時間をかける

<Callout title="今日持って帰ってほしいこと">
CSはおもしろい。Haskellは、低レイヤーへの<strong>第三の目</strong>になる。
</Callout>

---
layout: end
qr: /資料QR.png
qrCaption: 発表資料
---

# ありがとうございました

友ヶ島でまた会いましょう

