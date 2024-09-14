<script setup lang="ts">
import { ref, computed, reactive, toRefs } from '@vue/reactivity';
import { watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import Rich from './Rich.vue';
import Modal from './Modal.vue';
import ImageResize from 'quill-image-resize-vue';
import { ImageDrop } from 'quill-image-drop-module';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'

const modules = [
    { name: 'imageResize', module: ImageResize },
    { name: 'imageDrop', module: ImageDrop },
    { name: 'quillImageDropAndPaste', module: QuillImageDropAndPaste },
]

const emit = defineEmits(['update'])
const props = defineProps({
    id: String,
    is: {
        type: String,
        default: 'mces'
    },
    ['data']: Object,
    loading: {
        type: Boolean,
        default: false
    },
})

const { id, is, data, loading } = toRefs(props)

const router = useRouter()
const temp: any = computed(() => data?.value)
const quest = ref('')
const point = ref(30)
watch(temp, () => {
    quest.value = temp.value.question;
    point.value = temp.value.point
})
const modal: any = reactive({ info: false, warning: false })
const title: any = { info: 'Perbarui Soal', warning: 'Batalkan Editan' }

const update = () => emit('update', { point: point.value, question: quest.value })
const re = /(<span contenteditable="false">)|(<\/span>)|(﻿)|(( alt="quill-image-)\d+")/g
const same = computed(() => temp.value?.question.replace(re, '') == quest.value.replace(re, ''))
const invalid = computed(() => ((typeof point.value !== 'number') || point.value < 1) || (quest.value === '<p><br></p>'))
</script>

<template>
    <div class="viet px-[calc(.5rem+4vw)] py-[calc(4rem+4vw)]">
        <p class="text-2xl text-center font-extrabold text-sky-600 mb-[calc(1.25rem+1vw)]">
            Edit Soal {{ is.toUpperCase() }}</p>
        <div>
            <QuillEditor
                class="basic !border-2 !border-sky-600 !bg-slate-50 [&_*]:!text-sky-600 !rounded-b-md !min-h-[2rem] !border-t-0"
                theme="snow" toolbar="#rich" v-model:content="quest" contentType="html" :modules="modules"
                :placeholder="`Edit soal ${is.toUpperCase()} nomor ${id} disini ...`" id="richeditor" name="richeditor"
                spellcheck="false">
                <template #toolbar>
                    <Rich @save="modal.info = true"
                        @cancel="same ? router.replace(`/edit?sch=${is}`) : modal.warning = true" saver :title="`No. ${id}`"
                        :disabled="(invalid as boolean) || (same as boolean)" :loading="loading" />
                </template>
            </QuillEditor>
            <section class="font-bold mt-2 text-sky-600 flex items-center gap-3">
                <label for="pointeditor">Poin :</label>
                <input type="text" v-model.number="point" id="pointeditor" name="pointeditor"
                    class="text-sky-600 tracking-wider text-center border-sky-600 rounded-md w-[4rem] px-2 py-[.15rem] text-[0.85rem] hover:border-sky-700 focus:ring-sky-500 focus:border-sky-600 outline-none border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50">
            </section>
            <span v-if="(typeof point !== 'number') || point < 1 || quest === '<p><br></p>'"
                class="text-xs text-rose-600 font-bold">{{ quest == '<p><br></p>' ?
                    'Isian tidak boleh kosong' : 'Nilai poin harus bertipe bilangan bulat positif' }}
            </span>
        </div>
    </div>
    <Modal v-for="txt, i in ['info', 'warning']" :is="txt" v-model="modal[txt]" :title="title[txt]"
        @confirm="txt == 'info' ? update() : router.replace(`/edit?sch=${is}`)"
        :confirm-text="`Ya, ${txt == 'info' ? 'Perbarui' : 'Batalkan'}`" close-text="Edit Lagi">
        <span v-if="txt == 'warning'">Apakah kamu yakin ingin membatalkan editanmu saat ini ?</span>
        <span v-else>Apakah kamu yakin ingin memperbarui<br /><b>"Soal {{ is.toUpperCase() }} nomor {{ id
        }}"</b> ini ?</span>
    </Modal>
</template>

<style scoped>
@media all and (min-width: 540px) {
    :deep(.ql-editing) {
        width: 80vw;
    }

    :deep(.ql-editing input) {
        min-width: calc(80vw - 15rem);
    }
}

:deep(.ql-editing) {
    left: 0.75rem !important;
    top: -0.4rem !important;
}

:deep(.ql-editor) {
    min-height: 4.25rem;
}

:deep(.ql-editing input) {
    max-width: 20vw;
    font-size: .9rem !important;
}

.basic,
.basic * {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif !important;
}
</style>