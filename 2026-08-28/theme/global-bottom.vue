<script setup lang="ts">
/**
 * 全スライド共通のフッター。
 * 表紙・章の主張・エンディングなど「見せ場」のレイアウトでは邪魔なので出さない。
 * 現在地の大項目は global-top.vue 側で見出しの上に出している。
 */
const BARE_LAYOUTS = ['cover', 'end', 'statement']
</script>

<template>
  <footer
    v-if="!BARE_LAYOUTS.includes($slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter?.layout)"
    class="tg-footer"
  >
    <span class="tg-footer__title">{{ $slidev.configs.title }}</span>
    <span class="tg-footer__page">
      {{ $slidev.nav.currentPage }}<span class="tg-footer__slash"> / </span>{{ $slidev.nav.total }}
    </span>
  </footer>
</template>

<style scoped>
.tg-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  /* DOM 上ではスライド本体より前に出力されるため、明示的に前面へ持ち上げる */
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 1.6rem 0.55rem;
  font-size: 0.72rem;
  color: var(--tg-muted);
  border-top: 1px solid rgba(14, 74, 88, 0.9);
  background: linear-gradient(to top, rgba(0, 16, 25, 0.85), transparent);
  pointer-events: none;
}

.tg-footer::before {
  /* 水平線のきらめきをフッターにも1本 */
  content: '';
  position: absolute;
  left: 0;
  top: -1px;
  width: 34%;
  height: 1px;
  background: linear-gradient(to right, var(--tg-gold), var(--tg-cyan), transparent);
}

.tg-footer__title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tg-footer__page {
  font-family: var(--slidev-font-mono, monospace);
  font-variant-numeric: tabular-nums;
  color: var(--tg-gold);
}

.tg-footer__slash {
  color: var(--tg-muted);
}
</style>
