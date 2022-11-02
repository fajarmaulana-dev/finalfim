<script setup>
import { useElementary } from '@/composables/mces';
import { useUser } from '@/composables/users';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import katex from 'katex';
import Formula from '@/components/Formula.vue'
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";
import router from '@/router'
import { useRoute } from 'vue-router';
const route = useRoute();

const user = TokenService.getUser()

const question = ref()

onMounted(async () => {
    await getEmail();
    if (user) {
        if (!mails.value.includes(user?.email)) {
            TokenService.removeUser();
            router.go(0)
        }
    }
    window.katex = katex
    await getItem(route.params.id);
    question.value = [item.value]
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { item, getItem, editItem, loading } = useElementary();
const { getEmail, mails } = useUser()
</script>

<template>
    <Formula is="mces" :quests="question" :update="editItem" :loading="loading" :id="route.params.id" />
</template>