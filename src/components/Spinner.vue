<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    color: String,
    color1: String,
    color2: String,
    color3: String,
    is: {
        type: String,
        default: 'ring'
    },
    width: {
        type: Number,
        default: 24
    },
})

const { color, color1, color2, color3, is, width } = toRefs(props);
const at = 'http://www.w3.org/2000/svg'
</script>

<template>
    <div :id="is">
        <svg v-if="is === 'ring'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path :fill="`var(--${color})`"
                d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                class="spinner_6kVp" />
        </svg>
        <svg v-if="is === 'lazy-ring'" :width="width" :height="width" :stroke="`var(--${color})`" viewBox="0 0 24 24"
            :xmlns="at">
            <g class="spinner_V8m1">
                <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
            </g>
        </svg>
        <svg v-if="is === 'jump-dots'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <circle class="spinner_qM83" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'slide-dots'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <circle class="spinner_nOfF" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_nOfF spinner_fVhf" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_nOfF spinner_piVe" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_nOfF spinner_MSNs" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'scale-dots'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <circle class="spinner_b2T7" cx="4" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3" :fill="`var(--${color})`" />
            <circle class="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3" :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'play'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <g class="spinner_OSmW">
                <rect x="11" y="1" width="2" height="5" opacity=".14" :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"
                    :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"
                    :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"
                    :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"
                    :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"
                    :fill="`var(--${color})`" />
                <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" :fill="`var(--${color})`" />
            </g>
        </svg>
        <svg v-if="is === 'bloks'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" :fill="`var(--${color1})`" />
            <rect class="spinner_9y7u spinner_DF2s" x="1" y="1" rx="1" width="10" height="10"
                :fill="`var(--${color2})`" />
            <rect class="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10"
                :fill="`var(--${color3})`" />
        </svg>
        <svg v-if="is === 'pulse'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <circle class="spinner_ZCsl" cx="12" cy="12" r="0" :fill="`var(--${color})`" />
            <circle class="spinner_ZCsl spinner_gaIW" cx="12" cy="12" r="0" :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'water-pulse'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path class="spinner_l9ve" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                transform="translate(12, 12) scale(0)" :fill="`var(--${color})`" />
            <path class="spinner_l9ve spinner_cMYp"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                transform="translate(12, 12) scale(0)" :fill="`var(--${color})`" />
            <path class="spinner_l9ve spinner_gHR3"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                transform="translate(12, 12) scale(0)" :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'clock'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                :fill="`var(--${color})`" />
            <rect class="spinner_d9Sa spinner_qQQY" x="11" y="6" rx="1" width="2" height="7"
                :fill="`var(--${color})`" />
            <rect class="spinner_d9Sa spinner_pote" x="11" y="11" rx="1" width="2" height="9"
                :fill="`var(--${color})`" />
        </svg>
        <svg v-if="is === 'yin'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path class="spinner_0XTQ" :fill="`var(--${color})`"
                d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" />
        </svg>
        <svg v-if="is === 'signal'" :width="width" :height="width" viewBox="0 0 24 24" :xmlns="at">
            <path class="spinner_kpYo" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21"
                opacity="0" :fill="`var(--${color})`" />
            <path class="spinner_kpYo spinner_Esax"
                d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z"
                opacity="0" :fill="`var(--${color})`" />
            <path class="spinner_kpYo spinner_o8QU"
                d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3"
                opacity="0" :fill="`var(--${color})`" />
        </svg>
        <span v-if="is === 'ping'" style="display: flex; position: relative"
            :style="`height: ${width}rem; width: ${width}rem`">
            <span class="ping" :style="`background-color: var(--${color}-600)`"></span>
            <span class="ping-container" :style="`background-color: var(--${color}-500)`"></span>
        </span>
    </div>
</template>

<style scoped>
/* Ring */
.spinner_6kVp {
    transform-origin: center;
    animation: spinner_irSm .75s infinite linear
}

@keyframes spinner_irSm {
    100% {
        transform: rotate(360deg)
    }
}

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

.spinner_nOfF {
    animation: spinner_qtyZ 2s cubic-bezier(0.36, .6, .31, 1) infinite
}

.spinner_fVhf {
    animation-delay: -.5s
}

.spinner_piVe {
    animation-delay: -1s
}

.spinner_MSNs {
    animation-delay: -1.5s
}

@keyframes spinner_qtyZ {
    0% {
        r: 0
    }

    25% {
        r: 3px;
        cx: 4px
    }

    50% {
        r: 3px;
        cx: 12px
    }

    75% {
        r: 3px;
        cx: 20px
    }

    100% {
        r: 0;
        cx: 20px
    }
}

.spinner_b2T7 {
    animation: spinner_xe7Q .8s linear infinite
}

.spinner_YRVV {
    animation-delay: -.65s
}

.spinner_c9oY {
    animation-delay: -.5s
}

@keyframes spinner_xe7Q {

    93.75%,
    100% {
        r: 3px
    }

    46.875% {
        r: .2px
    }
}

/* Play */
.spinner_OSmW {
    transform-origin: center;
    animation: spinner_T6mA .75s step-end infinite
}

@keyframes spinner_T6mA {
    8.3% {
        transform: rotate(30deg)
    }

    16.6% {
        transform: rotate(60deg)
    }

    25% {
        transform: rotate(90deg)
    }

    33.3% {
        transform: rotate(120deg)
    }

    41.6% {
        transform: rotate(150deg)
    }

    50% {
        transform: rotate(180deg)
    }

    58.3% {
        transform: rotate(210deg)
    }

    66.6% {
        transform: rotate(240deg)
    }

    75% {
        transform: rotate(270deg)
    }

    83.3% {
        transform: rotate(300deg)
    }

    91.6% {
        transform: rotate(330deg)
    }

    100% {
        transform: rotate(360deg)
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

/* Pulse */
.spinner_ZCsl {
    animation: spinner_qV4G 1.25s cubic-bezier(0.52, .6, .25, .99) infinite;
}

.spinner_gaIW {
    animation-delay: .6s
}

@keyframes spinner_qV4G {
    0% {
        r: 0;
        opacity: 1
    }

    100% {
        r: 11px;
        opacity: 0
    }
}

.spinner_l9ve {
    animation: spinner_rcyq 1.2s cubic-bezier(0.52, .6, .25, .99) infinite
}

.spinner_cMYp {
    animation-delay: .4s
}

.spinner_gHR3 {
    animation-delay: .8s
}

@keyframes spinner_rcyq {
    0% {
        transform: translate(12px, 12px) scale(0);
        opacity: 1
    }

    100% {
        transform: translate(0, 0) scale(1);
        opacity: 0
    }
}

/* Clock */
.spinner_d9Sa {
    transform-origin: center
}

.spinner_qQQY {
    animation: spinner_ZpfF 9s linear infinite
}

.spinner_pote {
    animation: spinner_ZpfF .75s linear infinite
}

@keyframes spinner_ZpfF {
    100% {
        transform: rotate(360deg)
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

/* Signal */
.spinner_kpYo {
    animation: spinner_cQNQ 1.55s linear infinite
}

.spinner_Esax {
    animation: spinner_sZau 1.55s linear infinite
}

.spinner_o8QU {
    animation: spinner_aBcq 1.55s linear infinite
}

@keyframes spinner_cQNQ {

    0%,
    87.1%,
    100% {
        opacity: 0
    }

    16.13%,
    80.65% {
        opacity: 1
    }
}

@keyframes spinner_sZau {

    0%,
    16.13%,
    87.1%,
    100% {
        opacity: 0
    }

    32.26%,
    80.65% {
        opacity: 1
    }
}

@keyframes spinner_aBcq {

    0%,
    32.26%,
    87.1%,
    100% {
        opacity: 0
    }

    48.39%,
    80.65% {
        opacity: 1
    }
}

/* Ping */
.ping {
    position: absolute;
    display: inline-flex;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: .75;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {

    75%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.ping-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-flex;
    border-radius: 50%;
    border: .1rem solid var(--light);
}
</style>