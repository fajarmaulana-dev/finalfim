<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';

const { message, edit, loading } = useUser();
</script>

<template>
    <Auth is="profile" :edit="edit" :message="message" :loading="loading" />
</template>