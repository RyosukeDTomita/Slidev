<script setup lang="ts">
/**
 * 画面下端に敷く波。
 * 1周期 720 の波形を2つ並べた SVG を横 200% で描き、-50% ずらして無限ループさせる。
 */
withDefaults(defineProps<{
  /** 波の高さ */
  height?: string
  /** 全体の不透明度 */
  opacity?: number
  /** 波を流すかどうか。本編スライドでは動くとノイズになるので止める */
  animated?: boolean
}>(), {
  height: '150px',
  opacity: 1,
  animated: true,
})

const WAVE = 'M0 60 C 120 20, 240 100, 360 60 S 600 20, 720 60 '
  + 'C 840 20, 960 100, 1080 60 S 1320 20, 1440 60 L 1440 160 L 0 160 Z'
</script>

<template>
  <div class="tg-waves" :class="animated ? 'tg-anim' : 'tg-waves--static'" :style="{ height, opacity }">
    <svg class="tg-waves__layer tg-waves__layer--back" viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path :d="WAVE" fill="#073642" />
    </svg>
    <svg class="tg-waves__layer tg-waves__layer--mid" viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path :d="WAVE" fill="#0e4a58" />
    </svg>
    <svg class="tg-waves__layer tg-waves__layer--front" viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path :d="WAVE" fill="none" stroke="#3fd0c4" stroke-width="2.5" />
    </svg>
  </div>
</template>

<style scoped>
.tg-waves {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.tg-waves__layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
}

.tg-waves__layer--back {
  opacity: 0.55;
  animation: tg-wave-scroll 26s linear infinite;
}

.tg-waves__layer--mid {
  opacity: 0.75;
  bottom: -12px;
  animation: tg-wave-scroll 18s linear infinite reverse;
}

.tg-waves__layer--front {
  opacity: 0.5;
  bottom: 6px;
  animation: tg-wave-scroll 22s linear infinite;
}

.tg-waves--static .tg-waves__layer {
  animation: none;
}

@keyframes tg-wave-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
