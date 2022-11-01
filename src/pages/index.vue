<script setup>
import Main from '@/components/Main.vue'
import { useElementary } from '@/composables/mces';
import { useUser } from '@/composables/users';
import { onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";

const user = TokenService.getUser()

onMounted(async () => {
    await getEmail();
    if (user) {
        if (!mails.value.includes(user?.email)) {
            TokenService.removeUser();
            location.reload()
        }
    }
    await getItems();
    await getAllContestants();
    await getMeta();
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useElementary();
const { getEmail, mails } = useUser()
</script>

<template>
    <Main is="mces" :meta="meta" :quests="items" :contestants="contestants" :bonus="20" :count-down="120" :minscore="5"
        :vioscore="10" :answer-item="answerItem" :edit-score="editScore" :up-res="upRes" :loading="loading"
        :reset-m="resetMeta" :reset-c="resetContestants" :reset-q="resetItems" />
</template>