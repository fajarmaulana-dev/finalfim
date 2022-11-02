<script setup>
import { useUser } from '@/composables/users';
import Auth from '@/components/Auth.vue'

const { message, sendmail, loading } = useUser();
</script>

<template>
    <Auth is="forgot" :sendmail="sendmail" :message="message" :loading="loading" />
</template>