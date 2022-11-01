<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';
import { ref } from 'vue';

const { message, login } = useUser();
</script>

<template>
    <Auth is="login" :login="login" :message="message" />
</template>