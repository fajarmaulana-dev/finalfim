<script setup>
import { ref } from 'vue';
import { useUser } from '@/composables/users';
import Auth from '@/components/Auth.vue'

const reset2 = ref('')
const reset3 = ref('')
const { message, reset } = useUser();
</script>

<template>
    <Auth is="reset" :reset="reset" :message="message" :new-pass="reset2" :confirm-pass="reset3" />
</template>