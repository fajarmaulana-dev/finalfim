<script setup>
import { toRefs, ref } from 'vue';
import router from '@/router/index';
import Spinner from '@/components/Spinner.vue';
import Overlay from '@/components/Overlay.vue'

const emit = defineEmits(['reset'])

const props = defineProps({
    is: String,
    ['quests']: Array,
    reset: Function,
    loading: Object
})

const { is, quests, reset, loading } = toRefs(props);
const move = (id) => setTimeout(() => { router.push(`/edit/${is.value}/${id}`) }, 10)

const modal = ref([
    { container: false, box: false }
])

const openModal = () => {
    modal.value[0].container = true;
    setTimeout(() => {
        modal.value[0].box = true;
    }, 100);
}

const closeModal = () => {
    modal.value[0].box = false;
    setTimeout(() => {
        modal.value[0].container = false;
    }, 300);

}

const edit = ref([...Array(25)].map((_, i) => false));
const hiden = ref([])
const editit = (i) => {
    hiden.value[i].click()
    edit.value[i] = false;
    closeModal();
}
</script>

<template>
    <div class="main">
        <h2 style="font-size: var(--title); line-height: 2rem; margin-bottom: 3rem;">Daftar Soal {{ is.toUpperCase() }}
        </h2>
        <Spinner v-if="loading.quest" is="bloks" :width="50" color1="primary" color2="warning" color3="error"
            style="position: absolute; top: 50%; left: 50%" />
        <div v-else v-for="quest in quests" :key="quest.id" style="min-height: 5rem; width: 90vw; margin-bottom: 3rem;">
            <div class="ql-toolbar"
                style="color: var(--light) !important; display: flex; align-items: center; justify-content: space-between; font-weight: 700; padding: .625rem .5rem;">
                No. {{ quest.index }}
                <div class="action" style="display: flex; flex-direction: row;">
                    <i v-if="!edit[quest.index - 1] && quest.question !== 'Soal belum dibuat.' && quest.question !== '<p>Soal belum dibuat.</p>'"
                        class="fa-solid fa-arrow-rotate-left" @click="edit[quest.index - 1] = true; openModal();"></i>
                    <i v-if="edit[quest.index - 1]" :ref="e => { hiden[quest.index - 1] = e }"
                        class="fa-solid fa-arrow-rotate-left"
                        @click="reset(quest.id, { question: 'Soal belum dibuat.', score: 30 })"></i>
                    <i class="fa-solid fa-pen-to-square" @click="move(quest.id)"></i>
                </div>
            </div>
            <div class="ql-container" style="min-height: 4rem; padding: .8rem .95rem">
                <div v-html="quest.question"></div>
            </div>
            <div class="score">Skor :
                <p style="margin-left: .5rem; width: 4rem; text-align: center; font-weight: 700;">
                    {{ quest.score }}</p>
            </div>
        </div>
    </div>
    <Overlay type="warning" :with-confirm="true" :container="modal[0].container" :box="modal[0].box"
        @close-modal="closeModal(); edit[edit.indexOf(true)] = false;" @confirm="editit(edit.indexOf(true))"
        title="Reset Soal" closeText="Jangan Reset" confirmText="Ya, Reset">Apakah kamu yakin ingin mereset soal nomor
        {{
        edit.indexOf(true) + 1
        }} ?
    </Overlay>
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

.dis-none {
    display: none;
}

.dis-block {
    display: block;
}

.score {
    display: flex;
    margin-top: .5rem;
    height: 1.5rem;
    align-items: center;
    font-weight: 700;
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

.action i {
    width: 1.75rem;
    height: 1.25rem;
    font-size: .85rem;
    border-radius: .25rem;
    color: var(--light);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: .5s;
    opacity: 1 !important;
}

.action i:hover {
    background-color: var(--blue-600);
}

.action i:active {
    background-color: var(--blue-700);
}
</style>

