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

<div class="tg-shootok">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2.6" y="6.8" width="18.8" height="12.6" rx="2.2" />
    <path d="M8.6 6.8 9.9 4.6h4.2l1.3 2.2" />
    <circle cx="12" cy="13.1" r="3.7" />
  </svg>
  <span>写真撮影</span>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="18" cy="5.2" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="18.8" r="2.6" />
    <path d="M8.3 10.7 15.7 6.5" />
    <path d="M15.7 17.5 8.3 13.3" />
  </svg>
  <span>SNS投稿</span>
  <strong>OK</strong>
</div>

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

## Haskellを流行らせたい!

<Callout type="warn" title="Blub Paradox (ポール・グレアム『Beating the Averages』)">

- 慣れ親しんだ言語(仮想言語Blub)より弱い言語は「あの機能がない」と分かる。
- Blubより強い言語を見ても、何がすごいのか分からない。
- それは、**Blubで考えている**から。
</Callout>

- 普通の言語をベースに考えるとHaskellの価値は伝わらない
- Haskellの良さがきちんと伝われば流行るはず?

<!--
- Haskellを流行らせたいのできた
- Haskellはなぜ流行らないのか? →ポール・グレアムのエッセイ
- 慣れている言語よりも弱い言語が弱いことはわかる。だが、慣れている言語よりも強い言語の凄さはわからない
- この発表を通して少しでもHaskellについて知ってもらえればうれしいです。
-->

---
class: tg-middle
---

## 目次

1. Haskellの自己紹介
2. Haskellと関数型プログラミング
3. 遅延評価の紹介
4. フィボナッチ数列: 関数型と遅延評価を合わせて使う

**#netadashi** **#Haskellはいいぞ**(ツイートしてね🐦)

<span class="tg-muted">発表内容は個人の見解であり、所属する組織の公式見解ではありません。</span>

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

<Callout title="強力なパワー">
<strong>遅延評価(lazy evaluation)</strong>: 値が必要になる瞬間まで評価を先送りできる。<br>
その結果、<strong>無限リスト</strong>を宣言できるなど、プログラムの表現力が拡張された。
</Callout>

- 誓約① 純粋関数
- 誓約② 束縛(不変性)
- 誓約③ 強い型


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

**純粋でない**ものの例(他言語の例として):

- IO処理(ファイル、ネットワーク、画面出力)
- 例外を投げる
- ランダムな値を使う
- グローバル変数やインスタンス変数の変更

<!--
- 純粋関数の特徴としてよく挙げられるのは参照透過性と副作用がないこと
- 参照透過性は同じ入力に対して常に同じ結果を返す
- 副作用がない
- 純粋でないものの例は以下でさっと

---

MEMO 置換可能性: 式をその値に置き換えてもプログラムの意味が変わらないという定義も流通しているぽい
-->

---

## 誓約② 束縛(不変性)

- Javaだと`final`をつけて変数を不変にできる。
- Haskellでは変数への代入ではなく、値と名前を結びつける**束縛**(binding)
- 再代入はコンパイルエラーになり、更新する場合新しい箱が必要

```haskell
x = 1
x = 2  -- error: Multiple declarations of 'x'
```

```haskell
x = 1
x' = x + 1
```

(パフォーマンス上の理由で更新が必要な場合には範囲を絞って制約を緩め、安全に更新できる仕組みもあるが割愛)

<!--
- Javaだとfinalをつけて変数を不変にできる。
- Haskellだと、変数という概念がないというのが近い。値と名前を結びつける束縛という言葉を使う。
- 再代入は不可で更新する場合には新しい箱を用意するイメージ
-->

---

## 誓約③ 強い型

- システムは現実世界に影響を及ぼすために副作用が必要
- 副作用そのものを**型付きの値**にすることで、関数を純粋に保ったまま副作用を扱える

```haskell
readFile :: FilePath -> IO String
find :: Foldable t => (a -> Bool) -> t a -> Maybe a
```

<Callout>
型は<strong>関数の性質を表明するドキュメント</strong>にもなる。
</Callout>

- `IO`が型に現れる → **シグネチャを見るだけ**で副作用の有無が分かる
- `Maybe`/`Either` → 例外を投げずに「失敗」を**値として**返す

<!--
- システムは現実世界に影響を及ぼさないと役に立たない。そのためには副作用が必要
- 副作用に型をつけて値にすることで関数を純粋にすることができる。
- 型みるだけでその関数の概要がわかる
- 副作用がある
- 失敗するかも
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

Haskellは純粋関数型: 純粋関数の組み合わせでプログラムを記述する。

<!--
- 数学的な意味での関数=純粋関数を使うプログラミングスタイルを関数型という
- Haskellは純粋関数型

MEMO
---

Haskellは、乱立していた非正格・純粋関数型言語を統一する共通言語として設計が始まった。
遅延評価を選んだ結果、副作用を持てなくなり、純粋関数型言語の代表として知られるようになった。
-->

---
class: tg-middle
---

## 関数型の雰囲気を感じてみよう!

リストの合計を求める関数の実装をPythonとHaskellで比較してみる。

<!--
関数型の雰囲気を感じるためにリストの合計を求めるsum関数の実装を眺めてみる
-->

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

<!--
- 馴染みのある書き方をするとこんな感じになる
- totalという状態をもつ変数を容易してforループを回し、一つずつ要素を足してtotalを更新する
-->

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

- 再帰1回ごとにリストの要素が一つずつ消費され、空になると再帰が止まる。
- 宣言的なコードに

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
- Haskellのリストには空と先頭と残りの2種類のパターンしか存在しない。
- このように引数の構造で関数の定義を場合分けすることをパターンマッチという。
- 再帰は自分自身を呼び出す関数のこと
- 再帰することにリストが一つずつ消費される構造になっている
-->

---

#### 再帰の進み方イメージ: `mySum [1,2,3]`

<pre class="slidev-code tg-annotated"><code>mySum [1,2,3]
→ 1 + <span class="tg-rec">mySum [2,3]</span>  -- (x : xs) にマッチ。x = 1, xs = [2,3]
→ 1 + (2 + <span class="tg-rec">mySum [3]</span>)  -- x = 2, xs = [3]
→ 1 + (2 + (3 + <span class="tg-rec">mySum []</span>)) -- x = 3, xs = []
→ 1 + (2 + (3 + <span class="tg-pat">0</span>))  -- [] にマッチ。ここで再帰が止まる
→ 1 + (2 + 3)
→ 1 + 5
→ 6
</code></pre>

<!--
再帰の進み方のイメージ

- mySum [1,2,3]を実行すると先頭要素1が取り出され、残りのリスト[2,3]で再帰する
- これを繰り返すとmySum []となり、これが0になるので再帰が止まる。
- 後は足すだけ
-->

---

### 畳み込みで抽象度の高いコードに

- 再帰とパターンマッチを使った実装は**畳み込み**を使って抽象化できる

```haskell
mySum :: [Int] -> Int
mySum xs = foldr (+) 0 xs
```

- 畳み込みとは、リストの`:`を**演算子**に、`[]`を**初期値**に置き換える操作。
  - (実用上は`foldr`と`foldl'`の使い分けが要る。巻末参照)
  - `[1,2,3]`は`1 : 2 : 3 : []`の糖衣構文
- `:`を`+`に、`[]`を`0`にしたものがリストの合計
  - e.g. `1 : 2 : 3 : []`を初期値0、`+`で畳み込むと`1 + 2 + 3 + 0`になる

<!--
- 先程の再帰の例は畳み込みという操作によって抽象化できる。
- Haskellのリストは1:2:3:[]のような構造になっており:を演算子に[]を初期値に置き換えるのが畳み込み
- 後はスライド読む
-->

---

#### 畳み込みは演算子と初期値を変えるだけでいろいろできる

```haskell
mySum     xs = foldr (+) 0 xs      -- 合計
myProduct xs = foldr (*) 1 xs      -- 総積
insertSort xs = foldr insert [] xs -- 挿入ソート
  where
    insert x [] = [x]
    insert x (y : ys)
      | x <= y = x : y : ys
      | otherwise = y : insert x ys
```

<!--
- 抽象化すると何がうれしい?
-畳み込みという同じ構造を使っていろいろな処理をかける
- 認知負荷が減って個人的にうれしい
-->

---

## 関数型は、操作が何であるかを記述する

リストの合計を求めるとは?

- 再代入とループ: 箱を用意し、ループして、足し合わせる -> 計算の手順
- パターンマッチと再帰: 空リストの合計は0、`x : xs`の合計は`x + mySum xs` -> 合計の定義
- 畳み込み: 初期値`0`、`+`で畳み込む → 合計の定義

### 宣言的かつ、抽象度の高いコードが書けるのが関数型の良いところ

<!--
関数型についてまとめる。

- リストの合計は手続き型では計算の手順
- 関数型ではリストの合計とはなにかを記述する
- パターンマッチと再帰ではリストの合計について空なら0それ以外なら先頭を取り出して足して再帰する。
- 畳み込みに付いてはこれ畳み込みねと書いているだけ。
- 宣言的かつ、抽象度の高いコードが書けるのがうれしい
-->

---
layout: section
index: "03"
---

# 遅延評価の紹介

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

<!--
- Haskellは遅延評価を採用した純粋関数型言語。
- 遅延評価でないプログラミング言語もあるなかで、遅延評価を使うとなにができるのかをさぐっていく。
-->

---

## 遅延評価: 必要になるまで評価しない

- 式はすぐに評価されず、**サンク**(thunk)という「評価の予約」が積まれる
- 値が**本当に必要になった瞬間**に、式が評価されて値になる
- だから「無限リスト」などの普通の言語では書けないコードが書ける

```haskell
xs = [1..] :: [Int]
```

- 逆に必要のない式は評価されず、サンクのまま
  - cond = False なら expensive は一度も評価されない
<pre class="slidev-code tg-annotated"><code>let x = <span class="tg-focus">expensive</span> in if cond then x + x else 0
</code></pre>

<!--
- 遅延評価を使うと式はすぐに評価されず、サンクという評価の予約を積む
- サンクは本当に必要になったタイミングで評価される
- そのため、どこかで止まる関数を適用することが前提にはなるが無限リストも使える
- 必要のない式が評価されないので理論上はリソースの無駄が少ない※
- expensiveをなんらかの重たい計算の末に得られる結果とした場合、expensiveが必要ない場合に評価されない
-->

---

### サンクの共有(グラフ簡約)

- 複数の式が同じサンクを共有することができ、同じ**評価**が二度行われない
- 一度評価されたサンクは**結果そのもので置き換わる**ので、2回目以降は値を読むだけ

<pre class="slidev-code tg-annotated"><code>let x = expensive in if cond then <span class="tg-focus">x + x</span> else 0
</code></pre>

- 前ページと同じコード。`cond = True`のとき`x`は2回現れるが、`expensive`の評価は1回だけ

(後ほど紹介するフィボナッチ数列の例で共有の真価が感じられる)

<!--
- 後ほど、フィボナッチ数列でサンクの共有をやるので頭出し程度に説明
- Haskellでは同じサンクを指す複数の式が使用でき、1度評価された結果は他の式でも使用できる。
- 前ページと同じコード。今度はcondがTrueの側に注目する。
- xが2回出てくるが、expensiveが走るのは1回だけ。
-->

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

<!--
- アンスコはサンクを表す。
- sprintで状態が見れる
- 無限リストを定義しただけではサンクのまま
-->

---

### デモ① `head`で先頭だけ要求すると先頭だけ評価される

<pre class="slidev-code tg-annotated"><code>ghci> head xs
1
ghci> :sprint xs
<span class="tg-focus">xs = 1 : _</span>
</code></pre>

- 先頭の`1`**だけ**が評価された
- 残りは**サンクのまま**
- 必要な分しか評価しないことで無限リストを扱える

<!--
- 無限リストの先頭を取り出してみると、先頭だけ評価され、残りはサンク
-->

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
- 無限リストに対してリストの長さを求めると停止しないので、以降は有限の1から10のリストをつかう
- 1から10のリストの長さを求めると10個のサンクのリストができる
- これは、リストの長さを調べるのに中身は関係ないため
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

- `3`を探すために先頭から評価し、`1, 2, 3`まで見て見つかったので評価が止まる

<!--
- 同じリストから3を探してみる。
- 見つかるまで評価が進み、残りはサンクになる
-->

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

<!--
- 画面に表示するためにshowで文字列にすると全部評価される
-->

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

<!--
- 遅延評価を使ったおもしろコードをコラム的に紹介する。
- これはリストの最小値を求めるコードをおもしろ実装したもの
- 見た目的には全てソートされるように見えるが、headが必要とするのは先頭のみ。
- そのため、先頭が決まった段階で評価がとまり、残りの要素はソートされない
-->

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

<!--
計算量について詳しくない人向けに
O(n)と(O n logn)の違いのグラフを載せておく。
底を2にした場合要素数100で6.6倍
-->

---

## 遅延評価のまとめと補足

- 遅延評価を使うと必要になるまで評価が進まない
- これを使うとプログラミング言語の表現力が向上する
- 補足: 今回は時間の都合上、遅延評価が嬉しい例だけを紹介している
  - (むしろ、Haskellは実行速度が速い言語ではない)

<!--
遅延評価を使うとプログラミングの表現力があがる
-->

---
layout: section
index: "04"
---

# フィボナッチ数列

関数型と遅延評価を合わせて使ってみる

<!--
- 遅延評価は関数型の前提条件ではない。
- 遅延評価のHaskellだからできる関数型の実装例としてフィボナッチ数列を実装してみる
-->

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

同じ`fib`が何度も評価されてしまい、指数関数的に計算量が増える

<!--
- 高校数学でやったね。anは一つ前と2つ前の足し算で決まる
- 漸化式がそのまま再帰でかけそう?
- だが、このコードには同じfibが評価されてしまう問題。fib (n - 1)を求めるためにはfib(n - 2)を再度計算してしまう。
-->

---

### Python 3: パフォーマンス改善のためにメモ化

- メモ化: 計算した結果をキャッシュ

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

<!--
- メジャーな解決策として、メモ化という一度計算した結果をキャッシュしておく方法がある
- 計算するまえにキャッシュがあるか見に行って、なければ計算し、キャッシュに登録するイメージ
-->

---

### Haskell: 遅延評価の共有がメモ化代わりに

- Haskellの遅延評価では、同じサンクを指す複数の式で結果が共有されるので、二度評価されない
- 自分自身を1つずらして足し合わせる形で、**フィボナッチ数列本体**を定義可能
  - (評価が遅延されるので、自己参照構造が書ける)
  - (共有が効く条件は巻末参照)

```haskell
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

fibs !! 4 -- 3
```

<!--
- Haskellの遅延評価には同じサンクを指す複数の式で結果が共有される特徴があった
- これを使ってメモ化と同じようなことができる。
- さらに、さっきまでのはn番目のフィボナッチ数列を求める漸化式的なものだったが、Haskellだとフィボナッチ数列自体を定義できる。これはHaskellが無限を扱えるから数式がそのままコードになる
- ベリーエレガント
-->

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

<!--
イメージはこのような感じ
- fibsはフィボナッチ数列自体
- tail fibsは先頭要素を1つ捨てたfibs
これらを足し合わせることでフィボナッチ数列ができる。
-->

---

## まとめ

- Haskellの美しさを支えるのは関数型と遅延評価
  - 関数型を使うと宣言的で抽象度の高いコードが書ける
  - 遅延評価があることで無限リストなど表現力が拡張される
- 遅延評価と関数型を組み合わせるとより面白い表現ができるようになる

### **#Haskellはいいぞ**

<!--
スライドを読む
-->

---
layout: section
index: "05"
---

# Monadぽい話もちょっとだけ

<div class="tg-quote">
  <p class="tg-quote__body">まだだ! まだ終わらんよ!</p>
  <p class="tg-quote__cite">クワトロ・バジーナ『機動戦士Ζガンダム』(宇宙世紀0087年)</p>
</div>

<!--
せっかくモナドTシャツをきてきたので、モナドの話もしちゃいます。
難しいです。
-->

---

## Functor: 構造を保ったまま中身だけを写す

- Functor / Applicative / Monad という型クラスの階層のうち、Functorを紹介
- `Functor`は「文脈(箱)の**中身**に関数を適用する」ための型クラス。圏論でいう関手の概念をHaskellに取り込んだもの。

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b

fmap (+1) [1, 2, 3] -- [2,3,4]
fmap (+1) (Right 2) -- Right 3
fmap (+1) (Left "error")  -- Left "error"
```

<!--
- Functorとは、文脈の中身に関数を適用するための仕組み。
- 圏論でいう関手の概念をHaskellに取り込んだもの(数学の概念を入れられるのは純粋関数だから)
-->

---

## Functorを使うと安全に関数合成できる

<!-- - `fmap id == id`: 何もしない関数の写像は何もしない -->
<!-- - `fmap (g . h) == fmap g . fmap h`: それぞれ写像してから合成するのと、合成してから写像するのは同じ -->

- 関手則を満たすように`fmap`が実装されている

```haskell
-- 何もしない関数の写像はなにもしない
fmap id [1, 2, 3]  -- [1, 2, 3]

-- 関数合成してから写像と写像してから関数合成は同じ結果になる
fmap ((*2) . (+1)) [1, 2, 3] -- [4, 6, 8]
(fmap (*2) . fmap (+1)) [1, 2, 3] -- [4, 6, 8]
```

<Callout>
<code>fmap</code>は<strong>中身を写像するだけ</strong>で、文脈(失敗・長さ・順序等)を壊さない。
</Callout>

<!--
- なぜこんなことができるかというと、圏論の関手則にしたがうようにfmapが実装されているから。
- つまり、箱から中身を取り出さずに、中身を入れ替えられる。マジシャンみたい
-->

---

## チェック例外と非チェック例外(Javaの例)

<div class="tg-dense">

| | 型に例外 | 課題 |
| --- | --- | --- |
| **チェック例外** | 現れる(`throws`) | 層をまたぐたびに`try-catch`/`throws`を強制 |
| **非チェック例外** | 現れない | 失敗の存在も、失敗の中身も型から分からない |

</div>

- APIとして必要な例外情報は型で表現したい
- 例外情報を上層に伝えるためだけの`try-catch`や値チェックを書きたくない!

<!--
- Functorが役に立つ例を紹介します。
- Javaだとチェック例外と非チェック例外がある
- チェック例外を使うと型に例外がでるのはうれしい。
- チェック例外を使うとAPIのユーザにtry-catchを強制させてしまう。
- 例外情報を上層に伝えるためだけのtry-catchは書きたくない
-->

---

### Functorで、失敗情報を安全に上層まで持ち上げ可能

<pre class="slidev-code tg-annotated"><code>data Either e a = Left e | Right a  <span class="tg-muted">-- 失敗 or 成功</span>
data UserError = NotFound UserId | DbDown String
<span class="tg-muted">-- リポジトリ層: DBアクセスの結果は失敗情報 or 成功した結果</span>
<span class="tg-either">findUser :: UserId -> Either UserError User</span>
<span class="tg-fn">name     :: User -> String</span>
<span class="tg-fn">greet    :: String -> String</span>

<span class="tg-muted">-- ドメイン層 -> アプリケーション層: 失敗したかを気にせずにすむ</span>
greeting :: UserId -> Either UserError String
<span class="tg-either">greeting uid = fmap greet (fmap name (findUser uid))</span>
</code></pre>

<!--
- Haskellはこの問題をFunctorを使って解決している
- やりたいことはUserIdをもとにユーザ名を取得して挨拶文を返すこと。
- findUserを使ってDBからUser情報を取得するが、失敗する可能性がある。
- 戻り値の型はEither UserError Userになっていて、これは失敗情報 or User情報のどっちかが入る型という意味
- nameとgreetはUser情報を使う関数
- 普通の言語なら取り出した時点でうまくUser情報をとれたかをチェックする処理が必要
- この際に失敗しているかもしれないことを気にせずに関数合成して処理が書ける
-->

---

### アプリケーション層で、初めて失敗を取り出す

```haskell
-- コントローラー: 成功失敗に応じた結果をユーザに返す
handle :: UserId -> Response
handle uid = case greeting uid of
  Right msg            -> ok 200 msg
  Left (NotFound _)    -> err 404 "user not found"
  Left (DbDown detail) -> err 500 detail
```

<!--
アプリケーション層で結果をユーザに返す際に、成功 or 失敗条件で分岐して結果を返せる。
-->

---

## 例外情報を伝える`try-catch`や分岐が不要に

- `fmap`は`Right`(成功)のときだけ中身に関数適用し、`Left`(失敗)は素通りする
- 関手則により、`fmap`を重ねるだけで失敗情報を持つ可能性があるという文脈を壊さずにアプリケーション層まで届けられる。


### 失敗時の処理がまとまるので、失敗時のテストケースが減る!

(途中で失敗情報を足したい時や複数の文脈を扱うための、より上位の機能や概念もあるが割愛)

<!--
なぜ、こんなことができるのかというと、fmapがRightの時だけ関数適用して、失敗情報の場合にはスルーする形で関数合成している

- 型に例外情報を載せつつ、チェック例外のデメリットであった無駄なtry-catchを書く必要がない!

バンザイ!
-->

---
layout: end
qr: /資料QR.png
qrCaption: 発表資料(再掲)
qr2: /qiitaQR.png
qr2Caption: Haskellの記事たくさん書いてます
---

# ご清聴ありがとうございました

## [you can outsource your thinking but you cannot outsource your understanding](https://x.com/yacineMTB/status/2018886083120153046)

<!--
22分かかった
-->

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

# 補足

デモ②の`ys`の作り方 / `fibs`の共有条件 / `foldr`と`foldl'`

---

## デモ②の`ys`の作り方: `[0..9]`だとサンクが観察できない

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

---

## `fibs`の共有は「トップレベル・単相」だから効く

```haskell
fibs :: [Integer]  -- 単相な束縛なので、サンクが共有されメモ化として効く
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

fibsPoly :: Num a => [a]  -- 多相にすると共有されない
fibsPoly = 0 : 1 : zipWith (+) fibsPoly (tail fibsPoly)
```

- 多相な定義は内部的に「型クラス辞書を受け取る**関数**」になるため、参照のたびに作り直される
- 同様に、引数を取る関数の中で`fibs`を定義すると呼び出しごとに作り直される
- メモ化として効かせたいなら、**トップレベルの単相な束縛**にすること

<div class="tg-dense">

| `!! 32`の実行時間 | GHC 9.12.2 / `runghc` |
| --- | --- |
| `fibs`(単相) | 0.23s |
| `fibsPoly`(多相) | 9.14s |

</div>

---

## `foldr (+) 0`は大きなリストで落ちる

```haskell
mySum xs = foldr  (+) 0 xs -- 発表で使った説明用の定義
mySum xs = foldl' (+) 0 xs -- 実用ではこちら(Data.List)
```

- `foldr (+) 0`は`1 + (2 + (3 + ...))`というサンクの連鎖を先に作るため、要素数が多いとスタックオーバーフローする
- 合計のような**最後まで走査する正格な演算**は`foldl'`で左から潰していくのが定石
  - 逆に、無限リストや途中で打ち切れる処理では`foldr`が有利
- 詳細: [Haskellのfoldl、foldl'、foldrを比較してみた(sigma)](https://qiita.com/sigma_devsecops/items/206874ce5130abe280da)
