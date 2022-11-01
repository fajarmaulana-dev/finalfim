<script setup>
import Edit from '@/components/Edit.vue';
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
})

onBeforeUnmount(() => {
    EventBus.remove("logout");
})

const { items, getItems, editItem, loading } = useElementary();
const { getEmail, mails } = useUser()
</script>

<template>
    <Edit is="mces" :quests="items" :reset="editItem" :loading="loading" />
</template>