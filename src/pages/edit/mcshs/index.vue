<script setup>
import { onMounted } from 'vue';
import Edit from '@/components/Edit.vue';
import { useSenior } from '@/composables/mcshs';

const { items, getItems, editItem, loading } = useSenior();

onMounted(async () => {
    await getItems();
})
</script>

<template>
    <Edit is="mcshs" :quests="items" :reset="editItem" :loading="loading" />
</template>