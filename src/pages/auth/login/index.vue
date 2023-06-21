<script setup lang="ts">
import { ref } from '@vue/reactivity';
import Auth from '@/components/Auth.vue'
import Toast from '@/components/Toast.vue';
import { useAuth } from '@/api/auth';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const { message, toast, login } = useAuth()
const store = useStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const onLogin = async ({ email, pass }: any) => {
    loading.value = true
    await login({ email, password: pass.def })
    store.dispatch('login')
    if (message.success.length > 0) {
        setTimeout(() => {
            router.push(route.query.redirect as string || '/?sch=mces')
        }, 3700)
    }
    loading.value = false
}
</script>

<template>
    <Auth @send="onLogin" :loading="loading" />
    <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="(toast as any)[is]" :text="(message as any)[is]" />
</template>