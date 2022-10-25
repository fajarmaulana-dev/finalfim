<script setup>
import { toRefs } from 'vue';
import router from '@/router/index'

const emit = defineEmits(['reset'])

const props = defineProps({
    is: String,
    ['quests']: Array,
    reset: Function,
})

const { is, quests, reset } = toRefs(props);
const move = (id) => setTimeout(() => { router.push(`/edit/${is.value}/${id}`) }, 1000)
</script>

<template>
    <div class="main">
        <h2 style="font-size: var(--title); line-height: 2rem; margin-bottom: 3rem;">Daftar Soal {{ is.toUpperCase() }}
        </h2>
        <div v-for="quest in quests" :key="quest.id" style="min-height: 5rem; width: 90vw; margin-bottom: 3rem;">
            <div class="ql-toolbar"
                style="color: var(--light) !important; display: flex; align-items: center; justify-content: space-between; font-weight: 700; padding: .625rem .5rem;">
                No. {{ quest.index }}
                <div class="action" style="display: flex; flex-direction: row;">
                    <i class="fa-solid fa-arrow-rotate-left"
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

