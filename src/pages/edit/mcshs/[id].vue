<script setup>
import { useSenior } from '@/composables/mcshs';
import { useUser } from '@/composables/users';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import katex from 'katex';
import Formula from '@/components/Formula.vue'
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";
import { useRoute } from 'vue-router';
const route = useRoute();

const user = TokenService.getUser()

const question = ref()

onMounted(async () => {
    await getEmail();
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    window.katex = katex
    await getItem(route.params.id);
    question.value = [item.value]
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { item, getItem, editItem, loading } = useSenior();
const { getEmail, mails } = useUser()
</script>

<template>
    <Formula is="mcshs" :quests="question" :update="editItem" :loading="loading" :id="route.params.id" />
</template>