<script setup>
import Edit from '@/components/Edit.vue';
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
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, editItem, loading } = useSenior();
</script>

<template>
    <Edit is="mcshs" :quests="items" :reset="editItem" :loading="loading" />
</template>