<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import { noAuth } from '@/api/auth'
import TokenService from "@/api/token";

const user = TokenService.getUser()
onMounted(async () => {
    await getEmail();
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    noAuth()
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { message, update } = useUser();
const { getEmail, mails } = useUser()
</script>

<template>
    <Auth is="profile" :update="update" :message="message" />
</template>