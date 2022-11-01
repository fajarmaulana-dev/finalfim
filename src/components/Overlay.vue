<script setup>
import { computed, toRefs, watch, ref } from 'vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import success from '@/assets/circle-check-solid.svg'
import error from '@/assets/circle-exclamation-solid.svg'
import info from '@/assets/circle-info-solid.svg'
import warning from '@/assets/triangle-exclamation-solid.svg'
import csuccess from '@/assets/color-circle-check-solid.svg'
import cerror from '@/assets/color-circle-exclamation-solid.svg'
import cinfo from '@/assets/color-circle-info-solid.svg'
import cwarning from '@/assets/color-triangle-exclamation-solid.svg'

const emit = defineEmits(['openModal', 'openToast', 'closeModal', 'confirm'])
const props = defineProps({
    is: {
        type: String,
        default: 'modal'
    },
    container: {
        required: true,
        default: false
    },
    box: {
        required: true,
        default: false
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    clr: {
        type: String,
        default: 'primary'
    },
    img: String,
    type: {
        type: String,
        default: 'primary'
    },
    withConfirm: {
        default: false
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    closeText: {
        type: String,
        default: 'Cancel'
    }
})

const color = ref();
const image = ref();
const { is, container, box, title, message, clr, img, type, withConfirm, confirmText, closeText } = toRefs(props);
watch(img, () => image.value = img.value);
watch(clr, () => color.value = clr.value);
const typeColor = computed(() => {
    if (type.value === 'success') { return color.value = 'success' };
    if (type.value === 'warning') { return color.value = 'warning' };
    if (type.value === 'error') { return color.value = 'error' };
    if (type.value === 'primary') { return color.value = 'primary' };
})

// const base_drive = (id) => `https://drive.google.com/uc?export=view&id=${id}`
const typeToastImage = computed(() => {
    if (type.value === 'success') { return image.value = success };
    if (type.value === 'warning') { return image.value = warning };
    if (type.value === 'error') { return image.value = error };
    if (type.value === 'primary') { return image.value = info };
})

const typeModalImage = computed(() => {
    if (type.value === 'success') return image.value = csuccess;
    if (type.value === 'warning') return image.value = cwarning;
    if (type.value === 'error') return image.value = cerror;
    if (type.value === 'primary') return image.value = cinfo;
})

const col = `flex-direction: column; text-align: center;`;
</script>

<template>
    <div :id="is">
        <section v-if="is === 'modal'" class="overlay" :id="type"
            style="background-color: var(--blue-trans);justify-content: center; align-items: center;"
            :class="{ 'dis-none': !container, 'dis-flex': container }">
            <Card style="width: 85vw; max-width: 30rem;" footer-style="width: 100%; margin: 1.5rem 0 .5rem;"
                :content-style="`${col} width: 100%;`" is="form" :class="{ 'modal-disapp': !box, 'modal-app': box }">
                <template #header>
                    <img :src="typeModalImage" alt="Type Indicator" style="min-width: 6rem;" class="gridcardImg" />
                </template>
                <template #body>
                    <p style="font-weight: 700; font-size: 1.25rem;">{{ title }}</p>
                    <p style="margin-top: .5rem; font-size: 1rem;">
                        <slot></slot>
                    </p>
                </template>
                <template #footer>
                    <Button v-if="withConfirm === true" :round="true" :color="type"
                        style="margin-right: .6rem; width: 100%; height: 100%;" @click="$emit('confirm')">
                        {{ confirmText }}</Button>
                    <Button :color="type" :round="true" :dismiss="true" style="width: 100%; height: 100%;"
                        @click="$emit('closeModal')">{{ closeText }}</Button>
                </template>
            </Card>
        </section>
        <section v-if="is === 'toast'" class="overlay" :id="type"
            :class="{ 'dis-none': !container, 'dis-flex': container }"
            style=" justify-content: end; align-items: flex-end; transform: translate(-2rem, -1.5rem);">
            <section class="toast" :class="{ 'toast-disapp': !box, 'toast-app': box }"
                :style="`background-color: var(--${typeColor}) !important;`">
                <img :src="typeToastImage" alt="toast" class="pre-toast">
                <span>{{ message }}</span>
            </section>
        </section>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    z-index: 102;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.modal-app {
    transform: scale(1);
}

.modal-disapp {
    transform: scale(0);
}

.dis-flex {
    display: flex;
}

.dis-none {
    display: none;
}

.toast {
    color: var(--light);
    font-weight: 700;
    padding: .5rem .75rem;
    border-radius: .5rem;
    max-width: 13rem;
    min-width: 20vw;
    min-height: 3rem;
    display: flex;
    transition: transform .5s;
    transform: translateY(5.25rem);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.toast span {
    width: calc(100% - 2.75rem);
    line-height: 1.4rem;
    display: flex;
    align-items: center;
    color: var(--light);
}

.pre-toast {
    margin-right: 1rem;
    height: 1.75rem;
}

.toast-app {
    transform: translateY(-2.5rem);
}

.toast-disapp {
    transform: translateY(10rem);
}
</style>