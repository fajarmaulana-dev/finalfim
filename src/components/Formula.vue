<script setup>
import router from '@/router';
import ImageResize from 'quill-image-resize-vue';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import Rich from '@/components/Rich.vue';
import Spinner from '@/components/Spinner.vue';
import { toRefs } from 'vue';

const modules = [
    { name: 'imageResize', module: ImageResize },
    { name: 'quillImageDropAndPaste', module: QuillImageDropAndPaste }
]

const props = defineProps({
    is: String,
    ['quests']: Array,
    update: Function,
    loading: Object,
    id: String
})

const { is, quests, update, loading, id } = toRefs(props)

const onSave = (param) => {
    param;
    setTimeout(() => {
        router.push(`/edit/${is.value}`);
    }, 1000)
}
</script>

<template>
    <div class="main" :id="is">
        <h2 style="font-size: var(--title); line-height: 2rem; margin-bottom: 3rem;">Edit Soal {{ is.toUpperCase() }}
        </h2>
        <Spinner v-if="loading.quest" is="bloks" :width="50" color1="primary" color2="warning" color3="error"
            style="position: absolute; top: 50%; left: 50%" />
        <div v-else v-for="quest in quests" :key="quest.id" style="min-height: 5rem; width: 90vw; margin-bottom: 3rem;">
            <QuillEditor theme="snow" toolbar="#rich" v-model:content="quest.question" contentType="html"
                :modules="modules" placeholder="Ketikkan soal disini ..." spellcheck="false">
                <template #toolbar>
                    <Rich :disable="quest.question === '<p><br></p>' || quest.score.toString().length !== 2"
                        @save="quest.question === '<p><br></p>' || quest.score.toString().length !== 2 ? false : onSave(update(id, { question: quests[0].question, score: quests[0].score }))"
                        @cancel="router.push(`/edit/${is}`)">
                        No. {{ quest.index }}
                    </Rich>
                </template>
            </QuillEditor>
            <div class="score">Skor :
                <input type="text" class="i-label" v-model.number="quest.score" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 7rem 0;
}

.score {
    display: flex;
    margin-top: .5rem;
    height: 1.5rem;
    align-items: center;
    font-weight: 700;
}

.i-label {
    height: 100%;
    width: 4rem;
    text-align: center;
    margin-left: .5rem;
    font-weight: 700;
    -webkit-text-fill-color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: .5rem;
    outline: none;
    color: var(--primary);
    transition: background-color 9999s ease-in-out 0s;
}

.i-label:hover,
.i-label:focus {
    border-width: 2px;
}

:deep(.ql-toolbar) {
    background-color: var(--primary);
    border: 2px solid var(--primary) !important;
    border-radius: .25rem .25rem 0 0;
}

:deep(.ql-container) {
    background-color: var(--light);
    border: 2px solid var(--primary) !important;
    border-top: none !important;
    border-radius: 0 0 .25rem .25rem;
    font-size: 1rem;
    min-height: 4rem;
}

@media all and (min-width: 433px) {
    :deep(.ql-editing) {
        left: 0.75rem !important;
        top: 0rem !important;
        width: 85vw;
    }

    :deep(.ql-editing input) {
        min-width: calc(85vw - 15rem);
    }
}

:deep(.ql-editing) {
    left: 0.75rem !important;
    top: 0rem !important;
}

:deep(.ql-editing input) {
    max-width: 20vw;
}
</style>