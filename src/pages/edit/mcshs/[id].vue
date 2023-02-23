<script setup>
import { useSenior } from '@/composables/mcshs';
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

const { item, getItem, editItem, loading } = useSenior();
</script>

<template>
    <Formula is="mcshs" :quests="question" :update="editItem" :loading="loading" :id="route.params.id" />
</template>