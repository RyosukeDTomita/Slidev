<script setup lang="ts">
/** キーワードを目立たせる小さなピル。<Tag color="gold">純粋関数</Tag> のように使う。 */
withDefaults(defineProps<{
  color?: 'gold' | 'cyan' | 'red' | 'green' | 'blue' | 'muted'
}>(), {
  color: 'cyan',
})
</script>

<template>
  <span class="tg-tag" :class="`tg-tag--${color}`">
    <slot />
  </span>
</template>

<style scoped>
.tg-tag {
  display: inline-block;
  padding: 0.1em 0.62em;
  margin: 0 0.15em;
  border-radius: 999px;
  border: 1px solid currentColor;
  background: rgba(7, 54, 66, 0.75);
  font-size: 0.82em;
  font-weight: 600;
  line-height: 1.7;
  white-space: nowrap;
}

.tg-tag--gold { color: var(--tg-gold); }
.tg-tag--cyan { color: var(--tg-cyan); }
.tg-tag--red { color: var(--tg-red); }
.tg-tag--green { color: var(--tg-green); }
.tg-tag--blue { color: var(--tg-blue); }
.tg-tag--muted { color: var(--tg-muted); }
</style>
