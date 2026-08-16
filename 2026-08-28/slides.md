---
theme: ./theme
title: Haskellでプログラミングに対するメンタルモデルを拡張する
info: "Haskellでプログラミングに対するメンタルモデルを拡張する - Netadashi Meetup #17"
author: sigma (Ryosuke Tomita)
layout: cover
icon: /icon.png
speaker: sigma (Ryosuke Tomita)
meta: "Netadashi Meetup #17 / 2026-08-28"
link: https://peatix.com/event/5095532
transition: fade-out
mdc: true
---

# Haskellでプログラミングに対する<br>メンタルモデルを拡張する

## Haskellを学んだら視野が広がった、というn=1の話

---
layout: statement
---

# 資料はこちら

<QrCode src="/資料QR.png" size="265px" />

---
layout: statement
---

# Haskellを始めたことで、<br>プログラミングが**一段と楽しくなった**

AIがコードを書く時代だからこそ、自分の**観測できる世界を拡張していく**

---
layout: section
index: "01"
---

# Haskellを学ぶ前

なぜ関数型?

---

## 課題 「思想」が薄い!

- AIの書いたコードを振る舞い以外で評価できない
  - SNSでAIの書いたコード批判を目にするも、自分には感じられなかった(2023年頃)
- ドメイン知識やアイデアで勝負できないかと考えるも、これもうまくいかず

<Callout>
結局、コードに対する思想がないとAIにダメ出しができない。
</Callout>

- (Qiitaを100記事以上書いたり、LTをしたりしてキャラ売りを試みるも、速度と量以外で価値を出せず)

---

## テストの書きやすいコードという指針 -> 関数型?

<div class="grid grid-cols-[1.5fr_1fr] gap-6 items-center">
<div>

- 自動テストがないシステムに対して、保守/開発を行った
  - リリース単位で手動でテストを再実施するのが辛い
  - 仕様書を読み間違えるミス
- 自動テストがあれば楽できるはず...
  - **副作用と状態があちこちに絡んでいてうまくいかない!**
  - E2Eだらけに(今思うとシステム特性もある)
- テストが書きやすいシステムとは?どうやって品質を担保すればいいのか?

<Callout>
<strong>関数型プログラミング</strong>だと単体テストが書きやすいらしい?
</Callout>

</div>
<div class="flex gap-3 justify-center">

<img src="/book-tdd.jpg" class="max-h-65 object-contain rounded shadow-lg" alt="テスト駆動開発" />
<img src="/book-unit-testing.jpg" class="max-h-65 object-contain rounded shadow-lg" alt="単体テストの考え方/使い方" />

</div>
</div>

---

## でも、関数型ってよくわからない -> やらないと判断できない

<Callout type="warn" title="Blub Paradox (ポール・グレアム『Beating the Averages』)">

- 慣れ親しんだ言語(仮想言語Blub)より弱い言語は「あの機能がない」と分かる。
- しかしBlubより強い言語を見ても、何が凄いのか分からない。
- **Blubで考えている**から。
- Blubの良さを正しく理解するためには**Blubを使ってみる必要がある**

</Callout>

### -> (ちょうど子供も産まれるし)純粋関数型のHaskellに全部賭けるか!

([一休CTO naoyaさんの発表資料](https://speakerdeck.com/naoya/20230227-engineer-type-talk)の影響も受けている)

---
layout: section
index: "02"
---

# Haskellの自己紹介

Haskell神の代弁者でしかない自分の自己紹介は割愛。

---

## 誓約と制約で力を得た言語

HUNTER×HUNTER方式: 自らに**強い制約**を課すことで、**強力なパワー**を得る

<div class="tg-dense">

| 自らに課した制約(誓約) | 内容 |
| --- | --- |
| **純粋関数** | 参照透過性をもち、副作用を持たない |
| **束縛(不変性)** | 変数は書き換えない。値と名前を結びつけるだけ |
| **強い型** | 副作用や失敗にも型がつく |

</div>

<Callout title="得たパワー">
<strong>遅延評価(call-by-need)</strong> — 値が必要になる瞬間まで、計算をサボり続けられる。
</Callout>

---
layout: section
index: "03"
---

# 遅延評価とは?

簡単な例

---

## 遅延評価: 必要になるまで評価しない

- 式はすぐに計算されず、**サンク**(thunk)という「計算の予約」が積まれる
- 値が**本当に必要になった瞬間**に、初めてサンクが潰れて値になる
- だから「無限リスト」のような、普通の言語では作れないものが作れる
- 複数の式が同じサンクを共有することができ、同じ計算が二度行われない(グラフ簡約)

```haskell
-- 無限リスト
xs = [1..] :: [Int]
```

```haskell
-- xsが共有される例
let xs = map f [1..100]
	in (sum xs, length xs)
```

### -> `ghci`(REPL)と`ghc-vis`(視覚化するツール)を使って遅延評価を観察してみる

---

## デモ① 無限リストを宣言するとサンクが作られる

```
ghci> let xs = [1..] :: [Int]
ghci> :sprint xs -- 状態確認
xs = _
```

- `_`は**未評価**の印。まだ何も計算されていない
- ヒープ上には「リストを作る予約」だけが置かれている

<img src="/demo-xs-thunk.png" class="mt-4 max-h-45 w-full object-contain" alt="未評価の無限リストのヒープ表現" />

---

## デモ① `head`で先頭だけ要求すると先頭だけ評価される

<div class="grid grid-cols-[1.4fr_1fr] gap-6 items-center">
<div>

```
ghci> head xs
1
ghci> :sprint xs
xs = 1 : _
```

- 先頭の`1`**だけ**が評価された
- 残り(無限のしっぽ)は**Thunkのまま**
- 無限リストでも、必要な分しか計算しない

</div>
<div>

<img src="/demo-xs-head.png" class="max-h-80 mx-auto object-contain" alt="先頭だけ評価されたリスト" />

</div>
</div>

---

## デモ② `length`は「構造」だけを評価する

<div class="grid grid-cols-[1.1fr_1fr] gap-6 items-center">
<div>

<Callout>
`length`はリストの長さを返す関数なので無限リストに対して使うと停止しない。
</Callout>

```
-- map (+1)を挟む理由は巻末のおまけ参照
ghci> let ys = (map (+1) . take 10) [0..] :: [Int]
ghci> length ys
10
ghci> :sprint ys
ys = [_,_,_,_,_,_,_,_,_,_]
```

- 長さを数えるのにリストの**構造**は必要
- しかし**要素の中身**は不要 → 10個のサンクになっている

</div>
<div>

<img src="/demo-ys-length.png" class="max-h-95 mx-auto object-contain" alt="背骨だけ評価され要素はサンクのままのリスト" />

</div>
</div>

<!--
[0..]はenumFromのシンタックスシュガー。内部実装はプリミティブ演算(eftInt)で、Int自体がunlifted型でサンクになれないため、要素位置にサンクを置く目的でmap (+1)を挟んでいる。
-->

---

## デモ③ `find`は見つかるまでしか評価しない

<div class="grid grid-cols-[1.1fr_1fr] gap-6 items-center">
<div>

```
ghci> let ys = (map (+1) . take 10) [0..] :: [Int]
ghci> find (==3) ys
Just 3
ghci> :sprint ys
ys = 1 : 2 : 3 : _
```

- `3`を探すために先頭から評価する
- → `1, 2, 3`まで評価して
- 残りは手つかずのサンク

</div>
<div>

<img src="/demo-ys-find.png" class="max-h-95 mx-auto object-contain" alt="3が見つかるまで評価されたリスト" />

</div>
</div>

---

## デモ④ 表示すれば、全て評価される

<div class="grid grid-cols-[1.1fr_1fr] gap-6 items-center">
<div>

```
ghci> let ys = (map (+1) . take 10) [0..] :: [Int]
ghci> show ys
"[1,2,3,4,5,6,7,8,9,10]"
ghci> :sprint ys
ys = [1,2,3,4,5,6,7,8,9,10]
```

- `print`は全要素の値が必要 → 全サンクが評価される
- ここでようやく、素直なリストの形になった

</div>
<div>

<img src="/demo-ys-full.png" class="max-h-95 mx-auto object-contain" alt="全要素が評価されたリスト" />

</div>
</div>

---

## 遅延評価のおもしろコード① `head . sort`

```haskell
minimum' :: Ord a => [a] -> a
minimum' xs = (head . sort) xs
```

- 見た目は「全部ソートして先頭を取る」= $O(n \log n)$に見える
- しかし`head`は**先頭の1要素しか要求しない**
  - 遅延評価により、ソートは先頭を確定させる分までしか進まない
  - 計算量は、おおよそ$O(n)$に

---

## 遅延評価のおもしろコード② フィボナッチ数列

$$
a_n = a_{n-1} + a_{n-2} \quad (a_0 = 0,\ a_1 = 1)
$$

<Callout type="warn">
定義をそのまま書けるが、同じ<code>fib</code>が何度も計算されてしまう。
</Callout>

```haskell
-- n番目のフィボナッチ数列を返す(メモ化なし)
fib :: Int -> Int
fib n
  | n == 0 = 0
  | n == 1 = 1
  | otherwise = fib (n - 1) + fib (n - 2)
```

---

## Python: メモ化を自分で書く

メモ化: 同じ計算を実行しなくてすむように計算した結果をキャッシュしておき、キャッシュがある場合には再計算しない

```python
memo = {}

# n番目のフィボナッチ数列を返す
def fib(n):
    if n in memo: # キャッシュを引く
        return memo[n]
    if n < 2:
        return n
    result = fib(n - 1) + fib(n - 2)
    memo[n] = result # ← キャッシュに入れる
    return result

fib(4)  # 3
```

---

## Haskell: 遅延評価の共有でメモ化を書かずにすむ


Haskellの遅延評価により、同じサンクを指す値は共有されるので、メモ化をしなくても同等の効果が得られる。

```haskell
-- フィボナッチ数列自体を再帰に定義できる。
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

fibs !! 4 -- 3
```

---
layout: section
index: "04"
---

# Haskellを支える3つの誓約

純粋関数・束縛・強い型

---

## 誓約① 純粋関数

- **参照透過性**: 同じ入力なら、いつ何度呼んでも同じ出力
- **副作用を持たない**

**純粋でない**ものの例:

- IO処理(ファイル、ネットワーク、画面出力)
- 例外を投げる
- ランダムな値を使う
- グローバル変数やインスタンス変数の変更

<Callout >
遅延評価を使うと評価されるタイミングがわかりにくくなる。<br>
副作用によって実行順を変えたくない e.g. `print`デバックを入れると評価されるタイミングが変わってしまう<br>
<strong> -> 純粋関数は遅延評価の前提条件</strong>
</Callout>

---

## 誓約② 束縛(不変性)

- 変数への代入ではなく、値と名前を結びつける**束縛(binding)**という言葉を使う。
- 再代入はコンパイルエラーになる

```haskell
x :: Int
x = 1

x = 2  -- error: Multiple declarations of 'x'
```

- 値が変わらないので、状態管理が不要になって嬉しい。
<!-- - パフォーマンスなどの事情で再代入が必要な場合には`ST`モナド等を使って範囲を絞って許可できる。 -->

---

## 誓約③ 強い型

- 副作用や例外も型として管理する。

```haskell
readFile :: FilePath -> IO String              -- IOがあると型に書いてある
lookup   :: Eq k => k -> [(k, v)] -> Maybe v   -- 失敗するかもと型に書いてある
```

- `IO`が型に現れる → **シグネチャを見るだけ**で副作用の有無が分かる
- `Maybe`/`Either` → 例外を投げずに「失敗」を**値として**返す

<Callout>
型は単なるバグ避けではなく、<strong>関数の性質を表明するドキュメント</strong>になる。
</Callout>

---
layout: section
index: "05"
---

# Haskellで見えるようになった世界

メンタルモデルの更新

---

## ①関数の組み合わせで処理を表現できる

- 条件分岐に使う`if`も関数。
- パターンマッチを使って関数の引数の構造によって関数を定義できる
- `for`や`while`は使わず、再帰関数を使う

```haskell
binarySearch :: Int -> Int -> (Int -> Bool) -> Int
binarySearch ok ng f
  | abs (ok - ng) <= 1 = ok -- これが最大の値
  | f mid = binarySearch mid ng f
  | otherwise = binarySearch ok mid f
  where
    mid = (ok + ng) `div` 2

main :: IO ()
main = do
  print $ binarySearch (-1) 100 (\x -> x ^ 2 <= 30) -- 2乗して30以下になる最大のxを2分探索で
```

---

## ②プログラムをどう解釈したかの意味づけをする

- Haskellはコンピュータに対する命令ではなく、構造を記述する
- 宣言的なコードになりやすい
- 関数の再利用がしやすい(カリー化、純粋関数、遅延評価等の恩恵)
- 同じ処理をするためのコードでもいろいろな書き方ができる

---

## ③Haskellを通して見えなかった世界との距離が縮まった(?)

- Haskellは高級言語の中でも抽象度が高い言語である。
- しかし、Haskellのコードのパフォーマンスを上げる/なぜこの機能が嬉しいのかを説明するためにはCSや数学の知識が必要になってくる
  - サンクはヒープにどう積まれる?
  - GCとの関係は?
  - 圏論や集合論
- Haskellを通して普段業務をしていると目が行かない抽象化されている面白い世界と会うことができた

---

## まとめ

- 最初のモチベーションはテストが書きやすいコードを書けるようになったりプログラミングを別の角度から見てみたいという好奇心からHaskellを始めた
- Haskellを学ぶことで、プログラミングを初めて学んだときのような体験を再度得ることができ、世界が拡張されていくのを感じている
- Haskellでコードを書く場合、その人の知識レベルに合わせて世界をどう解釈しているのか記述できる。
  - AIがコードを書く時代でも、解釈を楽しむのは人間の特権

---

## おわりに: 興味を持った人へ

- Haskellに興味を持ったら、**競技プログラミング**をHaskellでやるのをおすすめする
  - アルゴリズム分野に絞ってコミットすると、Haskellの良い/悪いが見えやすい
- 特に、育休を取る予定がある人・子供が小さい人におすすめ
  - 土曜日の夜に出かける機会が減るので、ちょうどいい(自分も子供が生まれた20275年10月からちょこちょこやっている)

---
layout: end
qr: /資料QR.png
qrCaption: 発表資料
qr2: /qiitaQR.png
qr2Caption: Qiita
---

# ありがとうございました

---
layout: section
index: "Appendix"
---

# おまけ

デモ②の`ys`の作り方について

---

## なぜ`take 10 [0..]`ではなく`map (+1)`を挟むのか

<div class="grid grid-cols-[1.15fr_1fr] gap-6 items-start">
<div>

- デモ②で観察したかったのは「**要素がサンクのまま**の状態」
- しかし`take 10 [0..] :: [Int]`だと、要素位置に**サンクが積まれない**

```
ghci> let as = take 10 [0..] :: [Int]
ghci> length as
10
ghci> :sprint as
as = [0,1,2,3,4,5,6,7,8,9]  -- サンクがない!
```

- `[0..]`は`enumFrom`の糖衣構文で、`Int`ではプリミティブ演算(`eftInt`)まで落ちる
- そこで作られるコンズセルには、**評価済みの値**が直接入る
  - `length`しか呼んでいないのに中身まで見えてしまう

</div>
<div>

<Callout type="info" title="そこで一枚挟む">

- `map (+1)`を通すと、要素位置が「あとで`(+1)`を適用する」という**サンク**になる
- `length`は背骨だけを辿るので、そのサンクは潰れない
- → 狙いどおり`ys = [_,_,_,_,_,_,_,_,_,_]`が観察できる

</Callout>

```
ghci> let ys = (map (+1) . take 10) [0..] :: [Int]
ghci> length ys
10
ghci> :sprint ys
ys = [_,_,_,_,_,_,_,_,_,_]
```

<Callout type="warn">

`take 10`のほうは、`length`を有限で止めるために必要(`[0..]`のままだと停止しない)。

</Callout>

</div>
</div>
