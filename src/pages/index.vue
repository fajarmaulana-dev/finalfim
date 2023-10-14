<script setup lang="ts">
import { reactive, ref, computed } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Menu from '~/Menu.vue';
import Main from '~/Main.vue';
import Toast from '~/Toast.vue';
import Modal from '~/Modal.vue';
import { useContest } from "@/api/contest"

const getAssets = (path: string) => {
    return new URL(`/src/assets/${path}`, import.meta.url).href
}

const { data, quest, msg, decision, getData, getQuest, setAnswer, setPoint, reset } = useContest()

const route = useRoute()
const store = useStore()
const is = ref(route.query.sch as string)
const message: any = reactive({ info: '', error: '', warning: '' });
const toast: any = reactive({ info: false, error: false, warning: false });
const modal: any = reactive({ success: false, info: false, warning: false, error: false })
const text: any = reactive({ success: '', info: '', warning: '', error: '' })
const title: any = ['Pemindahan Bonus', 'Poin Bonus', 'Pembatalan Bonus']
const error = ref(false)
const level = ['mces', 'mcjhs', 'mcshs']

const load = reactive({
    data: false,
    reset: false,
    quest: [...Array(is.value == 'mces' ? 25 : 16)].map((_, i) => false),
    point: [...Array(5)].map((_, i) => false),
})
const state = computed(() => store.state.alert[is.value])
const alert = reactive({
    state,
    message: message.warning
})
const core = async () => {
    if (is.value) {
        if (level.includes(is.value)) {
            error.value = false
            load.data = true
            await getData({ is: is.value })
            load.data = false
        } else error.value = true
    }
}
const screenWidth = ref(window.innerWidth);
onMounted(async () => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
    })
    await core()
})

watch(route, async () => {
    is.value = route.query.sch as string
    await core()
}, { deep: true })

const init = async () => {
    await getData({ is: is.value })
    if (msg.value.length > 0) {
        toast.error = true;
        message.error = msg.value
    }
}

const getQuests = async ({ idx, openboard }: any) => {
    load.quest[idx - 1] = true
    await getQuest(idx, { is: is.value })
    if (msg.value.length == 0) {
        openboard()
    } else {
        toast.error = true;
        message.error = msg.value
    }
    load.quest[idx - 1] = false
}

const update = async ({ idx, point, name, reader }: any) => {
    load.point[idx] = true
    await setPoint({ is: is.value, name, point })
    reader()
    if (msg.value.length == 0) {
        toast.info = true
        message.info = `Poin peserta ${name} telah berhasil diperbarui.`
    } else {
        toast.error = true;
        message.error = msg.value
    }
    await init()
    load.point[idx] = false
}

const answerKit = async ({ q_idx, answer, color, points, bonus, disMin, changer, point }: any) => {
    load.quest[q_idx] = true
    const name = ['A', 'B', 'C', 'D', 'E']
    await setAnswer({ is: is.value, index: (q_idx + 1), answer, color, points, bonus, disMin })
    if (msg.value.length == 0) {
        if (changer.after == 'NA') {
            toast.warning = true;
            message.warning = `Soal nomor ${q_idx + 1} tidak terjawab. ${name.includes(changer.before) ? `${point} poin peserta ${changer.before} dari soal ini telah dibatalkan.` : ''}`
        } else {
            if (changer.before !== changer.after) {
                toast.info = true
                message.info = `${!name.includes(changer.before) ? 'Tambahan' : 'Pemindahan'} ${point} poin ${!name.includes(changer.before) ? 'untuk' : `dari peserta ${changer.before} ke`} peserta ${changer.after}`
            }
        }
        if (decision.value) {
            if (decision.value?.val < 0) {
                text.warning = `Bonus ${bonus} poin dari peserta ${decision.value?.before} telah dibatalkan`
                modal.warning = true
            }
            else if (decision.value?.val > 0) {
                text.info = `Selamat, peserta ${decision.value?.after} memperoleh bonus ${bonus} poin`
                modal.info = true
            }
            else {
                text.success = `Pemindahan bonus ${bonus} poin dari peserta ${decision.value?.before} ke peserta ${decision.value?.after} telah sukses`
                modal.success = true
            }
        }
    } else {
        toast.error = true;
        message.error = msg.value
    }
    await init()
    load.quest[q_idx] = false
}

const openReset = () => {
    modal.error = true;
    text.error = `Apakah kamu yakin ingin mereset hasil babak kuis ${is.value.toUpperCase()} ?`
}

const onReset = async () => {
    load.reset = true
    await reset(is.value)
    if (msg.value.length == 0) {
        toast.info = true
        message.info = `Kuis ${is.value.toUpperCase()} telah berhasil dikembalikan ke default.`
    } else {
        toast.error = true;
        message.error = msg.value
    }
    await init()
    load.reset = false
}

const disabled = () => !data.value?.changed || load.reset

const socials = [
    { ico: 'solid fa-blog', url: 'https://fajarmaulana-dev.netlify.app' },
    { ico: 'brands fa-github', url: 'https://github.com/fajarmaulana-dev' },
    { ico: 'brands fa-linkedin-in', url: 'https://www.linkedin.com/in/fajar-maulana-16b98b152' },
    { ico: 'brands fa-facebook', url: 'https://web.facebook.com/profile.php?id=100090702398845' },
]
</script>

<template>
    <div v-if="is">
        <Menu :disabled="disabled()" :loading="load.reset" @reset="openReset()" />
        <div v-if="error" class="min-h-screen px-[calc(.5rem+4vw)] py-[calc(4rem+4vw)]">
            <div
                class="w-full text-sm border-[.15rem] border-solid py-[0.375rem] px-3 rounded-md mb-5 bg-amber-200 text-amber-800 border-amber-800">
                <p class="mb-3 font-bold !text-base">Kesalahan nilai query!</p>
                <p>◆ Nilai yang diperbolehkan untuk parameter <b>"sch"</b> hanya <b>mces, mcjhs, atau mcshs</b>.</p>
            </div>
        </div>
        <Main v-if="!error" :is="is" :alert="alert" :loading="load" :data="data" :quest="quest" @update-point="update"
            @get-quest="getQuests" @answer="answerKit" @not-answer="answerKit"
            @xalert="store.commit('spill', { is, to: true })" />
        <Modal v-for="is, i in ['success', 'info', 'warning']" :is="is" v-model="modal[is]" :title="title[i]"
            :with-confirm="false" close-text="Mengerti">{{ text[is] }}
        </Modal>
        <Modal is="error" v-model="modal.error" title="Reset Kuis" @confirm="onReset()" confirm-text="Ya, Reset"
            close-text="Jangan Reset">{{ text.error }}</Modal>
        <Toast v-for="is, i in ['info', 'error', 'warning']" :is="is" v-model="toast[is]" :text="message[is]" />
    </div>
    <div v-else class="min-h-screen grid place-items-center relative [&>*]:z-[1]">
        <div
            class="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10 px-[calc(1rem+6vw)] py-[calc(1rem+3vw)]">
            <div class="w-[10rem] lg:min-w-[18rem]">
                <img src="@/assets/fimojempol.avif" alt="fimo">
            </div>
            <div>
                <div class="text-[.8rem] xs:text-[1.075rem] sm:text-xl md:text-2xl font-black leading-4 xs:leading-6">
                    <span class="text-sky-600">Selamat Datang Di Babak Kuis</span><br />
                    <span class="text-teal-500">Forum Ilmiah Matematika Nasional</span><br />
                    <span class="text-amber-600">Universitas Negeri Semarang</span>
                </div>
                <div class="text-xs xs:text-sm md:text-base text-teal-700 font-medium mt-4 md:mt-5 lg:mt-8 text-justify">
                    &emsp;&emsp;&emsp;Aplikasi ini merupakan media yang digunakan untuk mempermudah penyelenggaraan babak
                    kuis FIM UNNES. Terdiri dari tiga halaman utama, yaitu halaman autentikasi, halaman kuis, serta halaman
                    pengeditan soal dan poin tiap soal.<br />&emsp;&emsp;&emsp;Dibangun dengan MEVN Stack, aplikasi ini
                    memiliki fitur yang mengakomodasi aturan-aturan yang telah ditetapkan pada panduan penyelenggaraan babak
                    kuis, seperti pemutaran waktu tiap soal, pemberian poin otomatis kepada peserta sesuai poin soal,
                    pemberian poin bonus otomatis sesuai panduan, fitur undo/redo, penampilan dan pengeditan konten rumus
                    serta Rich Text dengan Vue Quill dan Katex, dan lain-lain. Dengan desain yang sederhana, aplikasi telah
                    memperoleh skor lighthouse dengan indikator hijau untuk semua halaman.
                </div>
                <div class="flex flex-col-reverse sm:flex-row gap-3 sm:gap-7 items-center mt-4">
                    <div class="flex justify-center gap-4">
                        <a style="transition: .4s;" v-for="social, i in socials" :key="i" :href="social.url"
                            :aria-label="`Go to developers ${social.ico.split('-')[1]} account`" target="_blank"
                            :class="`fa-${social.ico} ${social.ico.includes('blog') ? 'lg:!hidden xl:!block' : ''} text-base sm:text-lg md:text-xl cursor-pointer text-teal-500 hover:text-teal-700`">
                        </a>
                    </div>
                    <div
                        class="flex w-full flex-col sm:flex-row gap-2 sm:gap-3 xl:gap-4 justify-end [&>*]:text-xs xs:[&>*]:text-sm md:[&>*]:text-base [&>*]:h-8 xs:[&>*]:h-9 sm:[&>*]:h-10 [&>*]:font-bold [&>*]:rounded-md [&>*]:grid [&>*]:place-items-center">
                        <a :href="getAssets('panduan.pdf')" target="_blank" style="transition: .4s;"
                            class="w-full sm:max-w-[16rem] lg:max-w-[18rem] border-[3px] border-teal-500 text-teal-500 hover:border-teal-600 hover:text-teal-600 active:border-teal-500 active:text-teal-500">
                            Unduh Panduan Babak Kuis</a>
                        <router-link to="/?sch=mces" style="transition: .4s;"
                            class="w-full sm:max-w-[8.5rem] lg:max-w-[10rem] bg-gradient-to-br from-sky-600 to-teal-500 text-white hover:tracking-wider active:tracking-tight">
                            Ayo Mulai !</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-3 xs:pb-4 md:pb-5 lg:pb-[1vw] xl:pb-0 font-bold text-xs xs:text-sm sm:text-base flex gap-3">
            <span class="text-sky-600">Crafted by </span><a href="https://fajarmaulana-dev.netlify.app"
                style="transition: .4s;" class="underline text-teal-600 hover:text-teal-700 hover:font-bold"
                aria-label="Go to my website" target="_blank">Fajar Maulana</a><span class="text-amber-600">© {{ new
                    Date().getFullYear() }}</span>
        </div>
        <div v-for="i in 10"
            :style="`top: ${((i - 1) * 19)}rem; left: ${i % 2 === 0 ? (Math.round(Math.random() * 42)) : ''}vw; right: ${i % 2 !== 0 ? (Math.round(Math.random() * 27)) : ''}vw; transform: rotate(${((i - 0.65) * 10) + Math.round(Math.random() * 60)}deg)`"
            class="absolute !z-0">
            <div
                class="w-48 h-44 relative [&>*]:absolute [&_.line]:border-[12px] [&_.line]:border-emerald-100 [&_.up]:!border-b-0 [&_.up]:rounded-t-full [&_.down]:!border-t-0 [&_.down]:rounded-b-full [&_.dot]:bg-emerald-100">
                <div class="line up w-32 h-16 top-4 left-12"></div>
                <div class="line up w-16 h-8 top-12 left-20"></div>
                <div class="line down w-24 h-12 top-20 left-12"></div>
                <div class="line down w-40 h-20 top-20 left-4"></div>
                <div class="dot up w-[12px] h-[8px] top-[calc(5rem-8px)] left-4"></div>
                <div class="dot down w-[12px] h-[8px] top-20 left-20"></div>
            </div>
        </div>
        <div v-if="screenWidth >= 768" v-for="i in 5"
            :style="`top: ${((i - 0.7) * 43)}rem; left: ${i % 2 === 0 ? (Math.round(Math.random() * 21)) : ''}vw; right: ${i % 2 !== 0 ? (Math.round(Math.random() * 38)) : ''}vw; transform: rotate(${((i - 0.35) * 20) + Math.round(Math.random() * 140)}deg)`"
            class="absolute !z-0">
            <div
                class="w-48 h-44 relative [&>*]:absolute [&_.line]:border-[12px] [&_.line]:border-purple-100 [&_.up]:!border-b-0 [&_.up]:rounded-t-full [&_.down]:!border-t-0 [&_.down]:rounded-b-full [&_.dot]:bg-purple-100">
                <div class="line up w-32 h-16 top-4 left-12"></div>
                <div class="line up w-16 h-8 top-12 left-20"></div>
                <div class="line down w-24 h-12 top-20 left-12"></div>
                <div class="line down w-40 h-20 top-20 left-4"></div>
                <div class="dot up w-[12px] h-[8px] top-[calc(5rem-8px)] left-4"></div>
                <div class="dot down w-[12px] h-[8px] top-20 left-20"></div>
            </div>
        </div>
    </div>
</template>