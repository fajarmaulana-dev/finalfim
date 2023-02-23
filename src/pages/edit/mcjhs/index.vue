<script setup>
import Edit from '@/components/Edit.vue';
import { useJunior } from '@/composables/mcjhs';
import { onMounted } from 'vue';

onMounted(async () => {
    await getItems();
})

const { items, getItems, editItem, loading } = useJunior();
</script>

<template>
    <Edit is="mcjhs" :quests="items" :reset="editItem" :loading="loading" />
</template>