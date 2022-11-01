<script setup>
import Auth from '@/components/Auth.vue';
import { useUser } from '@/composables/users';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import { noAuth } from '@/api/auth'
import TokenService from "@/api/token";

const user = TokenService.getUser()
const exp = ref(false)
onMounted(() => {
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    noAuth(exp.value)
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { message, update } = useUser();
const name = ref('')
const reset1 = ref('')
const reset2 = ref('')
const reset3 = ref('')
</script>

<template>
    <Auth is="profile" :name="name" :update="update" :message="message" :old-pass="reset1" :new-pass="reset2"
        :confirm-pass="reset3" />
</template>