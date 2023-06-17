<script setup lang="ts">
import { ref } from 'vue';
import Auth from '@/components/Auth.vue'
import Toast from '@/components/Toast.vue';
import { useAuth } from '@/api/auth';
import { useRoute, useRouter } from 'vue-router';

const { message, toast, reset } = useAuth()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const id = route.query.id as string
const token = route.query.token as string

const onReset = async ({ email, pass }: any) => {
    loading.value = true
    await reset(id, token, { password: pass.new })
    if (message.success.length > 0) {
        setTimeout(() => {
            router.push('/auth/login')
        }, 3700)
    }
    loading.value = false
}
</script>

<template>
    <Auth @send="onReset" :loading="loading" />
    <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="(toast as any)[is]" :text="(message as any)[is]" />
</template>