<script setup lang="ts">
import { ref, reactive, onMounted, toRefs } from 'vue';
import Editor from './Editor.vue';
import Toast from './Toast.vue';
import { useContest } from "@/api/contest"
import router from '@/router';

const props = defineProps({
    id: { type: String, default: '1' },
    is: { type: String, default: 'mces' },
})

const { id, is } = toRefs(props)

const { quest, msg, getQuest, update } = useContest()
const message: any = reactive({ info: '', error: '' });
const toast: any = reactive({ info: false, error: false });
const loading = ref(false)

onMounted(async () => {
    loading.value = true
    await getQuest(Number(id.value), { is: is.value })
    if (msg.value.length > 0) {
        toast.error = true;
        message.error = msg.value
    }
    loading.value = false
})

const updateQuest = async ({ point, question }: any) => {
    loading.value = true
    await update({ is: is.value, index: id.value, point, question })
    if (msg.value.length == 0) {
        toast.info = true;
        message.info = `Soal ${is.value} nomor ${id.value} berhasil diperbarui.`
        setTimeout(() => {
            router.replace(`/${is.value}/edit`)
        }, 4000)
    } else {
        toast.error = true;
        message.error = msg.value
    }
    loading.value = false
}
</script>

<template>
    <Editor :is="is" :id="id" :loading="loading" :data="quest" @update="updateQuest" />
    <Toast v-for="is, i in ['info', 'error']" :is="is" v-model="toast[is]" :text="message[is]" />
</template>