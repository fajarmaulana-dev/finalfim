<script setup lang="ts">
import { ref, toRefs, reactive, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import Toast from './Toast.vue';
import Circle from './Circle.vue';
import Spinner from './Spinner.vue';

const emit = defineEmits(['updatePoint', 'getQuest', 'answer', 'notAnswer', 'gift', 'xalert'])
const props = defineProps({
    is: {
        type: String,
        default: 'mces'
    },
    data: {
        type: Object,
        default: {
            quest: [],
            contestant: []
        }
    },
    quest: {
        type: Object,
        default: {
            index: 1,
            answer: '1',
            color: 'border-sky-600 text-sky-600 bg-white',
            point: 30,
            question: '',
            disMin: [...Array(6)].map((_, i) => false),
            disTemp: [...Array(6)].map((_, i) => false),
        }
    },
    bonus: {
        type: Number,
        default: 20
    },
    time: {
        type: Number,
        default: 120
    },
    minscore: {
        type: Number,
        default: 5
    },
    vioscore: {
        type: Number,
        default: 10
    },
    loading: {
        type: Object,
        default: {
            data: false,
            quest: [...Array(25)].map((_, i) => false),
            point: [...Array(6)].map((_, i) => false),
        }
    },
    alert: {
        type: Object,
        default: {
            state: false,
            message: ''
        }
    }
})

const { is, data, quest, bonus, time, minscore, vioscore, loading, alert } = toRefs(props)

const readonly: any = ref([])
const input: any = ref([])
const name = computed(() => (data?.value as any).contestant.map((c: any) => c.name))
const color = computed(() => (data?.value as any).contestant.map((c: any) => c.color))
const colormap = computed(() => (data?.value as any).contestant.map((c: any) => {
    return { name: c.name, color: c.color }
}))
const dis_vi: any = ref([])
watch(data, () => {
    readonly.value = [...Array(data?.value?.contestant.length)].map((_, i) => true)
    input.value = (data?.value as any).contestant.map((c: any) => c.point)
    dis_vi.value = Object.fromEntries(name.value.map((n: string, i: number) => [name.value[i], 0]))
})

const gaw = [['[&_div]:gap-[0.4rem] xs:[&_div]:gap-2.5', '[&_div]:gap-[0.55rem] xs:[&_div]:gap-3.5'], ['w-[2.75rem] xs:w-[3.5rem] h-[2.75rem] xs:h-[3.5rem] text-sm xs:text-[1.15rem]', 'w-[3.425rem] xs:w-[4.35rem] h-[3.425rem] xs:h-[4.35rem] text-[1.15rem] xs:text-xl']]
const divider = ref(is.value === 'mces' ? 5 : 4)
const gap = ref(is.value === 'mces' ? gaw[0][0] : gaw[0][1])
const width = ref(is.value === 'mces' ? gaw[1][0] : gaw[1][1])
watch(is, () => {
    divider.value = is.value === 'mces' ? 5 : 4
    if (is.value === 'mces') {
        gap.value = gaw[0][0]
        width.value = gaw[1][0]
    } else {
        gap.value = gaw[0][1]
        width.value = gaw[1][1]
    }
})
const ale: any = reactive({ state: false, message: '' })
watch(alert, () => {
    ale.state = alert.value.state
    ale.message = alert.value.message
}, { deep: true })

const board = reactive({ container: false, box: false })
const toast: any = reactive({ success: false, warning: false })
const message: any = reactive({ success: '', warning: '' })

const current = ref(120)
const countStart = () => {
    if (current.value > 0) {
        setTimeout(() => {
            current.value -= 1;
            countStart();
        }, 1000)
    }
}

const openboard = () => {
    current.value = time.value
    board.container = true;
    setTimeout(() => {
        board.box = true
    }, 100)
    countStart()
}
const closeboard = () => {
    board.box = false;
    setTimeout(() => {
        board.container = false
    }, 300)
}
const answerHandler = ref(false)
watch(current, () => {
    if (current.value === 0) {
        if (!answerHandler.value) notAnswer((quest?.value as any).index - 1)
        closeboard()
        answerHandler.value = false
        dis_vi.value = Object.fromEntries(name.value.map((n: string, i: number) => [name.value[i], 0]))
    }
})

const percentage = () => {
    return current.value / time.value;
}
const colorize = computed(() => {
    if (current.value > 10 && current.value <= 30) {
        return 'bg-amber-600 border-amber-600'
    } else if (current.value > 0 && current.value <= 10) {
        if (current.value % 2 === 0) {
            return 'bg-rose-600 border-rose-600'
        } else {
            return 'bg-amber-600 border-amber-600'
        }
    } else {
        return 'bg-sky-600 border-sky-600'
    }
})

const expand = ref(true)
const reader = (i: number, param: boolean) => readonly.value[i - 1] = param
const updatePoint = (i: number, param: boolean) => {
    !readonly.value[i - 1] ? emit('updatePoint', { idx: i - 1, point: input.value[i - 1], name: name.value[i - 1], reader: () => reader(i, param) }) : reader(i, param);
}
const violation = (idx: number, name: string) => {
    input.value[idx] -= vioscore.value;
    dis_vi.value[name]++
    toast.warning = true
    message.warning = `Pengurangan ${vioscore.value} poin untuk peserta ${name}`;
}

const disMin = computed(() => (quest?.value as any).disMin)
watch(disMin, () => {
    if (disMin.value.every((d: boolean) => d)) {
        notAnswer((quest?.value as any).index - 1);
        current.value = 0;
    }
}, { deep: true })
const disTemp = computed(() => (quest?.value as any).disTemp)

const minScore = (idx: number, name: string) => {
    input.value[idx] -= minscore.value;
    disMin.value[idx] = true;
    toast.warning = true
    message.warning = `Pengurangan ${minscore.value} poin untuk peserta ${name}`;
}
const undoMin = (idx: number, name: string) => {
    input.value[idx] += minscore.value;
    disMin.value[idx] = false;
    toast.success = true
    message.success = `Pengurangan ${minscore.value} poin untuk peserta ${name} dibatalkan`;
}

const justClose = () => {
    if (JSON.stringify(disTemp.value) !== JSON.stringify(disMin.value)) {
        input.value.forEach((i: number, idx: number) => {
            if (disMin.value[idx] !== disTemp.value[idx]) {
                disMin.value[idx] ? input.value[idx] += 5 : input.value[idx] -= 5
            }
        })
    }
    const more = (Object.values(dis_vi.value) as any).some((i: number) => i > 0)
    if (more) {
        input.value.forEach((i: number, idx: number) => {
            input.value[idx] += ((Object.values(dis_vi.value) as any)[idx] * vioscore.value)
        })
    }
    answerHandler.value = true
    current.value = 0
    if (more || JSON.stringify(disTemp.value) !== JSON.stringify(disMin.value)) {
        toast.success = true
        message.success = 'Semua pengubahan poin telah dibatalkan'
        for (const i in disTemp.value) disMin.value[i] = disTemp.value[i]
    }
}

const notAnswer = (q_idx: number) => {
    const changer = { before: (quest?.value as any).answer, after: 'NA' }
    if (changer.before == changer.after) justClose();
    else {
        if (isNaN((quest?.value as any).answer)) {
            if ((quest?.value as any).answer == 'NA') false;
            else input.value[name.value.indexOf((quest?.value as any).answer)] -= (quest?.value as any).point
        }
        emit('notAnswer', { q_idx, answer: 'NA', color: 'bg-white text-sky-600 border-sky-600', points: input.value, bonus: bonus.value, disMin: disMin.value, changer, point: (quest?.value as any).point })
    }
}

const answer = (q_idx: number, c_name: string, c_color: string, c_idx: number) => {
    const changer = { before: (quest?.value as any).answer, after: c_name }
    if (changer.before == changer.after) justClose();
    else {
        if (isNaN((quest?.value as any).answer)) {
            if ((quest?.value as any).answer == 'NA') false
            else input.value[name.value.indexOf((quest?.value as any).answer)] -= (quest?.value as any).point
        }
        input.value[c_idx] += (quest?.value as any).point
        emit('answer', { q_idx, answer: c_name, color: c_color, points: input.value, bonus: bonus.value, disMin: disMin.value, changer, point: (quest?.value as any).point })
        answerHandler.value = true
        current.value = 0
    }
}

const btn_transition = 'transition duration-500 transform-gpu hover:scale-y-110 active:scale-y-90'
const btn_color = 'bg-sky-200 text-sky-600 border-sky-600'
const dis_color = 'bg-stone-200 text-stone-600 border-stone-600 !cursor-not-allowed'
</script>

<template>
    <div class="px-[calc(.5rem+4vw)] py-[calc(4rem+4vw)] [&_button]:select-none">
        <div v-if="ale.state"
            class="relative bg-amber-100 text-amber-700 mb-8 p-3 pr-12 border-2 border-amber-700 font-bold rounded-md">
            Jaringanmu bermasalah. Silakan cek terlebih dahulu koneksi internetmu.<br />Pesan : {{ ale.state }}<br />
            {{ ale.message.length > 0 ? ale.message : '-' }}
            <i style="transition: .4s;" @click="emit('xalert')"
                class="fa-solid fa-xmark absolute h-full !grid place-items-center right-4 bottom-0 cursor-pointer text-xl hover:text-amber-900">
            </i>
        </div>
        <div>
            <p class="text-2xl text-center font-extrabold text-sky-600 leading-6">Babak Kuis<br />
                <em class="text-lg font-bold text-teal-500 leading-3">Mathematics Competition for
                    {{ is.includes('jh') ? 'Junior High' : is.includes('sh') ? 'Senior High' : 'Elementary' }} School
                </em>
            </p>
            <div class="flex justify-center gap-1 mt-4">
                <mark v-for="i in 12" class="w-10 h-1 -skew-x-[45deg] rounded odd:bg-sky-600 even:bg-teal-500">
                </mark>
                <div class="hidden">
                    <span class="border-emerald-600 bg-emerald-100"></span>
                    <span class="bg-rose-100"></span>
                    <span class="bg-amber-100"></span>
                    <span class="bg-sky-100"></span>
                    <span class="text-fuchsia-600 bg-fuchsia-100 border-fuchsia-600"></span>
                    <span class="text-orange-600 bg-orange-100 border-orange-600"></span>
                </div>
            </div>
        </div>
        <div
            class="flex flex-col lg:flex-row justify-center lg:justify-around items-center lg:items-start gap-10 mt-10 lg:mt-16 [&_mark]:h-10 [&_mark]:rounded-md [&_mark]:font-bold [&_mark]:text-sky-600 [&_mark]:text-lg [&_mark]:bg-sky-200 [&_mark]:grid [&_mark]:place-items-center">
            <section class="w-fit flex flex-col justify-center items-center">
                <div class="flex flex-col gap-4" :class="gap">
                    <mark class="w-[15.35rem] xs:w-[20rem]">Pilihan Soal</mark>
                    <div :class="loading.data ? 'grid' : 'flex'"
                        class="place-items-center flex-col h-[15.35rem] xs:h-[20rem]">
                        <Spinner v-if="loading.data" :width="52" is="blocks" fill1="fill-rose-600" fill2="fill-emerald-600"
                            fill3="fill-amber-600" />
                        <div v-else v-for="i in divider" class="flex">
                            <button v-for="j in divider" style="transition: .5s;"
                                :disabled="loading.quest[(i - 1) * divider + (j - 1)]"
                                @click="emit('getQuest', { idx: (((i - 1) * divider + (j - 1)) + 1), openboard: () => openboard() })"
                                :class="[width, (data as any).quest[(i - 1) * divider + (j - 1)]?.color, loading.quest[(i - 1) * divider + (j - 1)] ? 'cursor-not-allowed' : 'hover:scale-[1.075]']"
                                class="rounded-lg border-2 grid place-items-center font-semibold gap-3 transform-gpu active:scale-[0.925]">
                                <Spinner v-if="loading.quest[(i - 1) * divider + (j - 1)]" is="lazy-ring"
                                    stroke="stroke-indigo-600" :width="18" />
                                <span v-else>{{ (data as any).quest[(i - 1) * divider + (j - 1)]?.answer }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section
                class="w-full lg:w-fit flex flex-col sm:flex-row justify-center sm:justify-around items-center lg:items-start gap-10 [&>*]:flex [&>*]:flex-col [&>*]:gap-4 [&_mark]:w-[15.35rem] [&_mark]:xs:w-[20rem]">
                <div class="sm:w-full">
                    <mark class="sm:w-[100%] md:!min-w-full">Poin Peserta</mark>
                    <div :class="loading.data ? 'grid' : 'flex'"
                        class="place-items-center flex-col gap-3.5 h-[15.35rem] xs:h-[20rem]">
                        <Spinner v-if="loading.data" :width="52" is="blocks" fill1="fill-rose-600" fill2="fill-emerald-600"
                            fill3="fill-amber-600" />
                        <div v-else v-for="i in input.length"
                            class="w-[15.35rem] xs:w-[20rem] sm:w-full h-10 gap-2 lg:gap-2.5 lg:h-[2.604rem] flex">
                            <div class="relative w-full h-full">
                                <input type="text" :id="i" :name="i" :readonly="readonly[i - 1]"
                                    v-model.number="input[i - 1]"
                                    @keyup.enter="typeof (input[i - 1]) === 'number' ? updatePoint(i, true) : false"
                                    :class="readonly[i - 1] ? 'cursor-default' : 'hover:border-sky-700 focus:ring-2 focus:border-sky-700'"
                                    class="h-full w-full border-2 border-sky-600 bg-white rounded-md focus:outline-none focus:ring-opacity-50 focus:ring-sky-500 text-sky-600 font-medium pr-2 pl-[3rem] light" />
                                <label :for="i"
                                    class="w-[2.5rem] border-2 border-sky-600 text-sky-600 font-bold h-full absolute top-0 left-0 rounded-l-md grid place-items-center">
                                    <Spinner v-if="loading.point[i - 1]" is="lazy-ring" stroke="stroke-sky-600"
                                        :width="18" />
                                    <span v-else>{{ name[i - 1] }}</span>
                                </label>
                            </div>
                            <button :id="`edit-${name[i]}`" :aria-label="`edit-${name[i]}`"
                                :disabled="(typeof (input[i - 1]) !== 'number') || loading.point[i - 1]"
                                style="transition: .4s;" @click="updatePoint(i, !readonly[i - 1])"
                                class="fa-solid h-full min-w-[2.5rem] rounded-md border-2 text-white"
                                :class="readonly[i - 1] ? 'fa-pen bg-sky-600 border-sky-600 hover:bg-sky-700 active:bg-sky-600' : `fa-floppy-disk ${typeof (input[i - 1]) !== 'number' || loading.point[i - 1] ? 'bg-stone-300 border-stone-600 hover:bg-stone-300 active:bg-stone-300 !text-stone-600 cursor-not-allowed' : 'bg-amber-600 border-amber-600 hover:bg-amber-700 active:bg-amber-600'}`"></button>
                        </div>
                    </div>
                </div>
                <div>
                    <mark class="md:!w-[16rem]">Warna Indikator</mark>
                    <div :class="loading.data ? 'grid' : 'flex'"
                        class="place-items-center flex-col gap-3.5 h-[15.35rem] xs:h-[20rem]">
                        <Spinner v-if="loading.data" :width="52" is="blocks" fill1="fill-rose-600" fill2="fill-emerald-600"
                            fill3="fill-amber-600" />
                        <div v-else v-for="color, i in colormap" :key="i" :class="color.color"
                            class="w-[15.35rem] xs:w-[20rem] md:w-[16rem] h-10 lg:h-[2.604rem] border-[3px] rounded-md font-extrabold grid place-items-center">
                            {{ color.name }}</div>
                    </div>
                </div>
            </section>
        </div>
        <section class="fixed z-[2] h-screen w-screen bg-[#bae5fd46] top-0 left-0 p-[calc(.5rem+4vw)]"
            :class="board.container ? 'block' : 'hidden'" style="transition: .1s; transition-delay: .1s;">
            <div :class="board.box ? 'scale-100' : 'scale-0'" style="transition: .3s;"
                class="w-full h-full bg-white rounded-md flex items-center justify-center shadow-[0_1px_16px_0] shadow-sky-300 relative">
                <div class="absolute -top-[calc(.75rem+1vw)] left-[calc(50%-3rem)]">
                    <div class="relative group">
                        <Circle :percent="percentage()" :current="current" :color="colorize" />
                        <div class="absolute z-[1] grid place-items-center w-20 h-20 left-2 top-0">
                            <div class="w-[3.4rem] h-[3.4rem] bg-sky-600 rounded-full grid place-items-center font-bold text-sm text-white opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer hover:bg-sky-700 active:bg-sky-600"
                                @click="justClose">✕</div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full h-full relative rounded-md overflow-hidden [&>.des]:absolute [&>.des]:-top-[4.5rem] [&>.des]:w-36 [&>.des]:h-36 [&>.des]:bg-sky-200 [&>.des]:text-sky-600 [&>.des]:grid [&>.des]:place-items-center [&>.des]:rounded-full [&>.des]:font-extrabold [&>.des]:text-lg">
                    <div class="-left-[4.5rem] des">
                        <span class="translate-y-8 translate-x-7">{{ (quest as any)?.answer }}</span>
                    </div>
                    <div class="-right-[4.5rem] des">
                        <span class="translate-y-8 -translate-x-8 text-center">
                            Poin :<br />&emsp13;{{ (quest as any)?.point }}</span>
                    </div>
                    <div class="w-full h-[calc(100%-5rem)] absolute bottom-0 flex flex-col justify-between gap-6">
                        <div class="px-[3vw] mt-5 mb-2 overflow-y-auto" style="transition: .5s;"
                            :style="`min-height: calc(100% - ${expand ? '27' : '3'}.25rem)`">
                            <div class="w-full text-sky-700 font-medium ql-snow">
                                <div class="ql-editor" v-html="(quest as any)?.question"></div>
                            </div>
                        </div>
                        <div
                            class="min-h-[22.125rem] sm:min-h-[11.625rem] relative flex flex-col sm:flex-row p-[calc(.55rem+.5vw)] gap-4 border-t-2 border-sky-600 [&_.btn]:rounded [&_.btn]:font-semibold [&_.btn]:text-xs xs:[&_.btn]:text-sm [&_.btn]:border-2 [&_.btn]:">
                            <span style="transition: .4s;" @click="expand = !expand"
                                class="transform-gpu w-12 h-5 group absolute -top-5 left-[calc(50%-1.5rem)] cursor-pointer border-b-2 border-sky-600 bg-sky-600 hover:bg-sky-700 active:bg-sky-600 text-white grid place-items-center rounded-t-full">
                                <i class="fa-solid fa-chevron-up" style="transition: .4s"
                                    :class="expand ? 'rotate-180 -translate-y-[0.05rem] group-hover:translate-y-[0.05rem]' : 'translate-y-[0.2rem] group-hover:translate-y-[0.1rem]'"></i>
                            </span>
                            <div class="flex flex-col justify-between">
                                <span class="h-[2rem] text-sm font-bold text-rose-600 grid place-items-center">
                                    Pelanggaran Tata Tertib</span>
                                <div class="flex flex-col gap-2.5">
                                    <div v-for="i in 3" class="flex gap-2.5 [&>*]:h-8">
                                        <button v-for="j in 2" :class="btn_transition"
                                            @click="violation(((i - 1) * 2 + (j - 1)), name[(i - 1) * 2 + (j - 1)])"
                                            class="btn w-full sm:w-[5.5rem] bg-rose-200 text-rose-600 border-2 border-rose-600">
                                            {{ name[(i - 1) * 2 + (j - 1)] }} - 10</button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex w-full flex-col gap-2.5 [&>div]:flex [&>div]:gap-2.5 [&_.btn]:w-full">
                                <div v-for="i in 3" class="flex gap-2.5">
                                    <button v-for="j in 6" :disabled="i == 3 ? !disMin[j - 1] : disMin[j - 1]"
                                        @click="i == 2 ? minScore(j - 1, name[j - 1]) : i == 3 ? undoMin(j - 1, name[j - 1]) : answer(((quest as any).index - 1), name[j - 1], color[j - 1], j - 1)"
                                        :class="[i == 3 ? 'h-10 xs:h-8 ' + (disMin[j - 1] ? `cursor-pointer ${btn_transition} ${btn_color}` : dis_color) : 'h-8 ' + (disMin[j - 1] ? dis_color : `cursor-pointer ${btn_transition} ${btn_color}`)]"
                                        class="btn flex flex-col xs:flex-row items-center justify-center xs:gap-1">
                                        <span v-if="i == 3" class="fa-solid fa-arrow-rotate-left text-xs"></span>
                                        {{ name[j - 1] }}{{ i == 1 ? '+' : i == 2 ? '-' : '' }}</button>
                                </div>
                                <div class="[&>*]:h-8">
                                    <button class="btn min-w-[57.5%]" :class="[btn_transition, btn_color]"
                                        @click="current = 0">Hentikan
                                        Waktu</button>
                                    <button class="btn" :class="[btn_transition, btn_color]"
                                        @click="justClose">Kembali</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="toast[is]" :text="message[is]" />
    </div>
</template>

<style scoped>
.light:-webkit-autofill,
.light:-webkit-autofill:hover,
.light:-webkit-autofill:focus,
.light:-webkit-autofill:active {
    caret-color: #0284C7 !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #0284C7 !important;
}
</style>