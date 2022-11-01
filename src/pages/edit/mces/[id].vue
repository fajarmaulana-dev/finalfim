<script setup>
import { useElementary } from '@/composables/mces';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import router from '../../../router';
import { useRoute } from 'vue-router';
import katex from 'katex';
import ImageResize from 'quill-image-resize-vue';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import Rich from '@/components/Rich.vue';
import Spinner from '@/components/Spinner.vue';
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";

const user = TokenService.getUser()
const route = useRoute();

const modules = [
    { name: 'imageResize', module: ImageResize },
    { name: 'quillImageDropAndPaste', module: QuillImageDropAndPaste }
]

const question = ref()

onMounted(async () => {
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    window.katex = katex
    await getItem(route.params.id);
    question.value = [item.value]
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { item, getItem, editItem, loading } = useElementary();

const onSave = async (question, score) => {
    editItem(route.params.id, { question, score });
    setTimeout(() => {
        router.push('/edit/mces');
    }, 1000)
}
</script>

<template>
    <div class="main">
        <h2 style="font-size: var(--title); line-height: 2rem; margin-bottom: 3rem;">Edit Soal MCES</h2>
        <Spinner v-if="loading.quest" is="bloks" :width="50" color1="primary" color2="warning" color3="error"
            style="position: absolute; top: 50%; left: 50%" />
        <div v-else v-for="quest in question" :key="quest.id"
            style="min-height: 5rem; width: 90vw; margin-bottom: 3rem;">
            <QuillEditor theme="snow" toolbar="#rich" v-model:content="quest.question" contentType="html"
                :modules="modules" placeholder="Ketikkan soal disini ..." spellcheck="false">
                <template #toolbar>
                    <Rich :disable="quest.question === '<p><br></p>' || quest.score.toString().length !== 2"
                        @save="quest.question === '<p><br></p>' || quest.score.toString().length !== 2 ? false : onSave(question[0].question, question[0].score)"
                        @cancel="router.push('/edit/mces')">
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