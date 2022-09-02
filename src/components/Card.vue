<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    prependStyle: {
        type: String,
        required: false,
        default: '',
    },
    appendStyle: {
        type: String,
        required: false,
        default: '',
    },
    headerStyle: {
        type: String,
        required: false,
        default: '',
    },
    bodyStyle: {
        type: String,
        required: false,
        default: '',
    },
    footerStyle: {
        type: String,
        required: false,
        default: '',
    },
    contentStyle: {
        type: String,
        required: false,
        default: '',
    },
    is: {
        type: String,
        required: false,
        default: '',
    },
    animation: {
        type: Boolean,
        required: false,
        default: false,
    }
})
const { prependStyle, appendStyle, headerStyle, bodyStyle, footerStyle, contentStyle, is, animation } = toRefs(props);

// card default assets
// const col = `flex-direction: column; text-align: center;`;
// const indexVariant = `background-image: url('src/assets/keping.png'); background-repeat: no-repeat; background-size: contain; align-items: flex-start !important; min-width: 2.5rem; color: var(--primary);`;
// const variant = `${indexVariant} background-image: url('src/assets/keping1.png'); align-items: flex-end !important; background-position: bottom;`;
// const headerQuest = `font-size: 1.5rem; color: var(--primary); font-weight: 600; margin: 1rem 0;`;
// const footerLogin = `text-align: start !important; line-height: 1.2rem; color: var(--primary); margin-top: 1.5rem; width: 100%;`;
</script>

<template>
    <section class="card" :id="is" :class="{ animation: animation }">
        <div class="prepend" :style="prependStyle">
            <!-- use <span class="indexSpan">7</span> in slot for quest mode -->
            <slot name="prepend"></slot>
        </div>
        <div class="content" :style="contentStyle">
            <div class="header" :style="headerStyle">
                <slot name="header"></slot>
            </div>
            <div class="body" :style="bodyStyle">
                <slot name="body"></slot>
            </div>
            <div class="footer" :style="footerStyle">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="append" :style="appendStyle">
            <!-- use <span class="indexSpan variantSpan">P</span> in slot for quest mode -->
            <slot name="append"></slot>
        </div>
    </section>
</template>

<style scoped>
.card {
    padding: 1rem;
    width: 100%;
    background-color: var(--light);
    border: 1px solid var(--cloud);
    box-shadow: 0 0 8px 2px var(--blue-400);
    border-radius: 5px;
    color: var(--gray-600);
    display: flex;
    transition: transform .5s;
    line-height: 1.2rem;
}

.animation:not(#form):hover {
    transform: scale(1.03);
}

.animation:not(#form):active {
    transform: scale(.97);
}

.prepend,
.append,
.header,
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    min-width: calc(100% - 7rem);
    display: flex;
    align-items: center;
}

.prepend,
.append {
    font-weight: 700;
}

.footer i {
    margin: 1.5rem 1rem 0 1rem;
    font-size: var(--icon);
}

#quest {
    padding: 0 !important;
    border: none !important;
    min-width: calc(95rem/8) !important;
    height: calc(95rem/8) !important;
    line-height: 1.1rem !important;
}

#form {
    transition: .3s !important;
}
</style>