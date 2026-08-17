<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

/**
 * 各スライドの見出しの上に出す、現在地の大項目(章)表示。
 * 見せ場のレイアウトと、章扉そのもの(大見出しと内容が重複する)では出さない。
 */
const BARE_LAYOUTS = ['cover', 'end', 'statement', 'section']

const { slides, currentSlideNo, currentSlideRoute } = useNav()

/**
 * 現在ページから手前に遡って最初に見つかった章扉(layout: section)を大項目とする。
 * 章扉側の `index` と見出しをそのまま使うので、各スライドへの追記は不要。
 */
const currentSection = computed(() => {
  // slides は0始まり、currentSlideNo は1始まりなので -1 して現在ページ自身から探す
  for (let i = currentSlideNo.value - 1; i >= 0; i--) {
    const slide = slides.value[i]?.meta?.slide
    if (slide?.frontmatter?.layout === 'section') {
      return { index: slide.frontmatter.index, title: slide.title }
    }
  }
  return null
})

const visible = computed(() =>
  !!currentSection.value
  && !BARE_LAYOUTS.includes(currentSlideRoute.value?.meta?.slide?.frontmatter?.layout),
)
</script>

<template>
  <div v-if="visible" class="tg-breadcrumb">
    <span v-if="currentSection!.index !== undefined" class="tg-breadcrumb__index">
      {{ currentSection!.index }}
    </span>
    <span class="tg-breadcrumb__title">{{ currentSection!.title }}</span>
  </div>
</template>

<style scoped>
.tg-breadcrumb {
  /* 見出しの上、.slidev-layout の上パディング(2.6rem)の内側に収める */
  position: absolute;
  top: 0.95rem;
  /* 左端は h2 の縦罫と揃える */
  left: 3rem;
  right: 3rem;
  z-index: 20;
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  font-size: 0.72rem;
  line-height: 1;
  color: var(--tg-muted);
  white-space: nowrap;
  pointer-events: none;
}

.tg-breadcrumb__index {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 0.9em;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--tg-cyan);
}

.tg-breadcrumb__title {
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.04em;
}
</style>
