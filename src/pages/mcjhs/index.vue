<script setup>
import { onMounted } from 'vue';
import Main from '@/components/Main.vue'
import { useJunior } from '@/composables/mcjhs';

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, upLess, upMod, upDiag, loading } = useJunior();

onMounted(async () => {
    await getItems();
    await getAllContestants();
    await getMeta();
})
</script>

<template>
    <Main is="mcjhs" title="Mathematics Competition for Junior High School" :meta="meta    " :quests="items"
        :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" :answer-item="answerItem"
        :edit-score="editScore" :up-res="upRes" :loading="loading" />
</template>