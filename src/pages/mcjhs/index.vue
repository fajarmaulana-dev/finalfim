<script setup>
import Main from '@/components/Main.vue'
import { useJunior } from '@/composables/mcjhs';
import { useUser } from '@/composables/users';
import { onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
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
    await getItems();
    await getAllContestants();
    await getMeta();
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useJunior();
const { getEmail, mails } = useUser()
</script>

<template>
    <Main is="mcjhs" title="Mathematics Competition for Junior High School" :meta="meta" :quests="items"
        :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" :answer-item="answerItem"
        :edit-score="editScore" :up-res="upRes" :loading="loading" :reset-m="resetMeta" :reset-c="resetContestants"
        :reset-q="resetItems" />
</template>