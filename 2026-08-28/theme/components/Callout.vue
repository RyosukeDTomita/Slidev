<script setup lang="ts">
/** 補足・注意・主張を囲むボックス。 */
withDefaults(defineProps<{
  /** point: 主張(金) / info: 補足(シアン) / warn: 注意(オレンジ) */
  type?: 'point' | 'info' | 'warn'
  /** 見出し。省略すると type ごとの既定値 */
  title?: string
}>(), {
  type: 'point',
})

/** point は主張そのものを読ませたいので、既定の見出しを持たない */
const DEFAULT_TITLE = {
  point: undefined,
  info: '補足',
  warn: 'ハマりどころ',
} as const
</script>

<template>
  <div class="tg-callout" :class="`tg-callout--${type}`">
    <div v-if="title ?? DEFAULT_TITLE[type]" class="tg-callout__title">
      {{ title ?? DEFAULT_TITLE[type] }}
    </div>
    <div class="tg-callout__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tg-callout {
  --tg-callout-accent: var(--tg-gold);
  position: relative;
  margin: 0.9rem 0;
  padding: 0.7rem 1rem 0.8rem;
  border: 1px solid var(--tg-callout-accent);
  border-left-width: 5px;
  border-radius: 0 8px 8px 0;
  background: rgba(4, 34, 44, 0.85);
}

.tg-callout--info { --tg-callout-accent: var(--tg-cyan); }
.tg-callout--warn { --tg-callout-accent: var(--tg-orange); }

.tg-callout__title {
  color: var(--tg-callout-accent);
  font-size: 1em;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.tg-callout__body {
  color: var(--tg-bright);
}

.tg-callout__body :deep(p) {
  margin: 0.2rem 0;
}

.tg-callout__body :deep(ul) {
  margin: 0.2rem 0;
}
</style>
