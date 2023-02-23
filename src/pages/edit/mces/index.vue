<script setup>
import Edit from '@/components/Edit.vue';
import { useElementary } from '@/composables/mces';
import { onMounted } from 'vue';

onMounted(async () => {
    await getItems();
})

const { items, getItems, editItem, loading } = useElementary();
</script>

<template>
    <Edit is="mces" :quests="items" :reset="editItem" :loading="loading" />
</template>