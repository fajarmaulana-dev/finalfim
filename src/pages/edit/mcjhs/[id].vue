<script setup>
import { useJunior } from '@/composables/mcjhs';
import { ref, onMounted } from 'vue';
import katex from 'katex';
import Formula from '@/components/Formula.vue'
import { useRoute } from 'vue-router';
const route = useRoute();

const question = ref()

onMounted(async () => {
    window.katex = katex
    await getItem(route.params.id);
    question.value = [item.value]
})

const { item, getItem, editItem, loading } = useJunior();
</script>

<template>
    <Formula is="mcjhs" :quests="question" :update="editItem" :loading="loading" :id="route.params.id" />
</template>