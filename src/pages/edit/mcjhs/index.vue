<script setup>
import { onMounted } from 'vue';
import Edit from '@/components/Edit.vue';
import { useJunior } from '@/composables/mcjhs';

const { items, getItems, editItem, loading } = useJunior();

onMounted(async () => {
    await getItems();
})
</script>

<template>
    <Edit is="mcjhs" :quests="items" :reset="editItem" :loading="loading" />
</template>