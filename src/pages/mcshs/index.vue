<script setup>
import { onMounted } from 'vue';
import Main from '@/components/Main.vue'
import { useSenior } from '@/composables/mcshs';

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, upLess, upMod, upDiag } = useSenior();

onMounted(async () => {
    await getItems();
    await getAllContestants();
    await getMeta();
})
</script>

<template>
    <Main is="mcshs" title="Mathematics Competition for Senior High School" :meta="meta" :quests="items"
        :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" :answer-item="answerItem"
        :edit-score="editScore" :up-res="upRes" :up-less="upLess" :up-mod="upMod" :up-diag="upDiag" />
</template>