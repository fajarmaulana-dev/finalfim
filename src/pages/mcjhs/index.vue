<script setup>
import Main from '@/components/Main.vue'
import { useJunior } from '@/composables/mcjhs';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

onMounted(async () => {
    await getItems();
    await getAllContestants();
    await getMeta();
})

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useJunior();
</script>

<template>
    <Main is="mcjhs" title="Mathematics Competition for Junior High School" :meta="meta" :quests="items"
        :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" :answer-item="answerItem"
        :edit-score="editScore" :up-res="upRes" :loading="loading" :reset-m="resetMeta" :reset-c="resetContestants"
        :reset-q="resetItems" />
</template>