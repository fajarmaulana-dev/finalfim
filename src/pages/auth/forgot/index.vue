<script setup lang="ts">
import { ref } from 'vue';
import Auth from '@/components/Auth.vue'
import Toast from '@/components/Toast.vue';
import { useAuth } from '@/api/auth';

const { message, toast, sendmail } = useAuth()
const loading = ref(false)
const onMail = async ({ email, pass }: any) => {
    loading.value = true
    await sendmail({ email })
    loading.value = false
}
</script>

<template>
    <Auth @send="onMail" :loading="loading" />
    <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="(toast as any)[is]" :text="(message as any)[is]" />
</template>