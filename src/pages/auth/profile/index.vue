<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';
import { onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import { noAuth } from '@/api/auth'
import TokenService from "@/api/token";
import router from '@/router'

const user = TokenService.getUser()
onMounted(async () => {
    await getEmail();
    if (user) {
        if (!mails.value.includes(user?.email)) {
            TokenService.removeUser();
            router.go(0)
        }
    }
    noAuth()
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { message, update, getEmail, mails, loading } = useUser();
</script>

<template>
    <Auth is="profile" :update="update" :message="message" :loading="loading" />
</template>