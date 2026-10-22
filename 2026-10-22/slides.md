---
theme: default
title: システム開発と「具体と抽象」
info: 細谷功『システム開発と「具体と抽象」』の紹介
author: sigma (Ryosuke Tomita)
favicon: /favicon.png
layout: none
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: slide-left
fonts:
  sans: Noto Sans JP
  weights: '400,500,700,900'
seoMeta:
  # X などで大きい画像付きカードにする。og:image はビルド時に og-image.png から入る。
  twitterCard: summary_large_image
mdc: true
---

<div class="gk slide title-slide">
<div class="kicker">本の紹介</div>
<h1>システム開発と<br><span>「具体と抽象」</span></h1>
<p class="sub">問題発見と問題解決を往復する思考のメタ化を身につける<br>細谷功 著 / 技術評論社 2026</p>
<a class="cover-author" href="https://github.com/RyosukeDTomita" target="_blank" rel="noopener"><PublicImg src="/icon.png" alt="sigma" /><span>sigma (Ryosuke Tomita)</span></a>
<div class="book-panel">
  <a href="https://www.amazon.co.jp/dp/B0H7FLMYNY" target="_blank" rel="noopener"><PublicImg class="book-cover" src="/book-cover.jpg" alt="システム開発と「具体と抽象」の表紙" /></a>
  <div class="book-link">
    <PublicImg class="book-qr" src="/book-qr.png" alt="Amazonの商品ページのQRコード" />
    <a href="https://www.amazon.co.jp/dp/B0H7FLMYNY" target="_blank" rel="noopener">amazon.co.jp/dp/<br>B0H7FLMYNY</a>
  </div>
</div>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【0:00〜0:30】自己紹介は短く。「SIerの働き方そのものを具体と抽象で斬る本です」と一言で入る。
-->

---
layout: none
---

<div class="gk slide about-deck">
<div class="kicker">この資料について</div>
<h2>この資料は社内勉強会向けに、自分の読書メモをもとにAIと壁打ちしながら作成しました。</h2>
<h3>内容は私が気にいったところをチェリーピックしており、解釈は原作者が想定するものと異なる可能性があります。<br>興味をもったら書籍を是非購入を検討されたし。</h3>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

---
layout: none
---

<div class="gk slide oneliner">
<div class="kicker">この本を一言で</div>
<p class="big">SI業界は<br><span class="con">具体</span>と<span class="abs">抽象</span>の<mark>往復</mark>が足りていない</p>
<p class="muted" style="margin-top:36px">今日持ち帰ってほしいこと:<br>① 人は具体を見ないと判断できない<br>② 川上と川下は「OS」が違う<br>③ AI時代に人間に残るのは抽象側</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【0:30〜1:15】結論を先に。3つの持ち帰りを予告して、以降はこの順で話す。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">前提: SIerの構造的なクセ</div>
<h2>言われた通りに作るほど、儲かる構造</h2>
<div class="grid2">
  <div class="card">
    <h3>準委任契約</h3>
    <ul class="dots">
      <li>かかった分だけ払ってもらえる</li>
      <li>無駄な作業でも<br>言われた通りにやれば売上になる</li>
      <li>→ <b>仕様を提案するインセンティブが薄い</b></li>
    </ul>
  </div>
  <div class="card">
    <h3>ボトムアップ積み上げ型</h3>
    <ul class="dots">
      <li>現場の意見を集約して方針を決める</li>
      <li>攻めより守り、顧客要望通りに作る</li>
      <li>→ <b>「そもそも論」を考える訓練ができない</b></li>
    </ul>
  </div>
</div>
<p class="small muted" style="margin-top:20px">※ 基幹システムではこれが強み。ただし川上(企画・構想)では弱みになる。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【1:15〜2:00】自虐で終わらせない。「基幹系では強み」をちゃんと言う。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">そもそも具体と抽象とは</div>
<h2 style="margin-bottom:20px">どちらが偉いわけではない</h2>
<div class="doll d1"><span>経営<small>売上を伸ばしたい</small></span>
  <div class="doll d2"><span>企画<small>予約をWeb化する</small></span>
    <div class="doll d3"><span>要件定義<small>予約画面を作る</small></span>
      <div class="doll d4"><span>実装<small>ボタンを置く</small></span></div>
    </div>
  </div>
</div>
<p class="small" style="margin:10px 0 18px">仕事の具体と抽象はマトリョーシカ。上から見れば<span class="con">具体</span>、下から見れば<span class="abs">抽象</span>で、<mark>誰の仕事にも両方ある</mark>。</p>
<div class="grid2 compact">
  <div class="card con-c">
    <h3 class="con">具体</h3>
    <ul class="dots">
      <li>実体がある</li>
      <li>わかりやすい・評価しやすい</li>
      <li>自由度が小さい</li>
    </ul>
  </div>
  <div class="card abs-c">
    <h3 class="abs">抽象</h3>
    <ul class="dots">
      <li>特徴を抽出したもの。実体がない</li>
      <li>わかりにくい・評価しにくい</li>
      <li>応用範囲が広い</li>
    </ul>
  </div>
</div>
<p style="margin-top:16px">仕事では「<span class="con">具体的にわかりやすく</span>」が正義になりがち。<br><span class="small muted">顧客のぼんやりした要望を具体に詰めるのはトラブル防止として正しい。でもそれだけだと…</span></p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【2:00〜2:45】まずマトリョーシカ図。経営の「売上を伸ばしたい」を企画が具体にし、その企画を要件定義がさらに具体にする。自分の仕事は、上の層から見れば具体、下の層から見れば抽象。具体の担当と抽象の担当がいるのではなく、誰の仕事にも両方ある、と話してから左右のカードに進む。具体=悪ではない。川下の仕事では具体化が正しい、と押さえておくと後半の川上/川下が伝わりやすい。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">人間の性質</div>
<h2>具体の重要性: 人は具体を見ないと判断できない</h2>
<blockquote>人間は「抽象的な問いには思考を停止し、<br>具体的な刺激には過剰に反応する」</blockquote>
<div class="card">
  <p>「何食べたい？」→「なんでもいい」</p>
  <p>「じゃあカレーは？」→「それはちょっと」</p>
  <p class="small muted" style="margin-top:8px">欲しいものは言えないが、<b>欲しくないもの</b>は見せられた具体から判断できる</p>
</div>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【2:45〜3:20】ここが一番伝えたいところ。「何食べたい？」は会場に振ってもいい。抽象は評価できない、具体が出てきて初めて批評できる。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">人間の性質</div>
<h2>抽象の重要性: 顧客の具体的な要望は、<br>顧客の本当にほしいものではない</h2>
<div class="card">
  <p style="font-size:26px">"A lot of times, people don't know what they want until you show it to them."</p>
  <p class="small muted">— Steve Jobs<br>顧客に欲しい携帯電話を聞いてもiPhoneは出てこない</p>
</div>
<p style="margin-top:28px">顧客が口にする要望は、いま見えている具体から出てきたもの。<br>そのまま作るのではなく、<mark>一度抽象に上げて本当の目的をつかむ</mark>。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【3:20〜4:00】前のスライドの裏返し。具体を見せないと判断できないが、顧客から出てくる具体をそのまま信じてもいけない。後半の「依頼を一度抽象に載せる」の伏線。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">ITの歴史 = 抽象化の歴史</div>
<h2>複雑なものを単純に扱えるようにしてきた</h2>
<div class="stairs">
  <div class="step" style="height:22%">OS<small>ハード依存から</small></div>
  <div class="step" style="height:30%">高級言語<small>低レイヤーから</small></div>
  <div class="step" style="height:38%">OOP<small>構造化・<br>モデル化</small></div>
  <div class="step" style="height:46%">仮想化<small>物理→論理</small></div>
  <div class="step" style="height:54%">コンテナ<small>OS→アプリ</small></div>
  <div class="step" style="height:62%">クラウド<small>インフラ不要</small></div>
  <div class="step" style="height:70%">Serverless<small>サーバ不要</small></div>
  <div class="step" style="height:78%">マネージドDB<small>運用不要</small></div>
  <div class="step" style="height:88%">ノーコード<small>コード不要</small></div>
  <div class="step" style="height:100%;background:var(--con)">AI<small>指示だけで実行</small></div>
</div>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【4:00〜4:40】エンジニアには一番馴染む例。技術そのものは抽象化を積み上げてきたのに、働き方は具体にとどまっている、という対比で次へ。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">5W1Hの中でWhyだけ次元が違う</div>
<h2>Whyには「過去向き」と「未来向き」がある</h2>
<div class="grid2">
  <div class="card con-c">
    <h3>原因のWhy</h3>
    <ul class="dots">
      <li>なぜ失敗した？ → <b>過去</b>に向かう</li>
      <li>トラブルありきなので考えやすい</li>
      <li>見えている問題 = <span class="con">川下</span></li>
    </ul>
  </div>
  <div class="card abs-c">
    <h3>目的のWhy</h3>
    <ul class="dots">
      <li>何のため？ → <b>未来</b>に向かう</li>
      <li>未来のユースケースを考える</li>
      <li>見えていない問題 = <span class="abs">川上</span></li>
    </ul>
  </div>
</div>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【4:40〜5:20】障害の「なぜなぜ分析」は得意だけど、目的のWhyは普段あまり問わない、という自分たちの話に寄せる。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">反応型と思考型</div>
<h2>依頼を一度「抽象」に載せる</h2>
<div class="lane">
  <div class="label con">反応型</div>
  <div class="flow"><div class="box box-con">「サーバ容量を増やして」</div><div class="arrow">→</div><div class="box">容量を増やす</div></div>
</div>
<div class="lane">
  <div class="label abs">思考型</div>
  <div class="flow"><div class="box box-con">「サーバ容量を増やして」</div><div class="arrow">↗</div><div class="box box-abs">本当の目的は？</div><div class="arrow">↘</div><div class="box">別の解決策 A / B / C</div></div>
</div>
<ul class="dots" style="margin-top:6px">
  <li>可視化の目的は可視化ではない → 意思決定を速く？ 異常がないと確認したい？</li>
  <li>レビューの目的は？ → リスク回避？ ならレビュー以外の手段もある</li>
</ul>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【5:20〜6:20】抽象化フィルターを通すと、当初の依頼に縛られない能動的な提案ができる。FDEも同じで、現場の具体的要望を抽象化してプロダクトに還元する(一対多への変換)。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">本書の中心: 川上と川下</div>
<h2>問題発見と問題解決では、仕事の性質が逆</h2>
<table>
  <thead><tr><th></th><th class="abs-h">川上(問題発見)</th><th class="con-h">川下(問題解決)</th></tr></thead>
  <tbody>
    <tr><th>扱う問題</th><td>潜在的な問題</td><td>顕在的な問題</td></tr>
    <tr><th>風呂敷</th><td>広げる(発散)</td><td>畳む(収束)</td></tr>
    <tr><th>思考</th><td>抽象化して問いを導く・仮説思考</td><td>具体化して解を導く・専門知識</td></tr>
    <tr><th>人数</th><td>少数で考える</td><td>意見を十分に集めて動く</td></tr>
    <tr><th>姿勢</th><td>能動的</td><td>受動的</td></tr>
  </tbody>
</table>
<p style="margin-top:20px">仕事(問題解決)とは<mark>抽象から具体への変換作業</mark>。問題が定義されるまでは逆向き。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【6:20〜7:30】営業=風呂敷を広げる、技術屋=畳む、という例を添えると笑いが取れる。川下はAIに代替されやすい側、とも触れる。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">川上は攻め、川下は守り</div>
<h2>OSが違うことを認識する</h2>
<div class="grid2">
  <div class="card abs-c">
    <h3 class="abs">川上</h3>
    <ul class="dots">
      <li>ミスって当たり前</li>
      <li>弱いところは一点突破できればよい</li>
    </ul>
  </div>
  <div class="card con-c">
    <h3 class="con">川下</h3>
    <ul class="dots">
      <li>90点以上が当たり前</li>
      <li>一番弱い部分がボトルネック<br>→ 全方位で底上げ</li>
    </ul>
  </div>
</div>
<p style="margin-top:24px">品質へのこだわりと、それを求める顧客からの信頼が<mark>負債</mark>になり、川上の文化が育ちにくい。</p>
<p class="small muted">「横串を通す」「部門横断で考える」という言葉自体が、川下の発想で川上を考えている証拠。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【7:30〜8:30】川下のチームがそのまま川上に行っても「失敗してもいいから挑戦しよう」は出てこない。高品質という強みがそのまま弱みになる構造。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">川下の組織で新規テーマが通らない理由</div>
<h2>具体の要望に、具体で返してしまう</h2>
<div class="grid2">
  <div class="card">
    <h3>「投資対効果をデータで」に<br>意味があるのか？</h3>
    <ul class="dots">
      <li>既存システムの更改なら出せる</li>
      <li>新規なのだから過去のデータはない</li>
    </ul>
    <p class="small muted" style="margin-top:8px">例: 子供の学費のROIは計算しないよね</p>
  </div>
  <div class="card">
    <h3>「事例を見せて」</h3>
    <ul class="dots">
      <li><b>実例</b>: 実際に導入された実績</li>
      <li><b>具体例</b>: 導入されていなくても<br>イメージが湧けばよい</li>
      <li>求められているのは<br>実は<b>具体例</b>かもしれない</li>
    </ul>
  </div>
</div>
<p style="margin-top:22px">言われたから見せる、ではなく<mark>相手の目的を仮説立ててから</mark>動く。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【8:30〜9:30】実例を見せても「うちの業務は特別だから参考にならない」で終わりがち。川下の担当者を説得するのは難しいので、相手組織の中に川上出身の人を探す、という実務的なTipsも。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">誰に向けて提案しているか</div>
<h2>コストセンターとプロフィットセンター</h2>
<table>
  <thead><tr><th></th><th>コストセンター(情シス・DX等)</th><th>プロフィットセンター(事業部等)</th></tr></thead>
  <tbody>
    <tr><th>ミッション</th><td>技術の検証・導入、効率化</td><td>売上・利益の最大化</td></tr>
    <tr><th>PoCの成功</th><td>動くかどうか</td><td>儲かるかどうか</td></tr>
    <tr><th>予算</th><td>枠内で消費(使い切る)</td><td>投資へのリターン(PL責任)</td></tr>
    <tr><th>リスク</th><td>新技術を試したい</td><td>既存ビジネスを止めたくない</td></tr>
  </tbody>
</table>
<p style="margin-top:20px" class="small">成功パターン: <b>新技術の収益性に確信を持ったプロフィットセンターの責任者</b>がけん引する。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【9:30〜10:15】直接の依頼主が情シスでも、最終的には事業部を説得しないと進まない。提案相手がどちら側か、を意識する。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">抽象度の高い思考は一人で</div>
<blockquote>統一感のないシステムができる原因は、<br>一言で表現すれば「一人が全体設計をしていない」から</blockquote>
<ul class="dots">
  <li>各部門の代表が集まって全体構想を練る → 始まる前から統一感のなさが約束される</li>
  <li>抽象・コンセプトをまとめる仕事は、関わる人が増えるほど品質が下がる</li>
  <li><b>抽象度を上げれば、一人でも全体が見える</b></li>
  <li>問題はマトリョーシカ構造 → 自分の担当範囲だけでも抽象度を上げる意味がある</li>
</ul>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【10:15〜11:00】最後のマトリョーシカが大事。若手でも自分のモジュール・自分のタスクの範囲で川上の思考はできる。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">アジャイルの本質</div>
<h2>具体と抽象の往復をプロセスに組み込む仕組み</h2>
<div class="loop">
  <div class="box box-abs"><b>STEP 1</b>「AIを活用したい」<br>抽象的な問い</div>
  <div class="box box-con"><b>STEP 2</b><mark>具体に落として</mark><br>粗い試作品を作る</div>
  <div class="box box-con"><b>STEP 3</b>フィードバックを<br>もらう</div>
  <div class="box box-abs"><b>STEP 4</b>抽象に戻して<br>方向を修正 ↺</div>
</div>
<p>データ分析より<b>数を打つ</b>。作ること自体が目的になると手段と目的が逆転する。</p>
<p style="margin-top:18px">「言いたいことはわかるが、現場ではそうはいかない」<br>→ それこそが<mark>具体への逃避</mark>(典型的な川下OSの反応)</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【11:00〜12:00】人間は抽象のままでは判断できない、という前半の話がここで回収される。「現場ではそうはいかない」は本書が一番刺してくるところなので、ゆっくり読む。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">フロー型からストック型へ</div>
<h2>人も会社も、放っておくと「ある」前提になる</h2>
<div class="grid2">
  <div class="card">
    <h3>増える一方のもの</h3>
    <ul class="dots">
      <li>ルール・制約(減らす責任を取れない)</li>
      <li>役割分担・秩序</li>
      <li>ブランド、ヒト・カネ・モノ</li>
    </ul>
  </div>
  <div class="card">
    <h3>関心が外から内へ</h3>
    <ul class="dots">
      <li>人が増える → 社内政治に関心が向く</li>
      <li>ルールが増える → 顧客・市場に向き合う時間が減る</li>
      <li>わかりやすい具体的な説明が求められる</li>
    </ul>
  </div>
</div>
<p style="margin-top:22px">不可逆で、生きていくための必然。悪いことではないが、<br><mark>自分たちがストック型になっていると自覚する</mark>ことが大切。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【12:00〜12:45】「なんで会社ってこんな非効率なことをやってるんだろう」が腹落ちしたポイント。批判ではなく自覚の話として話す。
-->

---
layout: none
---

<div class="gk slide oneliner">
<div class="kicker">AIが奪うもの</div>
<p class="big" style="font-size:46px">AIはSIの<span class="con">具体</span>の部分を奪う</p>
<ul class="dots" style="margin-top:30px">
  <li>「顧客ニーズが曖昧で困る」→ 曖昧でないなら、AIがすぐに解いてしまう</li>
  <li>何が問題かを探すのが、人間のSIの仕事になる</li>
  <li>自分たちの仕事を減らすように見える、AIドリブンな業務プロセスの提案こそが<br>Whyに基づく能動的な提案</li>
</ul>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【12:45〜13:30】冒頭の「AI時代に人間に残るのは抽象側」の回収。曖昧さは困りごとではなく、SIの仕事の源泉。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">明日から試せること</div>
<h2>個人的なTODO</h2>
<ul class="q-list compact">
  <li><b>1.</b> 仮説を立てて、<span class="con">雑に具体に落としてから</span>レビューしてもらう</li>
  <li><b>2.</b> 自分は<b>川上と川下どちら側が得意か</b>を考え、苦手側を補う</li>
  <li><b>3.</b> 相手の得意分野と立場を見て、<b>自分のOSを切り替える</b></li>
  <li><b>4.</b> 関数型プログラミング(特にHaskell)で、<span class="abs">抽象のまま作る</span>考え方を活かす</li>
  <li><b>5.</b> プログラマー3大美徳の<b>「傲慢」</b>を意識し、自分で一旦決める</li>
</ul>
<p class="small muted" style="margin-top:2px">『システム開発と「具体と抽象」』細谷功 / 技術評論社</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【13:30〜13:45】まず5つを一覧で見せ、それぞれ次のスライドで話す。時間が押していたら17枚目を飛ばしてここに来る。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">TODO 1 ・ 仮説 → 雑な具体 → レビュー</div>
<h2>調整は避けられない。だから先に雑な具体を出す</h2>
<div class="lane">
  <div class="label muted">前提</div>
  <div class="flow"><div class="box">組織はストック型になっていく</div><div class="arrow">→</div><div class="box">関係者との調整は回避できない</div></div>
</div>
<div class="lane">
  <div class="label abs">進め方</div>
  <div class="flow"><div class="box box-abs">仮説を立てる</div><div class="arrow">→</div><div class="box box-con">雑に具体に落とす</div><div class="arrow">→</div><div class="box">レビューしてもらう</div><div class="arrow">↺</div></div>
</div>
<p style="margin-top:10px">抽象のまま相談しても、相手は判断できない(スライド6)。<br><mark>叩き台という具体があって初めて、調整が前に進む</mark>。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【13:45〜14:00】スライド17のストック型の話とつなげる。調整を減らそうとするより、調整の場に雑な具体を持ち込むほうが速い。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">TODO 2 ・ 自分はどちら側が得意か</div>
<h2>自分は抽象寄り。具体を詰めるのが苦手</h2>
<div class="grid2" style="flex:none">
  <div class="card con-c">
    <h3>苦手なこと</h3>
    <ul class="dots">
      <li>タスクをマイルストーンに落とす</li>
      <li>リスクを洗い出す</li>
      <li>レビューで具体を聞かれると、それっぽい具体を適当に返してしまう</li>
    </ul>
  </div>
  <div class="card abs-c">
    <h3>対策</h3>
    <ul class="dots">
      <li><b>Claudeの /grill-me</b><br><span class="small">ふわっとやりたいことを言う<br>→ AIが質問してくる<br>→ ひたすらレスバすると具体が詰まる</span></li>
      <li><b>「そこ考えてませんでした！」</b><br><span class="small">素直に言うことで嘘つきにならないようにする</span></li>
    </ul>
  </div>
</div>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【14:00〜14:20】/grill-meは実際の画面を見せられるなら見せる。「それっぽい具体を返すクセ」は自分の失敗談として話す。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">TODO 3 ・ 相手に合わせてOSを切り替える</div>
<h2>理想はバランス型。でも全員がそうはいられない</h2>
<ul class="dots">
  <li>人によって川上・川下の得意不得意がある</li>
  <li>立場によって、どちらかのOSを押し付けられることもある</li>
</ul>
<div class="lane" style="margin-top:14px">
  <div class="label muted">例</div>
  <div class="flow"><div class="box">上が数字を求めてくる</div><div class="arrow">→</div><div class="box box-con">メンバーに数字を求めざるを得ない</div></div>
</div>
<p><mark>相手の得意分野と相手の立場</mark>を考慮して、自分のOSを切り替えることを意識する。</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【14:20〜14:35】数字を求めてくる人も、本人の得意分野ではなく立場でそう言っているのかもしれない。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">TODO 4 ・ 関数型プログラミング</div>
<h2>Haskellは、抽象のままものを作れる</h2>
<ul class="dots">
  <li>Haskellは<a href="https://ryosukedtomita.github.io/Slidev/2026-08-28/1" target="_blank" rel="noopener">制約と誓約</a>により、<b>数学の高度な抽象化</b>を扱えるようになっている</li>
  <li>具体の部分をそんなに考えなくても、<mark>理解のキャッシュ</mark>でものを作れる</li>
  <li>抽象寄りの自分には、この考え方が合っていると思った</li>
</ul>
<p class="small muted" style="margin-top:16px">制約と誓約: https://ryosukedtomita.github.io/Slidev/2026-08-28/1</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【14:35〜14:50】TODO 2の「自分は抽象寄り」とつなげる。苦手な具体を補うだけでなく、得意な抽象を活かせる道具を選ぶ話として。リンク先は興味がある人向けに紹介するだけで深入りしない。
-->

---
layout: none
---

<div class="gk slide">
<div class="kicker">TODO 5 ・ プログラマー3大美徳</div>
<h2>抽象側に立つには、ある種の「傲慢さ」が要る</h2>
<div class="virtues">
  <div class="box">怠惰<small>Laziness</small></div>
  <div class="box">短気<small>Impatience</small></div>
  <div class="box box-abs">傲慢<small>Hubris</small></div>
</div>
<ul class="dots">
  <li>全体を俯瞰して<b>「俺が一旦決める」</b>という傲慢さがないと、抽象側に立てない</li>
  <li>多少無理してでも傲慢になり、<mark>自分で一旦決める</mark></li>
</ul>
<p class="small muted" style="margin-top:8px">スライド15「抽象度の高い思考は一人で」の実践</p>
<div class="footer"><span>システム開発と「具体と抽象」</span><span class="page-no">{{ $page }} <small>/ {{ $nav.total }}</small></span></div>
</div>

<!--
【14:50〜15:00】スライド15の「一人が全体設計をしていない」の回収。決めたあとに具体で叩いてもらえばいい(TODO 1)。最後に会場へ「皆さんはどちら側が得意？」と投げて質疑へ。
-->
