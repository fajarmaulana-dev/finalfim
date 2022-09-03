<script setup>
import { ref, reactive, watch, toRefs, computed } from 'vue';
import Progress from '@/components/Progress.vue';
import Overlay from '@/components/Overlay.vue';
import Button from '@/components/Button.vue';

const props = defineProps({
    ['quests']: Array,
    ['contestants']: Array,
    bonus: {
        type: Number,
        default: 20
    },
    countDown: {
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
    is: {
        type: String,
        default: 'mces'
    },
    title: {
        type: String,
        default: 'Mathematics Competition for Elementary School'
    }
})

const { quests, contestants, bonus, countDown, minscore, vioscore, is, title } = toRefs(props);

const countDown_var = ref();
watch(countDown, () => countDown_var.value = countDown.value)

const selected = ref();
const responses = ref([]);

const countDownTimer = () => {
    if (countDown_var.value > 0) {
        setTimeout(() => {
            countDown_var.value -= 1;
            countDownTimer();
        }, 1000)
    }
}

const percentage = () => {
    return countDown_var.value / 120;
}

const display = reactive({
    container: false,
    box: false,
    warning: false,
    info: false,
    error: false,
    success: false,
    itoast: false,
    wtoast: false,
    etoast: false,
    stoast: false,
    modalContainer: false,
    modal: false,
});

const openModal = () => {
    display.modalContainer = true;
    setTimeout(() => {
        display.modal = true;
    }, 100);
}

const closeModal = () => {
    display.modal = false;
    setTimeout(() => {
        display.modalContainer = false;
    }, 300);
}

const openQuest = (e) => {
    selected.value = e;
    display.container = true;
    setTimeout(() => {
        display.box = true;
    }, 100);
    countDown_var.value = 120;
    countDownTimer();
}

const closeQuest = () => {
    display.box = false;
    setTimeout(() => {
        display.container = false;
    }, 300);
}

const openwToast = () => {
    display.warning = true;
    setTimeout(() => {
        display.wtoast = true;
    }, 100);
    setTimeout(() => {
        display.wtoast = false;
    }, 2500);
    setTimeout(() => {
        display.warning = false;
    }, 3100);
}

const openiToast = () => {
    display.info = true;
    setTimeout(() => {
        display.itoast = true;
    }, 100);
    setTimeout(() => {
        display.itoast = false;
    }, 2500);
    setTimeout(() => {
        display.info = false;
    }, 3100);
}

const openeToast = () => {
    display.error = true;
    setTimeout(() => {
        display.etoast = true;
    }, 100);
    setTimeout(() => {
        display.etoast = false;
    }, 2500);
    setTimeout(() => {
        display.error = false;
    }, 3100);
}

const opensToast = () => {
    display.success = true;
    setTimeout(() => {
        display.stoast = true;
    }, 100);
    setTimeout(() => {
        display.stoast = false;
    }, 2500);
    setTimeout(() => {
        display.success = false;
    }, 3100);
}

watch(countDown_var, () => {
    if (countDown_var.value === 0) {
        if (arrLength.value === responses.value.length) {
            notAnswered(selected.value);
            arrLength.value += 1;
        }
        closeQuest();
        disAdd.value = [false, false, false, false, false, false];
        disBtn.value = [false, false, false, false, false, false];
        const b = responses.value.map(a => a.answerer)[responses.value.length - 1];
        if (b === 'NA') { openwToast(); arrLength.value -= 1; };
        if (b === 'A' || b === 'B' || b === 'C' || b === 'D' || b === 'E' || b === 'F') { openiToast(); arrLength.value -= 1; }
        if (b === '') { arrLength.value -= 1; }
    }
})

const i_model = ref([contestants.value[0].score, contestants.value[1].score, contestants.value[2].score, contestants.value[3].score, contestants.value[4].score, contestants.value[5].score,])

const mod0 = ref();
const mod1 = ref();
const mod2 = ref();
const mod3 = ref();
const mod4 = ref();

const less0 = ref();
const less1 = ref();
const less2 = ref();
const less3 = ref();
const less4 = ref();

const mod61 = ref();
const mod41 = ref();

const filtered = () => quests.value.filter((e) => e.index === selected.value);
const arrLength = ref(responses.value.length);
let divider; is.value === 'mces' ? divider = 5 : divider = 4;
const answer = (e, f, g, h) => {
    responses.value.push({ answered: e, answerer: f });
    arrLength.value += 1;
    quests.value[e - 1].value = f;
    quests.value[e - 1].bg = `${g}-400`
    quests.value[e - 1].font = `${g}-700`
    quests.value[e - 1].border = `${g}-600`
    i_model.value[h] += quests.value[e - 1].score;

    const filt = (mod) => responses.value.filter(a => a.answered % divider === mod);
    if (filt(0).length === divider) { mod0.value.click() }
    if (filt(1).length === divider) { mod1.value.click() }
    if (filt(2).length === divider) { mod2.value.click() }
    if (filt(3).length === divider) { mod3.value.click() }

    const filt1 = (less) => responses.value.filter(a => a.answered / divider > less && a.answered / divider <= (less + 1));
    if (filt1(0).length === divider) { less0.value.click() }
    if (filt1(1).length === divider) { less1.value.click() }
    if (filt1(2).length === divider) { less2.value.click() }
    if (filt1(3).length === divider) { less3.value.click() }

    if (responses.value.filter(a => a.answered % (divider + 1) === 1).length === divider) { mod61.value.click() }
    if (is.value === 'mces') {
        if (filt(4).length === divider) { mod4.value.click() }
        if (filt1(4).length === divider) { less4.value.click() }
        if (responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1 || a.answered === 13).length === divider) { mod41.value.click() }
    } else {
        if (responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1).length === divider) { mod41.value.click() }
    }
}

const disMod = ref([false, false, false, false, false]);
const addMod = (mod) => {
    const ans = responses.value.filter(a => a.answered % divider === mod);
    for (let i = 0; i < contestants.value.length; i++) {
        if (ans.every(a => a.answerer === contestants.value[i].name)) {
            i_model.value[i] += bonus.value;
            disMod.value[mod] = true;
        }
    }
    openModal();
}

const disLess = ref([false, false, false, false, false]);
const addLess = (less) => {
    const ans = responses.value.filter(a => a.answered / divider > less && a.answered / divider <= (less + 1));
    for (let i = 0; i < contestants.value.length; i++) {
        if (ans.every(a => a.answerer === contestants.value[i].name)) {
            i_model.value[i] += bonus.value;
            disLess.value[less] = true;
        }
    }
    openModal();
}

const disDiag = ref([false, false]);
const addDiag1 = () => {
    const ans = responses.value.filter(a => a.answered % (divider + 1) === 1);
    for (let i = 0; i < contestants.value.length; i++) {
        if (ans.every(a => a.answerer === contestants.value[i].name)) {
            i_model.value[i] += bonus.value;
            disDiag.value[0] = true;
        }
    }
    openModal();
}
const addDiag2 = () => {
    const ans = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1 || a.answered === 13);
    const ans1 = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1);
    for (let i = 0; i < contestants.value.length; i++) {
        if (is.value === 'mces') {
            if (ans.every(a => a.answerer === contestants.value[i].name)) {
                contestants.value[i].score += bonus.value;
                disDiag.value[1] = true;
            }
        } else {
            if (ans1.every(a => a.answerer === contestants.value[i].name)) {
                contestants.value[i].score += bonus.value;
                disDiag.value[1] = true;
            }
        }
    }
    openModal()
}

const disBtn = ref([false, false, false, false, false, false]);
const disAdd = ref([false, false, false, false, false, false]);

const notAnswered = (e) => {
    responses.value.push({ answered: e, answerer: 'NA' });
    quests.value[e - 1].value = 'NA';
    quests.value[e - 1].bg = `--light`
    quests.value[e - 1].font = `--primary`
    quests.value[e - 1].border = `--primary`
    arrLength.value += 1;
}

const justClose = () => {
    responses.value.push({ answered: '', answerer: '' });
    arrLength.value += 1;
}

const err_message = ref();
const minScore = (e, f) => {
    i_model.value[e] -= minscore.value;
    disBtn.value[e] = true;
    disAdd.value[e] = true;
    err_message.value = `Pengurangan ${minscore.value} poin untuk peserta ${f}`;
    openeToast();
}

const undo_message = ref();
const undoMin = (e, f) => {
    i_model.value[e] += minscore.value;
    disBtn.value[e] = false;
    disAdd.value[e] = false;
    undo_message.value = `Pengurangan ${minscore.value} poin untuk peserta ${f} dibatalkan`;
    opensToast();
}

const violation = (e, f) => {
    i_model.value[e] -= vioscore.value;
    err_message.value = `Pengurangan ${vioscore.value} poin untuk peserta ${f}`;
    openeToast()
}

const expand = ref(false);
const colorize = computed(() => {
    if (countDown_var.value > 10 && countDown_var.value <= 30) {
        return 'yellow-600'
    } else if (countDown_var.value > 0 && countDown_var.value <= 10) {
        if (countDown_var.value % 2 === 0) {
            return 'red-600'
        } else {
            return 'yellow-600'
        }
    } else {
        return 'blue-600'
    }
})
</script>

<template>
    <div :id="is" style="padding: 0 5vw; display: grid; place-items: center; width: 100%; height: 100%;">
        <div class="main">
            <h2 style="font-size: var(--title); line-height: 2rem;">Babak Kuis</h2>
            <em>{{ title }}</em>
            <div>
                <button ref="mod1" @click="addMod(1);" :disabled="disMod[1] === true ? true : false"></button>
                <button ref="mod2" @click="addMod(2)" :disabled="disMod[2] === true ? true : false"></button>
                <button ref="mod3" @click="addMod(3)" :disabled="disMod[3] === true ? true : false"></button>
                <button v-if="is === 'mces'" ref="mod4" @click="addMod(4)"
                    :disabled="disMod[4] === true ? true : false"></button>
                <button ref="mod0" @click="addMod(0)" :disabled="disMod[0] === true ? true : false"></button>
                <button ref="less1" @click="addLess(1)" :disabled="disLess[1] === true ? true : false"></button>
                <button ref="less2" @click="addLess(2)" :disabled="disLess[2] === true ? true : false"></button>
                <button ref="less3" @click="addLess(3)" :disabled="disLess[3] === true ? true : false"></button>
                <button v-if="is === 'mces'" ref="less4" @click="addLess(4)"
                    :disabled="disLess[4] === true ? true : false"></button>
                <button ref="less0" @click="addLess(0)" :disabled="disLess[0] === true ? true : false"></button>
                <button ref="mod61" @click="addDiag1()" :disabled="disDiag[0] === true ? true : false"></button>
                <button ref="mod41" @click="addDiag2()" :disabled="disDiag[1] === true ? true : false"></button>
            </div>
            <div class="content">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <h2>Pilihan Soal</h2>
                    <div class="questions">
                        <button v-for="val in quests" :key="val.index" @click="openQuest(val.index)"
                            :style="`background-color: var(${val.bg}); color: var(${val.font}); border-color: var(${val.border}); max-width: ${is === 'mces' ? '3.5' : '4.5'}rem; max-height: ${is === 'mces' ? '3.5' : '4.5'}rem`">
                            {{ val.value }}</button>
                    </div>
                </div>
                <div class="action">
                    <div style="width: 100%;">
                        <h2>Skor Peserta</h2>
                        <div>
                            <div v-for="(i, index) in contestants" :key="i"
                                style="height: calc(100%/8); position: relative;">
                                <label>Peserta {{ i.name }}&nbsp;&nbsp;:</label>
                                <input type="text" v-model.number="i_model[index]" />
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%;" class="color">
                        <h2></h2>
                        <div>
                            <div v-for="i in contestants" :key="i"
                                style="height: calc(100%/8); border: 3px solid; border-radius: .5rem;"
                                :style="`background: var(${i.color}-400); border-color: var(${i.color}-600)`">
                                <p :style="`color: var(${i.color}-700) !important`">{{ i.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" :class="{ 'dis-none': !display.container, 'dis-flex': display.container }">
            <div class="time" :class="{ 'quest-disapp': !display.box, 'quest-app': display.box }">
                <h4 :style="`color: var(--${colorize})`">Sisa Waktu (s)</h4>
                <Progress :withImage="false" :percent="percentage()" :current="countDown_var" :color="colorize" />
            </div>
            <div class="question" :class="{ 'quest-disapp': !display.box, 'quest-app': display.box }">
                <div class="pend" style="left: 0;">
                    <img src="@/assets/keping.png" alt="nomor">
                    <span style="left: -.6rem;">{{ filtered().map(e => e.value)[0] }}</span>
                </div>
                <div class="pend" style="right: 0;">
                    <img src="@/assets/keping.png" alt="nomor" style="transform: scaleX(-1);">
                    <span style="right: -.6rem; text-align: center;">{{ filtered().map(e => e.score)[0]
                    }}<br />pt</span>
                </div>
                <div class="text" :style="`max-height: ${expand === true ? 'calc(29vh + 4vw)' : '57.5vh'}`">
                    <div style="width: 100%" v-html="filtered().map(e => e.question)[0]"></div>
                </div>
                <div class="options" :style="`transform: translateY(${expand === true ? '0' : '24vh'})`">
                    <span @click="expand = !expand">
                        <i class="fa-solid fa-chevron-down"
                            :style="expand === true ? '' : 'transform: rotate(180deg)'"></i>
                    </span>
                    <div class="violation">
                        <h4>Pelanggaran<br />Tata Tertib</h4>
                        <div>
                            <button v-for="(contestant, index) in contestants" :key="contestant.name"
                                @click="violation(index, contestant.name)">{{ contestant.name }} - {{ vioscore
                                }}</button>
                        </div>
                    </div>
                    <div class="attenders">
                        <div>
                            <div>
                                <button v-for="(contestant, index) in contestants" :key="contestant.name"
                                    :class="{ disButton: disAdd[index] }" :disabled="disAdd[index]"
                                    @click="answer(filtered().map(e => e.index)[0], contestant.name, contestant.color, index); arrLength += 1; countDown_var = 0">
                                    {{ contestant.name }}+
                                </button>
                            </div>
                            <div>
                                <button v-for="(contestant, index) in contestants" :key="contestant.name"
                                    :disabled="disBtn[index]" @click="minScore(index, contestant.name)"
                                    :class="{ disButton: disBtn[index] }">
                                    {{ contestant.name }}-
                                </button>
                            </div>
                            <div>
                                <button v-for="(contestant, index) in contestants" :key="contestant.name"
                                    :disabled="!disBtn[index]" @click="undoMin(index, contestant.name)"
                                    :class="{ disButton: !disBtn[index] }">
                                    <i class="fa-solid fa-arrow-rotate-left" style="font-size: var(--mini-icon);"></i>
                                    {{ contestant.name }}
                                </button>
                            </div>
                        </div>
                        <div class="blank">
                            <button
                                @click="notAnswered(filtered().map(e => e.index)[0]); arrLength += 1; countDown_var = 0"
                                style="height: 62%;">Tak Terjawab</button>
                            <button style="height: 28%;"
                                @click="justClose(); arrLength += 1; countDown_var = 0">Kembali</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Overlay is="toast" :container="display.info" :box="display.itoast"
            :message="`Selamat. Tambahan ${quests.map(a => a.score)[selected - 1]} poin untuk peserta ${responses.map(a => a.answerer)[responses.length - 1]}`" />
        <Overlay is="toast" type="warning" :container="display.warning" :box="display.wtoast"
            :message="`Soal nomor ${selected} tidak terjawab`" />
        <Overlay is="toast" type="error" :container="display.error" :box="display.etoast" :message="err_message" />
        <Overlay is="toast" type="success" :container="display.success" :box="display.stoast" :message="undo_message" />
        <Overlay type="success" :with-confirm="false" :container="display.modalContainer" :box="display.modal"
            @close-modal="closeModal()" title="Poin Bonus !" closeText="OK">
            <b>Peserta {{ responses.map(a => a.answerer)[responses.length - 1] }}</b> memperoleh bonus poin
            sebanyak <b>{{ bonus }} poin</b>.
        </Overlay>
    </div>
</template>

<style scoped>
.disButton {
    background-color: var(--gray-300) !important;
    color: var(--gray-600) !important;
    border: 2px solid var(--gray-600) !important;
    cursor: not-allowed !important;
}

.disButton:hover,
.disButton:active {
    color: var(--gray-600) !important;
    border: 2px solid var(--gray-600) !important;
    transform: scaleY(1) !important;
}

.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 5rem 0 10rem 0;
}

.main>em {
    font-size: var(--card-title);
    color: var(--warning);
    text-align: center;
    font-weight: 700;
}

.main>div>button {
    width: 5vw;
    max-width: 2.5rem;
    margin: 0 .15rem;
    height: .25rem;
    border: none;
    background-color: var(--primary);
    transform: skew(-45deg);
    border-radius: .25rem;
}

.main>div>button:nth-child(2n) {
    background-color: var(--warning);
}

.content {
    display: flex;
    width: 100%;
    margin-top: 5vw;
    justify-content: space-around;
    gap: 2.5rem;
}

.content>div>h2 {
    font-size: var(--card-title);
    color: var(--primary);
    padding: .5rem 0;
    width: 100%;
    max-width: 20rem;
    background-color: var(--blue-400);
    border-radius: .5rem;
    text-align: center;
    margin-bottom: 1rem;
}

.questions {
    width: 90vw;
    max-width: 20rem;
    height: 90vw;
    max-height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: .625rem
}

.questions>button {
    width: 15vw;
    height: 15vw;
    border: 2px solid;
    font-weight: 700;
    font-size: var(--sub-title);
    border-radius: .5rem;
    cursor: pointer;
    transition: .5s;
}

.questions>button:hover {
    transform: scale(1.1);
    border-width: 3px;
}

.questions>button:active {
    transform: scale(.9);
}

.action {
    font-size: var(--card-title);
    display: flex;
    width: 90vw;
    max-width: 32.5rem;
    height: 20rem;
    justify-content: space-around;
    gap: 2.5rem;
}

.action>div>h2 {
    font-size: var(--card-title);
    color: var(--primary);
    padding: .5rem 0;
    width: 100%;
    background-color: var(--blue-400);
    border-radius: .5rem;
    text-align: center;
    margin-bottom: 1rem;
}

.action>div>div {
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: space-around;
}

.action label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1rem;
    display: flex;
    align-items: center;
    font-weight: 700;
}

.action input {
    font-size: var(--card-title);
    height: 100%;
    width: 100%;
    padding: 0 .6rem 0 9rem;
    border: 1px solid var(--primary);
    outline: none;
    border-radius: .5rem;
    color: var(--primary);
    background-color: var(--light);
    -webkit-text-fill-color: var(--primary);
    font-weight: 700;
    transition: .5s;
}

.action input:hover {
    border-color: var(--blue-600);
    border-width: 2px;
    transition-delay: .1s;
}

.action input:focus {
    box-shadow: 0 0 3px 3px var(--blue-400);
}

.color h2::after {
    content: 'Warna Indikator';
}

.color p {
    font-weight: 700;
    display: grid;
    place-items: center;
    height: 100%;
}

.overlay {
    position: fixed;
    z-index: 102;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--blue-trans);
    justify-content: center;
    align-items: center;
}

.dis-flex {
    display: flex;
}

.dis-none {
    display: none
}

.quest-app {
    transform: scale(1);
}

.quest-disapp {
    transition-delay: 0s !important;
    transform: scale(0);
}

.text {
    margin: 5.5rem 1.5rem;
    padding-bottom: 2rem;
    line-height: 1.75rem;
    font-size: var(--card-title);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    position: relative;
    transition: .5s;
}

.question {
    position: relative;
    width: 90%;
    height: 80%;
    background-color: var(--light);
    border-radius: .5rem;
    box-shadow: 0 0 8px 2px var(--blue-400);
    transition: transform .3s;
    overflow: hidden;
}

.pend {
    position: absolute;
    top: 0;
    width: 5rem;
}

.pend>img {
    width: 100%;
    border-top-left-radius: .5rem;
}

.pend>span {
    position: absolute;
    height: 100%;
    width: 100%;
    top: -.4rem;
    font-weight: 700;
    font-size: 1.25rem;
    display: grid;
    place-items: center;
}

.time {
    position: absolute;
    top: 1.5rem;
    left: calc(50% - 3.45rem);
    z-index: 5;
    transition: .1s;
    transition-delay: .1s;
}

.time h4 {
    position: absolute;
    top: 6.25rem;
    left: 0;
    text-align: center;
    font-size: .75rem;
    width: 100%;
}

.options {
    position: absolute;
    height: 23vh;
    padding-top: .5rem;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    display: flex;
    gap: 1rem;
    border-top: 2px solid var(--blue-500);
    transition: .5s;
}

.options>span {
    position: absolute;
    width: 4rem;
    height: 2rem;
    padding: .25rem 0;
    font-size: .75rem;
    background-color: var(--blue-500);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-weight: 700;
    color: var(--light);
    border-radius: 100%;
    top: -1.1rem;
    left: calc(50% - 2rem);
    z-index: -1;
    cursor: pointer;
}

.options>span>i {
    transition: .5s;
    transition-delay: .6s;
}

.options>span:hover {
    background-color: var(--primary);
}

.options>span::before {
    content: '';
    position: absolute;
    width: 4rem;
    height: .95rem;
    background-color: var(--light);
    bottom: 0;
}

.violation {
    height: 100%;
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: .65rem;
}

.violation>h4 {
    text-align: center;
    font-size: var(--card-detail);
    width: 100%;
    color: var(--red-600);
    font-weight: 700;
    height: 20%;
}

.violation>div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 75%;
    gap: .5rem;
}

.violation button {
    width: 45%;
    height: 28.5%;
    font-size: var(--mini-icon);
    background-color: var(--red-300);
    border: 2px solid var(--red-500);
    border-radius: .25rem;
    font-weight: 700;
    color: var(--red-600);
    transition: .5s;
    cursor: pointer;
}

.violation button:hover {
    transform: scaleY(1.1);
    border-width: 3px;
    border-color: var(--red-700);
    color: var(--red-700);
}

.violation button:active {
    transform: scaleY(.9);
    border-width: 3px;
}

.attenders {
    width: 90%;
    display: flex;
    gap: .75rem;
    height: 100%;
}

.attenders>div {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .65rem;
}

.attenders>div:not(.blank) {
    width: 80%;
}

.attenders>div>div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: .5rem;
    height: 29.5%;
}

.attenders>div>div>button,
.blank button {
    width: 100%;
    background-color: var(--blue-300);
    border: 2px solid var(--primary);
    color: var(--primary);
    border-radius: .25rem;
    font-size: var(--mini-icon);
    font-weight: 700;
    transition: .5s;
    cursor: pointer;
}

.attenders>div>div>button:hover,
.blank button:hover {
    transform: scaleY(1.1);
    border-width: 3px;
    border-color: var(--blue-700);
    color: var(--blue-700);
}

.attenders>div>div>button:active,
.blank button:active {
    transform: scaleY(.9);
    border-width: 3px;
}

@media all and (max-width: 1023px) {
    .content {
        flex-direction: column;
    }

    .action {
        min-width: 100% !important;
    }

    .color {
        width: 15rem !important;
    }

    .action input {
        padding-left: 27.5vw !important;
    }
}

@media all and (max-width: 639px) {
    .attenders {
        flex-direction: column;
        gap: .65rem;
    }

    .attenders>div {
        flex-direction: row;
        height: 22.5% !important;
        width: 100% !important;
    }

    .attenders>div:not(.blank) {
        height: 77.5% !important;
        flex-direction: column;
    }

    .attenders>div>div {
        height: 26%;
    }

    .blank button {
        height: 100% !important;
    }
}

@media all and (max-width: 389px) {
    .color h2::after {
        content: 'Indikator' !important;
    }

    .action input {
        padding-left: 6.5rem !important;
    }

    .action {
        gap: 1rem !important;
    }

    .color {
        width: 9rem !important;
    }

    .content {
        margin-top: 2rem !important;
    }

    .violation {
        width: 5rem;
        gap: .25rem;
    }

    .options {
        gap: .5rem;
    }

    .violation>h4 {
        font-size: .5rem;
    }

    .violation button {
        font-size: .45rem;
        width: 35%;
    }
}
</style>