<script setup lang="ts">
import EditorChild from '@/components/EditorChild.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const is = route.path.split('/')[1]
const id = route.params.id as string
</script>

<template>
    <EditorChild :is="is" :id="id" />
</template>