<script setup lang="ts">
defineProps<{
  /** public/ 配下の QR 画像。左下に小さく出す */
  qr?: string
  /** QR の説明 */
  qrCaption?: string
  /** 2枚目の QR 画像。1枚目の右隣に並べる */
  qr2?: string
  /** 2枚目の QR の説明 */
  qr2Caption?: string
}>()
</script>

<template>
  <div class="slidev-layout tg-end">
    <SeaScape variant="end" />
    <div class="tg-end__inner">
      <slot />
    </div>
    <div v-if="qr || qr2" class="tg-end__qr">
      <QrCode v-if="qr" :src="qr" size="140px" :caption="qrCaption" />
      <QrCode v-if="qr2" :src="qr2" size="140px" :caption="qr2Caption" />
    </div>
  </div>
</template>

<style>
.tg-end {
  display: flex;
  /* 島のシルエットに文字が重なると読みづらいので、表紙と同じく上寄せにする */
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 0 0 !important;
  overflow: hidden;
  text-align: center;
}

.tg-end::after {
  content: none;
}

.tg-end__inner {
  position: relative;
  z-index: 2;
  max-width: 78%;
}

.tg-end h1 {
  font-size: 2.8rem;
  color: var(--tg-bright);
  text-shadow: 0 2px 16px rgba(0, 16, 25, 0.95);
}

.tg-end p,
.tg-end a {
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}

.tg-end ul > li::before {
  content: none;
}

.tg-end ul > li {
  padding-left: 0;
}

/* 夕日と島を避けて左下に置く */
.tg-end__qr {
  position: absolute;
  left: 3rem;
  bottom: 2.2rem;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
}
</style>
