<script setup lang="ts">
/**
 * 表紙・章扉・エンディングの背景。
 * 水平線 + 島(友ヶ島イメージ: 低い稜線と砲台跡のシルエット) + 太陽 + 波。
 */
withDefaults(defineProps<{
  /** cover: 光の翼つきフル装備 / section: 控えめ / end: 夕暮れ */
  variant?: 'cover' | 'section' | 'end'
}>(), {
  variant: 'cover',
})

/** 稜線2つと、その上に立つ砲台跡のシルエット。 */
const ISLAND = 'M0 120 L 40 118 C 80 116, 110 104, 140 84 C 158 72, 176 74, 188 90 '
  + 'C 202 106, 216 98, 230 86 C 250 68, 272 72, 290 94 C 308 116, 342 120, 380 120 Z'
</script>

<template>
  <div class="tg-sea" :class="`tg-sea--${variant}`">
    <div class="tg-sea__sky" />

    <!-- デスティニーの光の翼。太陽の後光として左右対称に広げる -->
    <template v-if="variant === 'cover'">
      <div class="tg-sea__wings tg-sea__wings--right tg-anim">
        <span v-for="i in 6" :key="i" class="tg-sea__wing" :style="{ '--i': i }" />
      </div>
      <div class="tg-sea__wings tg-sea__wings--left tg-anim">
        <span v-for="i in 6" :key="i" class="tg-sea__wing" :style="{ '--i': i }" />
      </div>
    </template>

    <div class="tg-sea__sun" />
    <div class="tg-sea__glitter" />
    <div class="tg-sea__horizon" />

    <svg class="tg-sea__island" viewBox="0 0 380 120" preserveAspectRatio="xMidYMax meet">
      <path :d="ISLAND" fill="#001019" />
      <!--
        砲台跡。底辺は稜線ではなく島の下端(y=120)まで伸ばす。
        稜線はこの位置で y=83.6〜96.7 と傾いているので、底辺を水平に切ると右側に隙間ができる。
      -->
      <path d="M182 120 L182 58 L196 58 L196 120 Z" fill="#001019" />
      <circle cx="189" cy="55" r="3" fill="#f5c542" />
    </svg>

    <!-- 動かすのは表紙とエンディングだけ。章扉で流れていると本編のノイズになる -->
    <Waves
      :height="variant === 'section' ? '110px' : '170px'"
      :opacity="variant === 'section' ? 0.6 : 1"
      :animated="variant !== 'section'"
    />
  </div>
</template>

<style scoped>
.tg-sea {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.tg-sea__sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #00161d 0%, #013343 46%, #04505c 62%, #002b36 74%, #001019 100%);
}

.tg-sea--end .tg-sea__sky {
  background: linear-gradient(180deg, #071a24 0%, #123444 40%, #6a3a2c 60%, #0b2d38 76%, #001019 100%);
}

/*
 * 太陽は水平線(62%)に半分沈めた位置に置く。
 * 中央だと表紙のタイトルと重なって字が読めなくなるので、右寄せにしている。
 */
.tg-sea__sun {
  position: absolute;
  left: 74%;
  top: 62%;
  width: 150px;
  height: 150px;
  margin-left: -75px;
  margin-top: -75px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tg-wing) 0%, var(--tg-gold) 40%, rgba(245, 197, 66, 0.14) 60%, transparent 72%);
}

/* 章扉はテキストに水平線がかからないよう、風景全体を下へ落とす */
.tg-sea--section .tg-sea__sun {
  width: 110px;
  height: 110px;
  margin-left: -55px;
  margin-top: -55px;
  left: 84%;
  top: 82%;
  opacity: 0.8;
}

.tg-sea--section .tg-sea__horizon,
.tg-sea--section .tg-sea__island {
  top: 82%;
}

/* 太陽の下に伸びる海面の反射 */
.tg-sea__glitter {
  position: absolute;
  left: 74%;
  top: 62%;
  width: 200px;
  height: 32%;
  margin-left: -100px;
  background: linear-gradient(to bottom, rgba(245, 197, 66, 0.45), rgba(245, 197, 66, 0));
  /* 横方向にも減衰させないと、ただの長方形に見えてしまう */
  mask-image:
    repeating-linear-gradient(to bottom, #000 0 3px, transparent 3px 8px),
    radial-gradient(ellipse 55% 100% at 50% 0%, #000 10%, transparent 75%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
  filter: blur(1.5px);
}

.tg-sea--section .tg-sea__glitter {
  left: 84%;
  top: 82%;
  height: 18%;
  opacity: 0.6;
}

.tg-sea--end .tg-sea__glitter {
  background: linear-gradient(to bottom, rgba(255, 154, 77, 0.45), rgba(255, 154, 77, 0));
}

.tg-sea--end .tg-sea__sun {
  background: radial-gradient(circle, #ffe9b0 0%, #ff9a4d 45%, rgba(255, 154, 77, 0.14) 64%, transparent 74%);
}

/* 水平線: 海と空の境目を1本の光で締める */
.tg-sea__horizon {
  position: absolute;
  left: 0;
  right: 0;
  top: 62%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(245, 197, 66, 0.75) 35%, rgba(63, 208, 196, 0.8) 65%, transparent);
  box-shadow: 0 0 18px rgba(245, 197, 66, 0.35);
}

.tg-sea__island {
  position: absolute;
  left: 38%;
  top: 62%;
  width: 46%;
  transform: translate(-50%, -100%);
  opacity: 0.95;
}

.tg-sea--section .tg-sea__island {
  left: 74%;
  width: 30%;
}

/* 光の翼: 太陽から放射状に伸びる帯 */
.tg-sea__wings {
  position: absolute;
  left: 74%;
  top: 62%;
  width: 0;
  height: 0;
}

.tg-sea__wings--left {
  transform: scaleX(-1);
}

.tg-sea__wing {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 10px;
  transform-origin: 0 50%;
  transform: rotate(calc((var(--i) - 3.5) * 13deg)) scaleX(1);
  background: linear-gradient(to right, rgba(255, 243, 207, 0.5), rgba(245, 197, 66, 0.12) 45%, transparent 80%);
  filter: blur(3px);
  animation: tg-wing-breathe 6s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.7s);
}

@keyframes tg-wing-breathe {
  0%, 100% { opacity: 0.35; transform: rotate(calc((var(--i) - 3.5) * 13deg)) scaleX(0.92); }
  50% { opacity: 0.7; transform: rotate(calc((var(--i) - 3.5) * 13deg)) scaleX(1.08); }
}
</style>
