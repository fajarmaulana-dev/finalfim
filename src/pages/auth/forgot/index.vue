<script setup>
import { ref } from 'vue';
import { useUser } from '@/composables/users';
import Auth from '@/components/Auth.vue'

const email = ref('')
const { message, sendmail, loading } = useUser();
</script>

<template>
    <Auth is="forgot" :sendmail="sendmail" :email="email" :message="message" :loading="loading" />
</template>