<script setup>
import Edit from '@/components/Edit.vue';
import { useSenior } from '@/composables/mcshs';
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

const { items, getItems, editItem, loading } = useSenior();
const { getEmail, mails } = useUser()
</script>

<template>
    <Edit is="mcshs" :quests="items" :reset="editItem" :loading="loading" />
</template>