<script setup>
import { toRefs } from 'vue'
const emit = defineEmits(['save', 'cancel']);

const props = defineProps({
    disable: {
        type: Boolean,
        default: false
    }
})

const { disable } = toRefs(props)
</script>

<template>
    <div id="rich">
        <span class="ql-formats" style="color: var(--light); font-weight: 700;">
            <slot></slot>
        </span>
        <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-blockquote"></button>
            <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-header" value="1"></button>
            <button class="ql-header" value="2"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-align" value="right"></button>
            <button class="ql-align" value="center"></button>
            <button class="ql-align" value="justify"></button>
            <button class="ql-direction" value="rtl"></button>
            <button class="ql-indent" value="-1"></button>
            <button class="ql-indent" value="+1"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-link"></button>
            <button class="ql-video"></button>
            <button class="ql-image"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-formula"></button>
            <button @click="$emit('save')" :class="{disabled: disable}" style="color: var(--light)">
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
            <button @click="$emit('cancel')" style="color: var(--light); font-weight: 700; width: max-content;">Batal
                Edit</button>
        </span>
    </div>
</template>

<style scoped>
.ql-formats:deep(.disabled),
.ql-formats:deep(.disabled):hover,
.ql-formats:deep(.disabled):active {
    background-color: var(--primary) !important;
    color: var(--blue-700) !important;
    cursor: not-allowed !important;
}

.ql-formats:deep(.ql-stroke:not(.ql-color-label)) {
    stroke: var(--light);
}

.ql-formats:deep(.ql-active .ql-stroke:not(.ql-color-label)) {
    stroke: var(--light) !important;
}

.ql-formats:deep(.ql-picker-options line) {
    stroke: var(--primary) !important;
}

.ql-formats:deep(.ql-picker-options span) {
    color: var(--primary) !important;
}

.ql-formats:deep(.ql-fill) {
    fill: var(--light)
}

.ql-formats:deep(.ql-active .ql-fill) {
    fill: var(--light) !important;
}

.ql-formats:deep(.ql-picker-label) {
    color: var(--light) !important;
}

.ql-formats:deep(span),
.ql-formats:deep(button) {
    border-radius: .25rem;
    transition: .5s;
}

.ql-formats:deep(.ql-picker-label):hover,
.ql-formats:deep(button):hover {
    background-color: var(--blue-600) !important;
}

.ql-formats:deep(.ql-active) {
    background-color: var(--blue-700) !important;
}

.ql-formats:deep(.ql-picker-label):active,
.ql-formats:deep(button):active {
    background-color: var(--blue-700) !important;
}

.ql-formats:deep(.ql-active):active {
    background-color: var(--blue-600) !important;
}
</style>