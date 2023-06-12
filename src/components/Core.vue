<script setup lang="ts">
import { reactive, onMounted, toRefs } from 'vue'
import Menu from './Menu.vue';
import Main from './Main.vue';
import Toast from './Toast.vue';
import Modal from './Modal.vue';
import { useContest } from "@/api/contest"

const { data, quest, msg, decision, getData, getQuest, setAnswer, setPoint, reset } = useContest()

const message: any = reactive({ info: '', error: '', warning: '' });
const toast: any = reactive({ info: false, error: false, warning: false });
const modal: any = reactive({ success: false, info: false, warning: false, error: false })
const text: any = reactive({ success: '', info: '', warning: '', error: '' })
const title: any = ['Pemindahan Bonus', 'Poin Bonus', 'Pembatalan Bonus']

const emit = defineEmits(['onx'])
const props = defineProps({
    is: {
        type: String,
        default: 'mces'
    },
    state: {
        type: Boolean,
        default: false
    }
})

const { is, state } = toRefs(props)

const load = reactive({
    data: false,
    reset: false,
    quest: [...Array(is.value == 'mces' ? 25 : 16)].map((_, i) => false),
    point: [...Array(6)].map((_, i) => false),
})
const alert = reactive({
    state: state.value,
    message: message.warning
})
onMounted(async () => {
    load.data = true
    await getData({ is: is.value })
    load.data = false
})

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
    const name = ['A', 'B', 'C', 'D', 'E', 'F']
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
</script>

<template>
    <Menu :disabled="disabled()" :loading="load.reset" @reset="openReset()" />
    <Main :is="is" :alert="alert" :loading="load" :data="data" :quest="quest" @update-point="update" @get-quest="getQuests"
        @answer="answerKit" @not-answer="answerKit" @xalert="emit('onx')" />
    <Modal v-for="is, i in ['success', 'info', 'warning']" :is="is" v-model="modal[is]" :title="title[i]"
        :with-confirm="false" close-text="Mengerti">{{ text[is] }}
    </Modal>
    <Modal is="error" v-model="modal.error" title="Reset Kuis" @confirm="onReset()" confirm-text="Ya, Reset"
        close-text="Jangan Reset">{{ text.error }}</Modal>
    <Toast v-for="is, i in ['info', 'error', 'warning']" :is="is" v-model="toast[is]" :text="message[is]" />
</template>