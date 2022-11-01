<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';
import { ref } from 'vue';

const { message, login } = useUser();
const email = ref('')
const password = ref('')
</script>

<template>
    <Auth is="login" :email="email" :old-pass="password" :login="login" :message="message" />
</template>