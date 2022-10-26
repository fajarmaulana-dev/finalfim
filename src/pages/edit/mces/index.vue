<script setup>
import { onMounted } from 'vue';
import Edit from '@/components/Edit.vue';
import { useElementary } from '@/composables/mces';

const { items, getItems, editItem, loading } = useElementary();

onMounted(async () => {
    await getItems();
})
</script>

<template>
    <Edit is="mces" :quests="items" :reset="editItem" :loading="loading" />
</template>