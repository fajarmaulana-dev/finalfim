<script setup lang="ts">
import { toRefs } from '@vue/reactivity';
const props = defineProps({
    fill: String,
    stroke: String,
    fill1: String,
    fill2: String,
    fill3: String,
    is: {
        type: String,
        default: 'ring'
    },
    width: {
        type: Number,
        default: 24
    },
})

const { fill, stroke, fill1, fill2, fill3, is, width } = toRefs(props);
const at = 'http://www.w3.org/2000/svg'
</script>

<template>
    <div :id="is">
        <svg v-if="is === 'lazy-ring'" :width="width" :height="width" :class="stroke" viewBox="0 0 24 24" :xmlns="at">
            <g class="spinner_V8m1">
                <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
            </g>
        </svg>
        <svg v-if="is === 'jump-dots'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <circle class="spinner_qM83" cx="4" cy="12" r="3" :class="fill" />
            <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" :class="fill" />
            <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" :class="fill" />
        </svg>
        <svg v-if="is === 'blocks'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" :class="fill1" />
            <rect class="spinner_9y7u spinner_DF2s" x="1" y="1" rx="1" width="10" height="10" :class="fill2" />
            <rect class="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10" :class="fill3" />
        </svg>
        <svg v-if="is === 'yin'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path class="spinner_0XTQ" :class="fill"
                d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" />
        </svg>
    </div>
</template>

<style scoped>
/* Ring */
.spinner_V8m1 {
    transform-origin: center;
    animation: spinner_zKoa 2s linear infinite
}

.spinner_V8m1 circle {
    stroke-linecap: round;
    animation: spinner_YpZS 1.5s ease-in-out infinite
}

@keyframes spinner_zKoa {
    100% {
        transform: rotate(360deg)
    }
}

@keyframes spinner_YpZS {
    0% {
        stroke-dasharray: 0 150;
        stroke-dashoffset: 0
    }

    47.5% {
        stroke-dasharray: 42 150;
        stroke-dashoffset: -16
    }

    95%,
    100% {
        stroke-dasharray: 42 150;
        stroke-dashoffset: -59
    }
}


/* Dots */
.spinner_qM83 {
    animation: spinner_8HQG 1.05s infinite
}

.spinner_oXPr {
    animation-delay: .1s
}

.spinner_ZTLf {
    animation-delay: .2s
}

@keyframes spinner_8HQG {

    0%,
    57.14% {
        animation-timing-function: cubic-bezier(0.33, .66, .66, 1);
        transform: translate(0)
    }

    28.57% {
        animation-timing-function: cubic-bezier(0.33, 0, .66, .33);
        transform: translateY(-6px)
    }

    100% {
        transform: translate(0)
    }
}

/* Bloks */
.spinner_9y7u {
    animation: spinner_fUkk 2.4s linear infinite;
    animation-delay: -2.4s
}

.spinner_DF2s {
    animation-delay: -1.6s
}

.spinner_q27e {
    animation-delay: -.8s
}

@keyframes spinner_fUkk {
    8.33% {
        x: 13px;
        y: 1px
    }

    25% {
        x: 13px;
        y: 1px
    }

    33.3% {
        x: 13px;
        y: 13px
    }

    50% {
        x: 13px;
        y: 13px
    }

    58.33% {
        x: 1px;
        y: 13px
    }

    75% {
        x: 1px;
        y: 13px
    }

    83.33% {
        x: 1px;
        y: 1px
    }
}

/* Yin */
.spinner_0XTQ {
    transform-origin: center;
    animation: spinner_y6GP .75s linear infinite
}

@keyframes spinner_y6GP {
    100% {
        transform: rotate(360deg)
    }
}
</style>