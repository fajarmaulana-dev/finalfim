<script setup lang="ts">
import { ref, reactive } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router';
import Modal from '~/Modal.vue';
import Toast from '~/Toast.vue';
import Spinner from '~/Spinner.vue';
import Menu from '~/Menu.vue'
import Editor from '~/Editor.vue';
import { useContest } from "@/api/contest"

const { quest, data, msg, getQuests, resetQuest, getQuest, update } = useContest()


// Together
const router = useRouter()
const route = useRoute()
const is = ref(route.query.sch as string)
const id = ref(route.query.id as string)
const load = reactive({ init: false, more: false, quest: false })
const message: any = reactive({ info: '', error: '' });
const toast: any = reactive({ info: false, error: false });
const many = ref(route.query.sch == 'mces' ? 25 : 16)
const error = ref(false)
const level = ['mces', 'mcjhs', 'mcshs']
const core = async () => {
    if (id.value) {
        if ((Number(id.value) >= 1 && Number(id.value) <= many.value) && level.includes(is.value)) {
            error.value = false
            load.quest = true
            await getQuest(Number(id.value), { is: is.value })
            if (msg.value.length > 0) {
                toast.error = true;
                message.error = msg.value
            }
            load.quest = false
        } else error.value = true
    } else {
        if (level.includes(is.value)) {
            error.value = false
            load.init = true
            is.value ? await getQuests({ is: is.value, from: 0, number: 5 }) : await getQuests({ is: 'mces', from: 0, number: 5 })
            datas.value = data.value
            load.init = false
        } else error.value = true
    }
}

const addAlt = () => {
    const imagelist = Array.from(document.getElementsByTagName('img'))
    imagelist.forEach((i: any, idx: number) => {
        if (i.alt !== 'logo') i.setAttribute('alt', `quill-image-${idx}`)
    })
}

onMounted(async () => {
    await core()
    addAlt()
})

watch(route, async () => {
    is.value = route.query.sch as string
    id.value = route.query.id as string
    many.value = is.value == 'mces' ? 25 : 16
    await core()
    addAlt()
}, { deep: true })

// Edit Page
const loading = ref([...Array(many)].map((_, i) => false))
const modal = ref(false)
const idx = ref(0)
const datas: any = ref([])

const getMore = async () => {
    load.more = true
    await getQuests({ is: is.value, from: datas.value.length, number: 5 })
    data.value.forEach((d: any) => datas.value.push(d));
    load.more = false
}

const init = async (from: number) => {
    await getQuests({ is: is.value, from, number: 1 })
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
const questInit = (i: number) => `<p>Soal ${is.value} nomor ${i + 1} belum diedit.</p>`
const onReset = async () => {
    loading.value[idx.value] = true
    await resetQuest((idx.value + 1), is.value)
    if (msg.value.length == 0) {
        toast.info = true
        message.info = `Soal ${is.value.toUpperCase()} nomor ${idx.value + 1} telah berhasil direset.`
    } else {
        toast.error = true;
        message.error = msg.value
    }
    await init(idx.value)
    loading.value[idx.value] = false
}

// Editor Page
const updateQuest = async ({ point, question }: any) => {
    load.quest = true
    await update({ is: is.value, index: id.value, point, question })
    if (msg.value.length == 0) {
        toast.info = true;
        message.info = `Soal ${is.value} nomor ${id.value} berhasil diperbarui.`
        setTimeout(() => {
            router.replace(`/edit?sch=${is.value}`)
        }, 4000)
    } else {
        toast.error = true;
        message.error = msg.value
    }
    load.quest = false
}
</script>

<template>
    <Menu />
    <div v-if="error" class="min-h-screen px-[calc(.5rem+4vw)] py-[calc(4rem+4vw)]">
        <div
            class="w-full text-sm border-[.15rem] border-solid py-[0.375rem] px-3 rounded-md mb-5 bg-amber-200 text-amber-800 border-amber-800">
            <p class="mb-3 font-bold !text-base">Kesalahan nilai query!</p>
            <div class="flex flex-col gap-1">
                <p v-if="!level.includes(is)">◆ Nilai yang diperbolehkan untuk parameter <b>"sch"</b> hanya <b>mces, mcjhs,
                        atau mcshs</b>.</p>
                <p v-if="Number(id) < 1 || Number(id) > many">◆ Nilai untuk parameter <b>"id"</b> harus <b>bilangan asli
                        yang kurang dari sama dengan {{ many }}</b>.</p>
            </div>
        </div>
    </div>
    <Editor v-if="!error && id" :is="is" :id="id" :loading="load.quest" :data="quest" @update="updateQuest" />
    <div v-if="!error && !id" class="px-[calc(.5rem+4vw)] pt-[calc(4rem+4vw)]"
        :class="datas.length < many ? 'pb-[calc(3.5rem+3.5vw)]' : 'pb-[calc(4rem+4vw)]'">
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
                                class="fa-solid fa-pen-to-square"
                                @click="router.push(`/edit?sch=${is}&id=${i + 1}`)"></button>
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
                <button @click="getMore()" :disabled="load.more"
                    :class="load.more ? 'cursor-not-allowed' : 'cursor-pointer'"
                    class="font-bold select-none text-sky-600 flex flex-col items-center w-fit group">
                    <span style="transition: .4s;"
                        class="px-3 py-1 bg-sky-600 text-white rounded-md group-hover:bg-sky-700 group-active:bg-sky-600">Tampilkan
                        Lebih ( Sisa {{ many - datas.length }} )</span>
                    <div v-if="load.more" class="grid place-items-center mt-2.5">
                        <Spinner is="jump-dots" fill="fill-sky-600" />
                    </div>
                    <span v-else
                        class="fa-solid fa-angles-down text-xl mt-2.5 animate-bounce group-hover:animate-none group-hover:text-sky-700 group-active:text-sky-600"></span>
                </button>
            </div>
        </div>
    </div>
    <Modal is="error" v-model="modal" title="Reset Soal" confirm-text="Ya, Reset" @confirm="onReset()"
        close-text="Jangan Reset">
        Apakah kamu yakin ingin mereset<br /><b>"Soal {{ is.toUpperCase() }} nomor {{ idx + 1 }}"</b> ?
    </Modal>
    <Toast v-for="is, i in ['info', 'error']" :is="is" v-model="toast[is]" :text="message[is]" />
</template>