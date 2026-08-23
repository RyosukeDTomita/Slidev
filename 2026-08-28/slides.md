---
theme: ./theme
title: Haskellの美しさの秘密
info: "Haskellの美しさの秘密 - Netadashi Meetup #17"
author: sigma (Ryosuke Tomita)
layout: cover
favicon: /favicon.png
icon: /icon.png
speaker: sigma (Ryosuke Tomita)
meta: "Netadashi Meetup #17 / 2026-08-28"
link: https://peatix.com/event/5095532
qr: /資料QR.png
qrCaption: 発表資料
transition: fade-out
mdc: true
---

# Haskellの美しさの秘密にせまる

<!--
- Haskellの美しさの秘密にせまるというタイトルで発表
- よろしく
-->

---
layout: statement
---

# 資料はこちら

<QrCode src="/資料QR.png" size="265px" />

## ソースコードもあるのでスキャン推奨!

<!--
今回の資料には多数ソースコードが含まれているため、スキャンしておくことを推奨させてください。
-->

---
layout: statement
---

## 今日話したいこと

- Haskellは美しいコードが書けておもしろい
- 美しさの秘密
  - 関数型プログラミング
  - 遅延評価

**#netadashi** **#Haskellはいいぞ**(ツイートしてね🐦)

<!--
- Haskellの魅力は美しいコードがかけることにある
- 美しいコードが書ける理由として関数型プログラミングと遅延評価の2つを紹介する
- ツイートも待ってます(写真撮影やSNSへの投稿もOK)
-->

---
layout: section
index: "01"
---

# Haskellの自己紹介

遅延評価を前提とした関数型言語

<img src="/haskell-logo-purple.png" class="mt-6 w-40 object-contain" alt="Haskellのロゴ (Thompson-Wheeler logo)" />

---

## Haskellとは、「制約と誓約」で力を得た言語

HUNTER×HUNTERの念能力: 自らに**強い制約**を課すことで、**強力なパワー**を得る

<div class="tg-dense">

| 自らに課した制約 | 内容 |
| --- | --- |
| **純粋関数** | 参照透過性を持ち、副作用を持たない |
| **束縛(不変性)** | 変数は書き換えない。値と名前を結びつけるだけ |
| **強い型** | 副作用や失敗にも型がつく |

</div>

<Callout title="得たパワー">
<strong>遅延評価(lazy evaluation)</strong>: 値が必要になる瞬間まで計算をサボれる。<br>
その結果、<strong>無限リスト</strong>を宣言できるなど、プログラムの表現力が拡張された。
</Callout>

<!--
- Haskellのメンタルモデルを理解するのに、ハンターハンターの制約と誓約の概念をメタファーにするとわかりやすいと思っている。
- 自らに強い誓約を課すことで強力なパワーを得る
- Haskellの場合は純粋関数、束縛、強い型という3つの制約によって遅延評価というパワーを獲得している。
- 遅延評価によって無限リストを宣言できるなどのプログラムの表現力が向上している。
-->

---

## 誓約① 純粋関数

- **参照透過性**: 同じ入力に対して常に同じ結果を返す
- **副作用を持たない**

**純粋でない**ものの例:

- IO処理(ファイル、ネットワーク、画面出力)
- 例外を投げる
- ランダムな値を使う
- グローバル変数やインスタンス変数の変更

<!--
- 純粋関数の特徴としてよく挙げられるのは参照透過性と副作用がないこと
- 参照透過性は同じ入力に対して常に同じ結果を返す
- 副作用がない




 置換可能性: 式をその値に置き換えてもプログラムの意味が変わらないという定義も流通しているぽい
-->

---

## 誓約② 束縛(不変性)

- Javaだと`final`をつけて変数を不変にできる。
- Haskellでは変数への代入ではなく、値と名前を結びつける**束縛**(binding)
- (再代入はコンパイルエラーになる)

```haskell
x = 1
x = 2  -- error: Multiple declarations of 'x'
```

(パフォーマンス上の理由で更新が必要な場合には範囲を絞って制約を緩め、安全に更新できる仕組みもあるが割愛)

<!--
- Javaだとfinalをつけて変数を不変にできる。
- Haskellだと、変数という概念がないというのが近い。値と名前を結びつける束縛
-->

---

## 誓約③ 強い型

- システムは現実世界に影響を及ぼすために副作用が必要
- Haskellは副作用を型のついた値として扱う

```haskell
readFile :: FilePath -> IO String
find :: Foldable t => (a -> Bool) -> t a -> Maybe a
```

- `IO`が型に現れる → **シグネチャを見るだけ**で副作用の有無が分かる
- `Maybe`/`Either` → 例外を投げずに「失敗」を**値として**返す

<Callout>
型は<strong>関数の性質を表明するドキュメント</strong>にもなる。
</Callout>

<!--

-->

---
layout: section
index: "02"
---

# Haskellと関数型プログラミング

---

## 関数型プログラミングとは?

以下は[Wikipedia](https://ja.wikipedia.org/wiki/%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)より引用

> 関数型プログラミングとは、数学的な意味での関数を主に使うプログラミングのスタイルである

> 関数型プログラミング言語とは、関数型プログラミングを推奨しているプログラミング言語である。略して関数型言語ともいう

> 全ての関数が参照透過性を持つようなものを、特に純粋関数型プログラミング言語という

Haskellは純粋関数型

<!--
Haskellは、乱立していた非正格・純粋関数型言語を統一する共通言語として設計が始まった。
遅延評価を選んだ結果、副作用を持てなくなり、純粋関数型言語の代表として知られるようになった。
-->

---
class: tg-middle
---

## 関数型の雰囲気を感じてみよう!

リストの合計を求める関数の実装をPythonとHaskellで比較してみる。

---

### 再代入とループで書く(Python)

```python
# 関数型でない例: 箱を用意して、ループで書き換えていく
def my_sum(xs):
    total = 0       # 状態を持つ変数
    for x in xs:    # ループ
        total += x  # 再代入で状態を更新
    return total
```

`total`の**書き換え**と**ループ**が、Haskellでは**パターンマッチ**と**再帰**に置き換わる。

---

### パターンマッチと再帰で書く(Haskell)

<div class="grid grid-cols-[1.3fr_1fr] gap-6 items-start">
<div>

リストは`[]`(空) or `(x : xs)`(先頭と残り)の2つの形がある<br>

<pre class="slidev-code tg-annotated"><code>mySum :: [Int] -> Int
mySum <span class="tg-pat">[]</span><sup class="tg-pat-n">①</sup> = 0 -- 再帰の停止条件
mySum <span class="tg-pat">(x : xs)</span><sup class="tg-pat-n">①</sup> = x + <span class="tg-rec">mySum xs</span><sup class="tg-rec-n">②</sup>
</code></pre>

<br>

- 再帰1回ごとにリストが1つずつ小さくなり空になると再帰が止まる。
- 宣言的なコードになった。

</div>
<div>

<Callout title="① パターンマッチ">
引数の<strong>構造</strong>で場合分けし、上から順に試して最初にマッチした行が使われる。
</Callout>

<Callout type="info" title="② 再帰">
自分自身を呼び出す関数。
</Callout>

</div>
</div>


<!--
リストの長さを直接調べて空判定をしない
-->

---

### 再帰はどう進むのか: `mySum [1,2,3]`

<pre class="slidev-code tg-annotated"><code>mySum [1,2,3]
= 1 + <span class="tg-rec">mySum [2,3]</span>  -- (x : xs) にマッチ。x = 1, xs = [2,3]
= 1 + (2 + <span class="tg-rec">mySum [3]</span>)  -- x = 2, xs = [3]
= 1 + (2 + (3 + <span class="tg-rec">mySum []</span>)) -- x = 3, xs = []
= 1 + (2 + (3 + <span class="tg-pat">0</span>))  -- [] にマッチ。ここで再帰が止まる
= 1 + (2 + 3)
= 1 + 5
= 6
</code></pre>

---

## 畳み込みを使うとより抽象度の高いコードに

- 再帰とパターンマッチを使った実装は**畳み込み**を使って抽象化できる

```haskell
mySum :: [Int] -> Int
mySum xs = foldr (+) 0 xs
```

- `[1,2,3]`は`1 : 2 : 3 : []`の糖衣構文
- 畳み込みとは、リストの`:`を**演算子**に、`[]`を**初期値**に置き換える操作。
- `:`を`+`に、`[]`を`0`にしたものがリストの合計

<!-- ``` -->
<!-- foldr (+) 0 [1,2,3] -->
<!-- = 1 + foldr (+) 0 [2,3] -->
<!-- = 1 + (2 + foldr (+) 0 [3]) -->
<!-- = 1 + (2 + (3 + foldr (+) 0 [])) -->
<!-- = 1 + (2 + (3 + 0)) -->
<!-- ``` -->

---

### 畳み込みの汎用性

```haskell
mySum     xs  = foldr (+)  0  xs   -- 合計
myProduct xs  = foldr (*)  1  xs   -- 総積
myConcat  xss = foldr (++) [] xss  -- 連結
```

---

## 関数型では、それが何であるかを記述できる

リストの合計を求めるとは?

- 再代入とループ: 箱を用意し、ループして、足し合わせる → 計算の手順
- パターンマッチと再帰: 空リストの合計は0、`x : xs`の合計は`x + mySum xs` → 合計の定義
- 畳み込み: 初期値`0`に対して`+`でリストを畳み込むこと → 合計の定義

宣言的なコードが書ける。


---
layout: section
index: "03"
---

# 遅延評価とは?

---

## 遅延評価は関数型の前提条件ではない

<div class="tg-dense tg-langtable">

| 名前 | 型付け | 純粋性 | 評価戦略 |
| --- | --- | --- | --- |
| **Haskell** | 静的型付け | 純粋 | 遅延評価 |
| Clean | 静的型付け | 純粋 | 遅延評価 |
| Elm | 静的型付け | 純粋 | 正格評価 |
| Lean | 静的型付け | 純粋 | 正格評価 |
| OCaml | 静的型付け | 非純粋 | 正格評価 |
| Scala | 静的型付け | 非純粋 | 正格評価 |
| F# | 静的型付け | 非純粋 | 正格評価 |
| Lisp(Scheme / Common Lisp / Clojure) | 動的型付け | 非純粋 | 正格評価 |

</div>

---

## 遅延評価: 必要になるまで評価しない

- 式はすぐに計算されず、**サンク**(thunk)という「計算の予約」が積まれる
- 値が**本当に必要になった瞬間**に、式が評価されて値になる
- だから「無限リスト」などの普通の言語では書けないコードが書ける

```haskell
xs = [1..] :: [Int]
```

- 逆に必要がない値は評価されず、サンクのまま

```haskell
cond = False
let x = expensive in if cond then x + x else 0
```

---

### サンクの共有(グラフ簡約)

- 複数の式が同じサンクを共有することができ、同じ**計算**が二度行われない

```haskell
let xs = map f [1..100]
 in (sum xs, length xs)
```

(後ほど紹介するフィボナッチ数列の例で共有の真価が感じられる)

---
class: tg-middle
---

## 対話型実行環境(GHCi)の`:sprint`で遅延評価を観察してみる

---

## デモ① 無限リストを宣言するとサンクが作られる

<pre class="slidev-code tg-annotated"><code>ghci> let xs = [1..] :: [Int]
ghci> :sprint xs -- 状態確認
<span class="tg-focus">xs = _</span>
</code></pre>

- `_`は**未評価**の印
- ヒープ上には「リストを作る予約」として**サンク**だけが置かれている

---

### デモ① `head`で先頭だけ要求すると先頭だけ評価される

<pre class="slidev-code tg-annotated"><code>ghci> head xs
1
ghci> :sprint xs
<span class="tg-focus">xs = 1 : _</span>
</code></pre>

- 先頭の`1`**だけ**が評価された
- 残りは**サンクのまま**
- 必要な分しか計算しないことで無限リストを扱える

---

## デモ② `length`は「構造」だけを評価する

`length`は無限リストに使うと停止しないので、有限のリストを用意する

<pre class="slidev-code tg-annotated"><code>-- 1から10のリスト(map (+1)の理由は巻末参照)
ghci> let ys = map (+1) $ [0..9] :: [Int]
ghci> length ys
10
ghci> :sprint ys
<span class="tg-focus">ys = [_,_,_,_,_,_,_,_,_,_]</span>
</code></pre>

長さを数えるのにリストの**構造**は必要だが、要素の中身は評価不要

<!--
[0..9]はenumFromToの糖衣構文。Int向けの実装(eftInt)がgo x = I# x : ...の形で構築済みの値を直接コンスセルに入れるので、この経路では要素がサンクにならない(Int自体はliftedなのでサンクにはなれる。unliftedなのはInt#のほう)。そこで要素位置にサンクを置く目的でmap (+1)を挟んでいる。
-->

---

## デモ③ `find`は見つかるまでしか評価しない

<pre class="slidev-code tg-annotated"><code>ghci> import Data.List (find)
ghci> let ys = map (+1) $ [0..9] :: [Int]
ghci> find (==3) ys
Just 3
ghci> :sprint ys
<span class="tg-focus">ys = 1 : 2 : 3 : _</span>
</code></pre>

- `3`を探すために先頭から評価し、`1, 2, 3`まで見て見つかったので止まる
- 残りは手つかずのサンク

---

## デモ④ 表示すれば、すべて評価される

<pre class="slidev-code tg-annotated"><code>ghci> let ys = map (+1) $ [0..9] :: [Int]
ghci> show ys
"[1,2,3,4,5,6,7,8,9,10]"
ghci> :sprint ys
<span class="tg-focus">ys = [1,2,3,4,5,6,7,8,9,10]</span>
</code></pre>

- `show`は全要素の値が必要 → 全サンクが評価される
- ここでようやく、素直なリストの形になった

---

## 遅延評価おもしろコード例

```haskell
import Data.List (sort)

minimum' :: Ord a => [a] -> a
minimum' xs = (head . sort) xs
```

- 見た目は「全部ソートして先頭を取る」= マージソートのため、$O(n \log n)$に見える
- しかし`head`は**先頭の1要素しか要求しない**
  - 遅延評価により、ソートは先頭を確定させる分までしか進まない
  - 計算量は、おおよそ$O(n)$に

---

### (参考)$O(n)$と$O(n \log n)$はどれくらい違うのか($\log_2 n$の場合)

<div class="grid grid-cols-1 gap-2">
<div>

<svg class="tg-chart" viewBox="0 0 720 348" role="img" aria-label="要素数nに対する演算回数の増え方。O(n)は直線的、O(n log n)はより急に増える">
  <g class="tg-chart__grid">
    <line x1="78" y1="300.0" x2="640" y2="300.0" />
    <line x1="78" y1="226.9" x2="640" y2="226.9" />
    <line x1="78" y1="153.7" x2="640" y2="153.7" />
    <line x1="78" y1="80.6" x2="640" y2="80.6" />
  </g>
  <g class="tg-chart__tick" text-anchor="end">
    <text x="68" y="304">0</text>
    <text x="68" y="231">200</text>
    <text x="68" y="158">400</text>
    <text x="68" y="85">600</text>
  </g>
  <g class="tg-chart__tick" text-anchor="middle">
    <text x="78" y="320">0</text>
    <text x="218.5" y="320">25</text>
    <text x="359" y="320">50</text>
    <text x="499.5" y="320">75</text>
    <text x="640" y="320">100</text>
  </g>

  <polyline class="tg-chart__line tg-chart__line--nlogn" points="78.0,300.0 89.2,299.3 100.5,297.1 111.7,294.3 123.0,291.2 134.2,287.9 145.4,284.3 156.7,280.5 167.9,276.6 179.2,272.5 190.4,268.4 201.6,264.1 212.9,259.8 224.1,255.3 235.4,250.8 246.6,246.2 257.8,241.5 269.1,236.7 280.3,231.9 291.6,227.1 302.8,222.1 314.0,217.2 325.3,212.1 336.5,207.1 347.8,202.0 359.0,196.8 370.2,191.6 381.5,186.3 392.7,181.1 404.0,175.7 415.2,170.4 426.4,165.0 437.7,159.6 448.9,154.1 460.2,148.6 471.4,143.1 482.6,137.5 493.9,132.0 505.1,126.3 516.4,120.7 527.6,115.0 538.8,109.3 550.1,103.6 561.3,97.9 572.6,92.1 583.8,86.3 595.0,80.5 606.3,74.7 617.5,68.8 628.8,62.9 640.0,57.0" />
  <polyline class="tg-chart__line tg-chart__line--n" points="78.0,300.0 89.2,299.3 100.5,298.5 111.7,297.8 123.0,297.1 134.2,296.3 145.4,295.6 156.7,294.9 167.9,294.1 179.2,293.4 190.4,292.7 201.6,292.0 212.9,291.2 224.1,290.5 235.4,289.8 246.6,289.0 257.8,288.3 269.1,287.6 280.3,286.8 291.6,286.1 302.8,285.4 314.0,284.6 325.3,283.9 336.5,283.2 347.8,282.4 359.0,281.7 370.2,281.0 381.5,280.3 392.7,279.5 404.0,278.8 415.2,278.1 426.4,277.3 437.7,276.6 448.9,275.9 460.2,275.1 471.4,274.4 482.6,273.7 493.9,272.9 505.1,272.2 516.4,271.5 527.6,270.7 538.8,270.0 550.1,269.3 561.3,268.5 572.6,267.8 583.8,267.1 595.0,266.4 606.3,265.6 617.5,264.9 628.8,264.2 640.0,263.4" />

  <g>
    <line class="tg-chart__gap" x1="640" y1="57" x2="640" y2="263.4" />
    <text class="tg-chart__label" x="632" y="165" text-anchor="end">約6.6倍</text>
  </g>

  <g class="tg-chart__legend">
    <line x1="92" y1="64" x2="124" y2="64" class="tg-chart__line--nlogn" />
    <text x="132" y="71">n log n</text>
    <line x1="92" y1="104" x2="124" y2="104" class="tg-chart__line--n" />
    <text x="132" y="111">n</text>
  </g>

  <text class="tg-chart__axis" x="78" y="26">演算回数(相対)</text>
  <text class="tg-chart__axis" x="640" y="344" text-anchor="end">n(要素数)</text>
</svg>

</div>
<div>

- `n = 100`で**約6.6倍**、`n = 10000`なら**約13倍**
- `head . sort`は、遅延評価のおかげで<span class="tg-cyan">下側の線</span>で済んでいる
- ⚠ (Haskellの公式ライブラリはこんなネタ実装をしていない)

</div>
</div>

<style scoped>
.tg-chart {
  width: 100%;
  height: auto;
  font-family: var(--slidev-font-sans, sans-serif);
}

.tg-chart__grid line {
  stroke: var(--tg-line);
  stroke-width: 1;
}

.tg-chart__tick,
.tg-chart__axis {
  fill: var(--tg-muted);
  /* viewBox 720 が 884px で描画される(1.228倍)ので、20単位で約24.6px */
  font-size: 20px;
}

.tg-chart__line {
  fill: none;
  stroke-width: 2.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}

/* 系列色は dataviz の検証スクリプトで暗色面に対して通したもの */
.tg-chart__line--n { stroke: #2aa198; }
.tg-chart__line--nlogn { stroke: #e0662b; }

.tg-chart__gap {
  stroke: var(--tg-muted);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.tg-chart__label {
  fill: var(--tg-bright);
  font-size: 20px;
  font-weight: 700;
}

.tg-chart__legend line {
  stroke-width: 2.5;
}

.tg-chart__legend text {
  fill: var(--tg-text);
  font-size: 20px;
}
</style>

---

## 遅延評価のまとめと補足

- 遅延評価を使うと面白いコードが書ける
- 補足: 理論的には理にかなっているが、CとかRustのほうが実行速度は速い
  - (Haskellはパフォーマンスが良いタイプの言語ではない)
  - 今回は時間の都合上、遅延評価が嬉しい例だけを紹介している

---
layout: section
index: "04"
---

# フィボナッチ数列

関数型と遅延評価を合わせて使ってみる

---

## フィボナッチ数列

$$
a_n = a_{n-1} + a_{n-2} \quad (a_0 = 0,\ a_1 = 1)
$$

漸化式をそのまま再帰で実装すればよい?

```haskell
-- n番目のフィボナッチ数を返す(パフォーマンスが悪い)
fib :: Int -> Int
fib n
  | n == 0 = 0
  | n == 1 = 1
  | otherwise = fib (n - 1) + fib (n - 2)
```

同じ`fib`が何度も計算されてしまい、指数関数的に計算量が増える

---

### Python 3: パフォーマンス改善のためにメモ化

- メモ化: 計算した結果をキャッシュ(非純粋関数になってしまう)

```python
memo = {}
def fib(n):
    if n in memo: # キャッシュを引く
        return memo[n]
    if n < 2:
        return n
    result = fib(n - 1) + fib(n - 2)
    memo[n] = result # キャッシュに入れる
    return result
```

---

### Haskell: 遅延評価の共有がメモ化代わりに

- Haskellの遅延評価では、同じサンクを指す値は共有されるので、同じ計算をしない
- 自分自身を1つずらして足し合わせる形で、**フィボナッチ数列本体**を定義可能
  - (評価が遅延されるので、自己参照構造が書ける)

```haskell
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

fibs !! 4 -- 3
```

---

$$
\begin{array}{r|ccccc}
\texttt{fibs}                          & a_0       & a_1       & a_2       & a_3       & \cdots \\
\texttt{tail\ fibs}                    & a_1       & a_2       & a_3       & a_4       & \cdots \\
\hline
\texttt{zipWith\ (+)\ fibs\ (tail\ fibs)} & a_0{+}a_1 & a_1{+}a_2 & a_2{+}a_3 & a_3{+}a_4 & \cdots \\
                                       & \shortparallel & \shortparallel & \shortparallel & \shortparallel & \\
                                       & a_2       & a_3       & a_4       & a_5       & \cdots
\end{array}
$$

### 遅延評価×関数型ではより宣言的なコードが書けるのが嬉しい

---

## まとめ

- Haskellの美しさを支えるのは遅延評価と関数型
  - 遅延評価があることでおもしろいコードが書ける
  - 関数型は、関数の組み合わせで処理を記述する一つのパラダイム
- 遅延評価と関数型の組み合わせると宣言的/抽象度の高いコードがかける

### **#Haskellはいいぞ**

---

## おわりに: 自分がHaskellをやる理由

<Callout type="warn" title="Blub Paradox (ポール・グレアム『Beating the Averages』)">

- 慣れ親しんだ言語(仮想言語Blub)より弱い言語は「あの機能がない」と分かる。
- しかしBlubより強い言語を見ても、何がすごいのか分からない。
- それは、**Blubで考えている**から。
</Callout>

- 結局手を動かした人にしか見えない世界がある。
- AIでコードを書ける時代だが、**理解を楽しめるのはプログラマーの特権**
  - Haskellに11ヶ月コミットしているが、AIと対話しながらでもすぐに理解するのは難しい
- 見えなかった世界が見えるようになるのは楽しい!

---
layout: end
qr: /資料QR.png
qrCaption: 発表資料(再掲)
qr2: /qiitaQR.png
qr2Caption: Haskellの記事たくさん書いてます
---

# ご清聴ありがとうございました

## [you can outsource your thinking but you cannot outsource your understanding](https://x.com/yacineMTB/status/2018886083120153046)

---

## Reference① 文献・書籍

敬称略

- [Lazy evaluation - HaskellWiki](https://wiki.haskell.org/Lazy_evaluation)
- [3. Pure Functions, Laziness, I/O, and Monads - School of Haskell(Bartosz Milewski、2014)](https://www.schoolofhaskell.com/school/starting-with-haskell/basics-of-haskell/3-pure-functions-laziness-io)
- [関数型プログラミング - Wikipedia](https://ja.wikipedia.org/wiki/%E9%96%A2%E6%95%B0%E5%9E%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)
- [A History of Haskell: Being Lazy With Class(Paul Hudak / John Hughes / Simon Peyton Jones / Philip Wadler、HOPL III, 2007)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/history.pdf)
- [Why Functional Programming Matters(John Hughes、1990)](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf)
- [Beating the Averages(Paul Graham)](https://www.paulgraham.com/avg.html)
- [単体テストの考え方/使い方(Vladimir Khorikov、須田智之 訳、マイナビ出版)](https://book.mynavi.jp/ec/products/detail/id=134252)
- [関数型ドメインモデリング(Scott Wlaschin、猪股健太郎 訳、アスキードワンゴ)](https://www.kadokawa.co.jp/product/302405003608/)

---

## Reference② 発表・記事・ポスト

敬称略

- [なぜ業界で使われないHaskellが、業界に決定的な影響を与えているのか(YouTube)](https://www.youtube.com/watch?v=o0sOxJ0-tXY)
- [長く活躍できるエンジニアになるためには? 技術者として大切にしたいこと(伊藤直也)](https://speakerdeck.com/naoya/20230227-engineer-type-talk)
- [アルゴリズムは何を圧縮しているのか ─ Haskell から育った「圧縮代数」というメンタルモデル(伊藤直也)](https://speakerdeck.com/naoya/compressed-algebra-with-haskell)
- [【高校数学でわかる】Haskellで実装するフィボナッチ数列(sigma)](https://qiita.com/sigma_devsecops/items/24e05b6248b717aa4067)
- [関数型プログラミングを知らない人向けに、「Haskellって何が面白いの?」と聞かれた時の回答(sigma)](https://qiita.com/sigma_devsecops/items/3f2a397e944401fcc6cb)
- [lotz(@lotz84_)のポスト](https://x.com/lotz84_/status/2066094796024823833)

---
layout: section
index: "Appendix"
---

# デモ②の`ys`の作り方について

---

## 問題: `[0..9]`だとサンクが観察できない

- デモ②で観察したかったのは「**要素がサンクのまま**の状態」
- しかし`[0..9] :: [Int]`だと、要素位置に**サンクが積まれない**

```text
ghci> let as = [0..9] :: [Int]
ghci> length as
10
ghci> :sprint as
as = [0,1,2,3,4,5,6,7,8,9]  -- サンクがない!
```

- `[0..9]`は`enumFromTo`の糖衣構文で、`Int`ではプリミティブ演算(`eftInt`)まで落ちる
- そこで作られるコンスセルには、**評価済みの値**が直接入る
  - `length`しか呼んでいないのに中身まで見えてしまう

---

## 解決: `map (+1)`を一枚挟む

```text
ghci> let ys = map (+1) $ [0..9] :: [Int]
ghci> length ys
10
ghci> :sprint ys
ys = [_,_,_,_,_,_,_,_,_,_]
```

- `map (+1)`を通すと、要素位置が「あとで`(+1)`を適用する」という**サンク**になる
- `length`は構造だけをたどるので、そのサンクは潰れない
- → 狙いどおり`ys = [_,_,_,_,_,_,_,_,_,_]`が観察できる

<Callout type="warn">

`[0..]`ではなく`[0..9]`と有限にしているのは、`length`を止めるため(`[0..]`のままだと停止しない)。

</Callout>
