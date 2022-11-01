<script setup>
import Edit from '@/components/Edit.vue';
import { useJunior } from '@/composables/mcjhs';
import { useUser } from '@/composables/users';
import { onMounted, onBeforeUnmount } from 'vue';
import EventBus from "@/common/eventBus";
import TokenService from "@/api/token";

const user = TokenService.getUser()

onMounted(async () => {
    await getEmail();
    if (user && !mails.value.includes(user?.email)) {
        TokenService.removeUser();
        location.reload()
    }
    await getItems();
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, editItem, loading } = useJunior();
const { getEmail, mails } = useUser()
</script>

<template>
    <Edit is="mcjhs" :quests="items" :reset="editItem" :loading="loading" />
</template>