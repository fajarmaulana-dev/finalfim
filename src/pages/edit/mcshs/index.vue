<script setup>
import Edit from '@/components/Edit.vue';
import { useSenior } from '@/composables/mcshs';
import { onMounted } from 'vue';

onMounted(async () => {
    await getItems();
})

const { items, getItems, editItem, loading } = useSenior();
</script>

<template>
    <Edit is="mcshs" :quests="items" :reset="editItem" :loading="loading" />
</template>