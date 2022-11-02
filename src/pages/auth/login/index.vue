<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';

const { message, login, loading } = useUser();
</script>

<template>
    <Auth is="login" :login="login" :message="message" :loading="loading" />
</template>