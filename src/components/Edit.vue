<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Modal from './Modal.vue';
import Toast from './Toast.vue';
import Spinner from './Spinner.vue';
import Menu from './Menu.vue'
import { useContest } from "@/api/contest"

const { data, msg, getQuests, resetQuest } = useContest()

const router = useRouter()
const route = useRoute()
const is = route.path.split('/')[1]
const many = is == 'mces' ? 25 : 16
const loading = ref([...Array(many)].map((_, i) => false))
const load = reactive({ init: false, more: false })
const message: any = reactive({ info: '', error: '' });
const toast: any = reactive({ info: false, error: false });
const modal = ref(false)
const idx = ref(0)
const datas: any = ref([])

onMounted(async () => {
    load.init = true
    await getQuests({ is, from: 0, number: 5 })
    datas.value = data.value
    load.init = false
})

const getMore = async () => {
    load.more = true
    await getQuests({ is, from: datas.value.length, number: 5 })
    data.value.forEach((d: any) => datas.value.push(d));
    load.more = false
}

const init = async (from: number) => {
    await getQuests({ is, from, number: 1 })
    if (msg.value.length > 0) {
        toast.error = true;
        message.error = msg.value
    }
    datas.value[from] = data.value[0]
}

const openModal = (i: number) => {
    idx.value = i
    modal.value = true
}
const questInit = (i: number) => `<p>Soal ${is} nomor ${i + 1} belum diedit.</p>`
const onReset = async () => {
    loading.value[idx.value] = true
    await resetQuest((idx.value + 1), is)
    if (msg.value.length == 0) {
        toast.info = true
        message.info = `Soal ${is.toUpperCase()} nomor ${idx.value + 1} telah berhasil direset.`
    } else {
        toast.error = true;
        message.error = msg.value
    }
    await init(idx.value)
    loading.value[idx.value] = false
}
</script>

<template>
    <Menu />
    <div class="px-[calc(.5rem+4vw)] py-[calc(4rem+4vw)]">
        <p class="text-2xl text-center font-extrabold text-sky-600 mb-[calc(1.25rem+1vw)]">
            Daftar Soal {{ is.toUpperCase() }}</p>
        <div v-if="load.init" class="w-full h-[calc(100vh-20rem)] grid place-items-center">
            <Spinner :width="64" is="blocks" fill1="fill-rose-600" fill2="fill-emerald-600" fill3="fill-amber-600" />
        </div>
        <div v-else class="flex flex-col gap-[calc(1.25rem+1vw)]">
            <div v-for="data, i in datas" :key="i">
                <section class="flex flex-col mb-1.5 [&>*]:border-2 [&>*]: [&>*]:border-sky-600">
                    <div
                        class="h-[2.65rem] rounded-t-md select-none font-bold px-3 bg-sky-600 text-white flex items-center justify-between">
                        <div class="h-full grid place-items-center">No. {{ i + 1 }}</div>
                        <div
                            class="[&>button]:h-[1.75rem] [&>button]:cursor-pointer [&>button]:rounded text-sm [&>button]:w-[1.85rem] flex gap-1 [&>button]:grid [&>button]:place-items-center hover:[&>button]:bg-sky-700 active:[&>button]:bg-sky-800">
                            <button :disabled="loading[i]" :title="`Reset soal nomor ${i + 1}`"
                                v-if="data.question !== questInit(i) || data.point !== 30" style="transition: .4s;"
                                class="grid place-items-center"
                                :class="loading[i] ? 'hover:bg-sky-600 active:bg-sky-600 cursor-not-allowed' : ''"
                                @click="openModal(i)">
                                <Spinner v-if="loading[i]" is="yin" fill="fill-white" :width="16" />
                                <i v-else class="fa-solid fa-arrow-rotate-left"></i>
                            </button>
                            <button :title="`Edit soal nomor ${i + 1}`" style="transition: .4s;"
                                class="fa-solid fa-pen-to-square" @click="router.push(`${route.path}/${i + 1}`)"></button>
                        </div>
                    </div>
                    <div class="rounded-b-md ql-snow">
                        <div class="min-h-[5rem] rounded-b-md w-full bg-white text-sky-600 py-[.8rem] px-[.95rem] ql-editor"
                            v-html="data.question"></div>
                    </div>
                </section>
                <section class="font-bold text-sky-600">Poin : &emsp;{{ data.point }}</section>
            </div>
            <div v-if="datas.length < many" class="flex justify-center select-none">
                <div @click="getMore()" style="transition: color .4s;"
                    class="font-bold text-center text-sky-600 flex flex-col w-fit cursor-pointer hover:text-sky-700 active:text-sky-600 group">
                    <span>Tampilkan Lebih ( Sisa {{ many - datas.length }} )</span>
                    <span class="fa-solid fa-angles-down text-xl mt-1 animate-bounce group-hover:animate-none"></span>
                </div>
            </div>
        </div>
    </div>
    <Modal is="error" v-model="modal" title="Reset Soal" confirm-text="Ya, Reset" @confirm="onReset()"
        close-text="Jangan Reset">
        Apakah kamu yakin ingin mereset<br /><b>"Soal {{ is.toUpperCase() }} nomor {{ idx + 1 }}"</b> ?
    </Modal>
    <Toast v-for="is, i in ['info', 'error']" :is="is" v-model="toast[is]" :text="message[is]" />
</template>