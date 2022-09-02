<script setup>
import { toRefs } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    type: {
        type: String,
        default: 'round',
    },
    color: {
        type: String,
        default: 'blue-600',
    },
    withImage: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: '@/assets/react.png',
    },
    percent: {
        type: [Function, Number],
        required: true
    },
    current: Number,
});
const { color, image, withImage, percent, current } = toRefs(props);
const slice1 = () => {
    return 90 - Math.round(percent.value * 360);
}

const slice2 = () => {
    return 210 - Math.round(percent.value * 360);
}

const slice3 = () => {
    return 330 - Math.round(percent.value * 360);
}
</script>

<template>
    <section class="circles">
        <div class="circle">
            <div class="slice"
                :style="`transform: rotate(270deg) skew(${slice1() < -30 ? -30 : slice1()}deg); background-color: var(--${color}); border-color: var(--${color});`">
            </div>
            <div v-if="percent > 1 / 3" class="slice"
                :style="`transform: rotate(30deg) skew(${slice2() < -30 ? -30 : slice2()}deg); background-color: var(--${color}); border-color: var(--${color});`">
            </div>
            <div v-if="percent > 2 / 3" class="slice"
                :style="`transform: rotate(150deg) skew(${slice3() < -30 ? -30 : slice3()}deg); background-color: var(--${color}); border-color: var(--${color});`">
            </div>
            <div class="mid" :id="withImage.toString()">
                <img v-if="withImage === true" :src="image" alt="Progress Fill" />
                <div class="after" :style="`background-color: var(--${color})`"></div>
            </div>
        </div>
        <div class="value">
            {{ current }}
        </div>
    </section>
</template>

<style scoped>
.circles {
    position: relative;
    min-width: 5rem;
    height: 5rem;
    margin: 1rem;
}

.circle {
    position: relative;
    min-width: 5rem;
    height: 5rem;
    background: var(--blue-400);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}

.slice {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    border: 1px solid;
}

.mid {
    position: absolute;
    width: 4rem;
    height: 4rem;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 50%;
    background-color: var(--light);
    display: grid;
    place-items: center;
}

.after {
    position: absolute;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    background-color: var(--primary);
    display: grid;
    place-items: center;
}

.mid img {
    width: 85%;
}

.value {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    width: 5rem;
    height: 5rem;
    font-weight: 700;
    color: var(--light);
    font-size: 1rem;
    display: grid;
    place-items: center;
    cursor: pointer;
}

.circle:hover+.value {
    display: grid;
}

.value:hover {
    display: grid;
}

.circle:hover {
    opacity: .8;
}

.circle:active {
    opacity: 1;
}
</style>