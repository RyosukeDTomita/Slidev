<script setup lang="ts">
import { computed } from 'vue'

/**
 * QR コード。読み取れることが最優先なので、暗い背景の上でも
 * 必ず白いカードに載せてクワイエットゾーンを確保する。
 */
const props = withDefaults(defineProps<{
  /** public/ 配下の画像。`/資料QR.png` のようにスラッシュ始まりで書く */
  src: string
  /** QR 本体の一辺 */
  size?: string
  /** QR の下に出す説明 */
  caption?: string
}>(), {
  size: '260px',
})

/** デプロイ先の base を前置する */
const imgSrc = computed(() =>
  props.src.startsWith('/')
    ? import.meta.env.BASE_URL.replace(/\/$/, '') + props.src
    : props.src,
)
</script>

<template>
  <div class="tg-qr">
    <div class="tg-qr__card">
      <img :src="imgSrc" :alt="caption ?? 'QR コード'" :style="{ width: size, height: size }">
    </div>
    <div v-if="caption" class="tg-qr__caption">
      {{ caption }}
    </div>
  </div>
</template>

<style scoped>
.tg-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
}

.tg-qr__card {
  padding: 0.7rem;
  border-radius: 10px;
  background: #fff;
  border: 2px solid var(--tg-gold);
  box-shadow: 0 0 22px rgba(245, 197, 66, 0.3), 0 8px 26px rgba(0, 16, 25, 0.7);
  line-height: 0;
}

.tg-qr__card img {
  display: block;
  /* QR はドットを潰さないよう、拡大時も補間しない */
  image-rendering: pixelated;
}

.tg-qr__caption {
  font-size: 0.85rem;
  color: var(--tg-bright);
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}
</style>
