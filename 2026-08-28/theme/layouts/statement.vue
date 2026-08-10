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
  font-size: 1rem;
  margin-top: 1.2rem;
}

.tg-statement ul > li::before {
  content: none;
}

.tg-statement ul > li {
  padding-left: 0;
}
</style>
