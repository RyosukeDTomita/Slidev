<script setup lang="ts">
// public/ 配下の画像を `/icon.png` のように書けるようにする。
// 生の <img src="/icon.png"> には base(`/Slidev/<ディレクトリ名>/`)が付かないので、ここで前置する。
const props = defineProps<{
  src: string
  alt?: string
}>()

const resolved = props.src.startsWith('/')
  ? import.meta.env.BASE_URL.replace(/\/$/, '') + props.src
  : props.src
</script>

<template>
  <img :src="resolved" :alt="alt ?? ''">
</template>
