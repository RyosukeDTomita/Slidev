<template>
  <div class="slidev-layout tg-statement">
    <div class="tg-statement__inner">
      <slot />
    </div>
    <Waves height="120px" :opacity="0.5" :animated="false" />
  </div>
</template>

<style>
/* 一番言いたいこと1行だけを置くスライド。 */
.tg-statement {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tg-statement__inner {
  position: relative;
  z-index: 2;
  max-width: 84%;
}

.tg-statement h1,
.tg-statement h2 {
  border: none;
  padding: 0;
  font-size: 2.5rem;
  line-height: 1.4;
  color: var(--tg-bright);
}

.tg-statement strong {
  color: var(--tg-gold);
  /* 手書きの下線風マーカー */
  background: linear-gradient(transparent 78%, rgba(245, 197, 66, 0.32) 78%, rgba(245, 197, 66, 0.32) 92%, transparent 92%);
  padding: 0 0.1em;
}

.tg-statement p {
  color: var(--tg-muted);
  font-size: 1.5rem;
  margin-top: 1.2rem;
}

/*
 * このレイアウトは中央寄せなので、リストをそのまま置くと行頭が揃わない。
 * リスト自体を inline-block にして中央に配置し、中身だけ左寄せに戻す。
 * (点は theme/styles/index.css の li::before が描くので打ち消さない)
 */
.tg-statement ul {
  display: inline-block;
  text-align: left;
  font-size: 1.6rem;
}

/*
 * 上のinline-blockは子孫セレクタなのでネストしたリストにも効いてしまい、
 * 親項目のテキストの右に回り込む。ネスト側はブロックに戻す。
 */
.tg-statement ul ul {
  display: block;
}
</style>
