<script setup lang="ts">
/**
 * 全スライド共通のページ番号。
 * 発表タイトルは表紙と global-top.vue の現在地表示で足りていて、帯にすると
 * 本文の縦幅を丸ごと1行分食うので置かない。番号だけを右下に逃がす。
 * 表紙・章の主張・エンディングなど「見せ場」のレイアウトでは邪魔なので出さない。
 */
const BARE_LAYOUTS = ['cover', 'end', 'statement']
</script>

<template>
  <footer
    v-if="!BARE_LAYOUTS.includes($slidev.nav.currentSlideRoute?.meta?.slide?.frontmatter?.layout)"
    class="tg-footer"
  >
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
  justify-content: flex-end;
  padding: 0 1.6rem 0.35rem;
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--tg-muted);
  pointer-events: none;
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
