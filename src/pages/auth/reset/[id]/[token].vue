<script setup>
import { useUser } from '@/composables/users';
import Auth from '@/components/Auth.vue'

const { message, reset, loading } = useUser();
</script>

<template>
    <Auth is="reset" :reset="reset" :message="message" :loading="loading" />
</template>