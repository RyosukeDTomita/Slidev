<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** public/ 配下のアイコン。`/icon.png` のようにスラッシュ始まりで書く */
  icon?: string
  /** 発表者名 */
  speaker?: string
  /** 日付やイベント名。link があるときは、そのリンクのラベルとして使う */
  meta?: string
  /** イベントページなどの URL。右下に meta をラベルにして出す */
  link?: string
  /** public/ 配下の QR 画像。右下に小さく出す */
  qr?: string
  /** QR の説明 */
  qrCaption?: string
}>()

/** デプロイ先の base (`/Slidev/2026-08-28/` など) を前置する */
const iconSrc = computed(() => {
  if (!props.icon)
    return undefined
  if (!props.icon.startsWith('/'))
    return props.icon
  return import.meta.env.BASE_URL.replace(/\/$/, '') + props.icon
})
</script>

<template>
  <div class="slidev-layout tg-cover">
    <SeaScape variant="cover" />
    <div class="tg-cover__inner">
      <slot />
    </div>
    <div v-if="iconSrc || speaker" class="tg-cover__signature">
      <img v-if="iconSrc" :src="iconSrc" :alt="speaker ?? ''">
      <div>
        <div v-if="speaker" class="tg-cover__name">
          {{ speaker }}
        </div>
        <!-- link があるときは meta を右下のリンクのラベルに回すので、ここには出さない -->
        <div v-if="meta && !link" class="tg-cover__meta">
          {{ meta }}
        </div>
      </div>
    </div>
    <div v-if="qr" class="tg-cover__qr">
      <QrCode :src="qr" size="120px" :caption="qrCaption" />
    </div>
    <!-- 生の URL は横に長く、左下の署名と衝突するので、イベント名+日付をラベルにする -->
    <a v-if="link" class="tg-cover__link" :href="link" target="_blank" rel="noreferrer">
      {{ meta ?? link }}
    </a>
  </div>
</template>

<style>
.tg-cover {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 3.4rem 0 0 !important;
  overflow: hidden;
  text-align: center;
}

/* 背景に模様を重ねると表紙がうるさくなるので、表紙だけ消す */
.tg-cover::after {
  content: none;
}

.tg-cover__inner {
  position: relative;
  z-index: 2;
  max-width: 80%;
}

/*
 * タイトルは1行に収める。折り返さない上限は、inner の max-width 80%
 * (canvasWidth 980px なら 784px) に対して2.74rem。描画差で折り返さないよう
 * 少しだけ余裕を取って2.7remにしている。
 */
.tg-cover h1 {
  font-size: 2.7rem;
  line-height: 1.22;
  margin-bottom: 0.5rem;
  color: var(--tg-bright);
  text-shadow:
    0 0 22px rgba(0, 16, 25, 0.9),
    0 2px 10px rgba(0, 16, 25, 0.9);
}

.tg-cover h2 {
  border: none;
  padding: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--tg-gold);
  text-shadow: 0 2px 12px rgba(0, 16, 25, 0.9);
}

.tg-cover p {
  color: var(--tg-text);
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}

.tg-cover ul > li::before {
  content: none;
}

.tg-cover ul > li {
  padding-left: 0;
}

/*
 * 表紙の署名。アイコン + 名前 + 日付を左下に置く。
 * 中央のテキストブロックに足すと夕日と衝突するので、絶対配置で逃がしている。
 */
.tg-cover__signature {
  position: absolute;
  left: 2.8rem;
  bottom: 2.2rem;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-align: left;
}

.tg-cover__signature img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid var(--tg-gold);
  box-shadow: 0 0 18px rgba(245, 197, 66, 0.35), 0 4px 14px rgba(0, 16, 25, 0.8);
  object-fit: cover;
}

.tg-cover__name {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--tg-bright);
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}

.tg-cover__meta {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 1.5rem;
  color: var(--tg-muted);
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}

/*
 * 資料の QR。署名と縦に並べたいので左端に置き、署名(アイコン 68px)の上へ逃がす。
 * 島のシルエットに少しかかるが、QrCode 側が白いカードでクワイエットゾーンを確保している。
 */
.tg-cover__qr {
  position: absolute;
  left: 2.8rem;
  bottom: 7.6rem;
  z-index: 3;
}

/*
 * イベントページへのリンク。署名と釣り合うよう右下に置く。
 * `.slidev-layout a` の underline のほうが詳細度で勝つと border-bottom と
 * 二重線になるので、要素セレクタを足して打ち消せるようにしている。
 */
.tg-cover a.tg-cover__link {
  position: absolute;
  right: 2.8rem;
  bottom: 2.4rem;
  z-index: 3;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 1.5rem;
  color: var(--tg-muted);
  text-decoration: none;
  border-bottom: 1px solid rgba(147, 168, 171, 0.5);
  text-shadow: 0 2px 10px rgba(0, 16, 25, 0.95);
}

.tg-cover a.tg-cover__link:hover {
  color: var(--tg-cyan);
}
</style>
