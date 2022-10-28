<script setup>
import { onMounted } from 'vue';
import Main from '@/components/Main.vue'
import { useElementary } from '@/composables/mces';

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useElementary();

onMounted(async () => {
    await getItems();
    await getAllContestants();
    await getMeta();
})
</script>

<template>
    <Main is="mces" :meta="meta" :quests="items" :contestants="contestants" :bonus="20" :count-down="120" :minscore="5"
        :vioscore="10" :answer-item="answerItem" :edit-score="editScore" :up-res="upRes" :loading="loading"
        :reset-m="resetMeta" :reset-c="resetContestants" :reset-q="resetItems" />
</template>