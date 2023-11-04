<script setup lang="ts">
import { toRefs } from '@vue/reactivity';

const props = defineProps({
    percent: {
        type: Number,
        default: 70
    },
    color: {
        type: String,
        default: 'bg-sky-600 border-sky-600'
    },
    current: {
        type: Number,
        default: 120
    }
})

const { percent, color, current } = toRefs(props)
const slice1 = () => 90 - Math.round(percent.value * 360);
const slice2 = () => 210 - Math.round(percent.value * 360);
const slice3 = () => 330 - Math.round(percent.value * 360);
</script>

<template>
    <section class="viet select-none flex flex-col items-center gap-1">
        <div
            class="peer bg-sky-300 relative w-20 h-20 rounded-full overflow-hidden cursor-pointer [&>div]:absolute [&>div]:top-[50%] [&>div]:left-[50%] [&>div]:w-full [&>div]:h-full [&>div]:origin-top-left [&>div]:border-[1px] [&>div]:">
            <div :class="color" :style="`transform: rotate(270deg) skew(${slice1() < -30 ? -30 : slice1()}deg)`">
            </div>
            <div v-if="percent > 1 / 3" :class="color"
                :style="`transform: rotate(30deg) skew(${slice2() < -30 ? -30 : slice2()}deg)`">
            </div>
            <div v-if="percent > 2 / 3" :class="color"
                :style="`transform: rotate(150deg) skew(${slice3() < -30 ? -30 : slice3()}deg)`">
            </div>
            <mark class="absolute w-16 h-16 top-2 left-2 rounded-full grid place-items-center bg-white">
                <div class="w-[85%] h-[85%] grid place-items-center font-black rounded-full text-slate-50" :class="color">
                    {{ current }}</div>
            </mark>
        </div>
        <span class="text-xs w-24 text-center font-bold text-sky-600">Sisa Waktu (s)</span>
    </section>
</template>