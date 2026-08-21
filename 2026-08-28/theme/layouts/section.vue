<script setup lang="ts">
/** 章扉。frontmatter の `index` で右下に通し番号を出せる。 */
defineProps<{
  index?: string | number
}>()
</script>

<template>
  <div class="slidev-layout tg-section">
    <SeaScape variant="section" />
    <div class="tg-section__inner">
      <div v-if="index !== undefined" class="tg-section__index">
        {{ index }}
      </div>
      <slot />
    </div>
  </div>
</template>

<style>
.tg-section {
  display: flex;
  align-items: center;
  padding: 0 4rem 8rem !important;
  overflow: hidden;
}

.tg-section::after {
  content: none;
}

.tg-section__inner {
  position: relative;
  z-index: 2;
  max-width: 78%;
}

.tg-section__index {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--tg-gold);
  margin-bottom: 0.3rem;
}

.tg-section h1 {
  font-size: 2.5rem;
  line-height: 1.25;
  text-shadow: 0 2px 14px rgba(0, 16, 25, 0.9);
}

.tg-section h1::after {
  content: '';
  display: block;
  width: 5.5rem;
  height: 4px;
  margin-top: 0.9rem;
  border-radius: 2px;
  background: linear-gradient(to right, var(--tg-gold), var(--tg-cyan));
}

.tg-section p {
  color: var(--tg-muted);
  margin-top: 0.8rem;
}
</style>
