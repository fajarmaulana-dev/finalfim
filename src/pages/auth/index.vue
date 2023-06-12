<script setup lang="ts">
import { computed, ref } from 'vue';
import Auth from '@/components/Auth.vue'
import Toast from '@/components/Toast.vue';
import Menu from '@/components/Menu.vue';
import { useAuth } from '@/api/auth';
import { useStore } from 'vuex';
import router from '@/router';

const { message, toast, update } = useAuth()
const store = useStore()
const id = computed(() => store.getters.id)
const loading = ref(false)

const onUpdate = async ({ email, pass }: any) => {
    loading.value = true
    await update(id.value, { email, password: pass.def, newPassword: pass.new })
    if (message.success.length > 0) {
        setTimeout(() => {
            router.push('/mces')
        }, 3700)
    }
    loading.value = false
}
</script>

<template>
    <Menu />
    <Auth class="!py-[calc(4rem+4vw)]" @send="onUpdate" :loading="loading" />
    <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="(toast as any)[is]" :text="(message as any)[is]" />
</template>