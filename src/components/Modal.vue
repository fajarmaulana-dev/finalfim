<script setup lang="ts">
import { ref, toRefs } from '@vue/reactivity';
import { watch } from '@vue/runtime-core'

const emit = defineEmits(['update:modelValue', 'confirm', 'close']);
const props = defineProps({
    is: {
        type: String,
        default: 'error'
    },
    title: {
        type: String,
        default: 'Hapus Pengguna'
    },
    withConfirm: {
        default: true
    },
    confirmText: {
        type: String,
        default: 'Ya, Hapus'
    },
    closeText: {
        type: String,
        default: 'Jangan Hapus'
    },
    modelValue: {
        type: Boolean,
        default: false
    },
})

const { is, title, withConfirm, confirmText, closeText, modelValue } = toRefs(props);

const text = ref()
const button = ref()
const ico = ref()

const container = ref(false);
const box = ref(false)

const openModal = () => {
    container.value = true;
    setTimeout(() => {
        box.value = true;
    }, 100);
};

watch(modelValue, () => {
    if (modelValue.value === true) {
        openModal()
    }
})

const closeModal = () => {
    emit('update:modelValue', false)
    box.value = false;
    setTimeout(() => {
        container.value = false;
    }, 200);
};

if (is.value === 'success') {
    button.value = 'from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 active:from-emerald-400 active:to-emerald-600';
    text.value = 'text-emerald-600';
    ico.value = 'circle-check';
} if (is.value === 'error') {
    button.value = 'from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 active:from-rose-400 active:to-rose-600';
    text.value = 'text-rose-600';
    ico.value = 'circle-exclamation';
} if (is.value === 'info') {
    button.value = 'from-sky-400 to-sky-600 hover:from-sky-600 hover:to-sky-700 active:from-sky-400 active:to-sky-600';
    text.value = 'text-sky-600';
    ico.value = 'circle-info'
} if (is.value === 'warning') {
    button.value = 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-500 active:to-amber-600';
    text.value = 'text-amber-600';
    ico.value = 'triangle-exclamation'
}
</script>

<template>
    <section class="fixed inset-0 z-[70] place-items-center bg-[#bae5fd46]" :class="container ? 'grid' : 'hidden'">
        <div class="w-[72vw] max-w-[23rem] lg:max-w-[27rem] bg-sky-50 shadow-[0_0_8px_2px] shadow-sky-300 rounded-md p-[calc(.6rem+.6vw)] flex flex-col gap-[calc(.75rem+.75vw)]"
            :class="box ? 'scale-100' : 'scale-0'" style="transition: .2s;">
            <div class="w-full grid place-items-center [&>i]:text-[calc(4.5rem+1.5vw)]" :class="text">
                <i :class="`fa-solid fa-${ico}`"></i>
            </div>
            <div class="flex flex-col items-center justify-center gap-[calc(.1rem+.1vw)]">
                <span class="text-center font-bold text-xl" :class="text">
                    {{ title }}</span>
                <span class="text-center text-slate-800 text-sm">
                    <slot></slot>
                </span>
            </div>
            <div
                class="flex gap-[calc(.6rem+.6vw)] [&>*]:p-2 [&>*]:rounded [&>*]:w-full [&>*]:bg-gradient-to-b [&>*]:font-bold [&>*]:text-white">
                <button v-if="withConfirm" :class="button" @click="$emit('confirm'); closeModal()">
                    {{ confirmText }}</button>
                <button @click="closeModal(); emit('close')"
                    :class="withConfirm ? 'from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700 active:from-slate-400 active:to-slate-600' : button">
                    {{ closeText }}</button>
            </div>
        </div>
    </section>
</template>