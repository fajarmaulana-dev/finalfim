<script setup lang="ts">
import Core from '@/components/Core.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()
const is = route.path.split('/')[1]
</script>

<template>
    <Core :is="is" :state="store.state.alert[is]" @onx="store.commit('spill', { is, to: false })" />
</template>