<script setup lang="ts">
import { ref, toRefs } from '@vue/reactivity';
import { watch } from '@vue/runtime-core'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    is: {
        type: String,
        default: 'info'
    },
    text: {
        type: String,
        default: 'Pengguna berhasil dihapus'
    },
    modelValue: {
        type: Boolean,
        default: false
    },
})

const { is, text, modelValue } = toRefs(props);

const style = ref()
const ico = ref()

const container = ref(false);
const box = ref(false)

const openToast = () => {
    container.value = true
    setTimeout(() => {
        box.value = true;
    }, 100)
    setTimeout(() => {
        box.value = false;
    }, 2500);
    setTimeout(() => {
        container.value = false;
    }, 3100);
}

// const hardClose = () => {
//     box.value = false
//     setTimeout(() => {
//         container.value = false;
//     }, 600);
// }

watch(modelValue, () => {
    if (modelValue.value === true) {
        openToast();
        emit('update:modelValue', false)
    }
})

if (is.value === 'success') {
    style.value = 'bg-emerald-200 text-emerald-800 border-emerald-800'; ico.value = 'circle-check';
} if (is.value === 'error') {
    style.value = 'bg-rose-200 text-rose-800 border-rose-800'; ico.value = 'circle-exclamation';
} if (is.value === 'info') {
    style.value = 'bg-sky-200 text-sky-800 border-sky-800'; ico.value = 'circle-info'
} if (is.value === 'warning') {
    style.value = 'bg-amber-200 text-amber-800 border-amber-800'; ico.value = 'triangle-exclamation'
}
</script>

<template>
    <section class="fixed z-[70] items-end justify-end bottom-0 left-0 w-full" :class="container ? 'flex' : 'hidden'">
        <div :class="[style, box ? 'trans' : 'translate-y-[100%]']" style="transition: .5s;"
            class="w-fit max-w-[15rem] sm:max-w-[29rem] font-bold border-[.15rem] py-[0.375rem] px-3 rounded-md flex items-center gap-3 -translate-x-4">
            <i :class="`fa-solid fa-${ico}`" class=" text-2xl"></i>
            <span>{{ text }}</span>
        </div>
    </section>
</template>

<style scoped>
.trans {
    transform: translate(-1rem, -1rem) !important;
}
</style>