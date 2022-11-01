<script setup>
import Main from '@/components/Main.vue'
import { useSenior } from '@/composables/mcshs';
import { onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";

const user = TokenService.getUser()

onMounted(async () => {
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    await getItems();
    await getAllContestants();
    await getMeta();
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, contestants, getAllContestants, meta, getMeta, answerItem, editScore, upRes, loading, resetItems, resetMeta, resetContestants } = useSenior();
</script>

<template>
    <Main is="mcshs" title="Mathematics Competition for Senior High School" :meta="meta" :quests="items"
        :contestants="contestants" :bonus="20" :count-down="120" :minscore="5" :vioscore="10" :answer-item="answerItem"
        :edit-score="editScore" :up-res="upRes" :loading="loading" :reset-m="resetMeta" :reset-c="resetContestants"
        :reset-q="resetItems" />
</template>