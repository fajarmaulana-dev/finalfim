<script setup>
import { ref } from 'vue';
import { useUser } from '@/composables/users';
import Auth from '@/components/Auth.vue'

const { message, reset } = useUser();
</script>

<template>
    <Auth is="reset" :reset="reset" :message="message" />
</template>