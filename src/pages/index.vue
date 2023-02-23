<script setup>
import Main from '@/components/Main.vue'
import { useElementary } from '@/composables/mces';
import { onMounted } from 'vue';

onMounted(async () => {
    await getItems();
    await getAllContestants();
    await getMeta();
})

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useElementary();
</script>

<template>
    <Main is="mces" :meta="meta" :quests="items" :contestants="contestants" :bonus="20" :count-down="120" :minscore="5"
        :vioscore="10" :answer-item="answerItem" :edit-score="editScore" :up-res="upRes" :loading="loading"
        :reset-m="resetMeta" :reset-c="resetContestants" :reset-q="resetItems" />
</template>