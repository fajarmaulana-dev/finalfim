<script setup>
import { ref, watch, toRefs, computed } from 'vue';
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

const modal = ref([
    { container: false, box: false },
    { container: false, box: false },
])

const toast = ref([
    { container: false, box: false },
    { container: false, box: false },
    { container: false, box: false },
    { container: false, box: false },
])

const openModal = (i) => {
    modal.value[i].container = true;
    setTimeout(() => {
        modal.value[i].box = true;
    }, 100);
}

const closeModal = (i) => {
    modal.value[i].box = false;
    setTimeout(() => {
        modal.value[i].container = false;
    }, 300);
    
}

const openQuest = (e) => {
    selected.value = e;
    openModal(0);
    countDown_var.value = 120;
    countDownTimer();
}

const openToast = (i) => {
    toast.value[i].container = true;
    setTimeout(() => {
        toast.value[i].box = true;
    }, 100);
    setTimeout(() => {
        toast.value[i].box = false;
    }, 2500);
    setTimeout(() => {
        toast.value[i].container = false;
    }, 3100);
}

watch(countDown_var, () => {
    if (countDown_var.value === 0) {
        if (arrLength.value === responses.value.length) {
            notAnswered(selected.value);
            arrLength.value += 1;
        }
        closeModal(0);
        disAdd.value = [false, false, false, false, false, false];
        disBtn.value = [false, false, false, false, false, false];
        const b = responses.value.map(a => a.answerer)[responses.value.length - 1];
        if (b === 'NA') { openToast(0); arrLength.value -= 1; };
        if (b === 'A' || b === 'B' || b === 'C' || b === 'D' || b === 'E' || b === 'F') { openToast(1); arrLength.value -= 1; }
        if (b === '') { arrLength.value -= 1; }
    }
})

const i_model = ref([contestants.value[0].score, contestants.value[1].score, contestants.value[2].score, contestants.value[3].score, contestants.value[4].score, contestants.value[5].score,])

const mod = ref([]);
const less = ref([]);

const mod61 = ref();
const mod41 = ref();

const filtered = () => quests.value.filter((e) => e.index === selected.value);
const arrLength = ref(responses.value.length);
let divider; is.value === 'mces' ? divider = 5 : divider = 4;
const answer = (e, f, g, h) => {
    const a = responses.value.map(k => k.answered);
    if (a.includes(e)) {
        responses.value.splice(a.indexOf(e), 1);
    }
    responses.value.push({ answered: e, answerer: f });
    arrLength.value += 1;
    quests.value[e - 1].value = f;
    quests.value[e - 1].bg = `${g}-400`;
    quests.value[e - 1].font = `${g}-700`;
    quests.value[e - 1].border = `${g}-600`;
    i_model.value[h] += quests.value[e - 1].score;

    const filt = (mod) => responses.value.filter(a => a.answered % divider === mod);
    const ever = (mod) => filt(mod).length === divider && filt(mod).every(a => a.answerer === filt(mod).map(k => k.answerer)[0]);
    for (let i = 0; i < (divider - 1); i++) {
        if (ever(i)) { mod.value[i].click() }
    }

    const filt1 = (less) => responses.value.filter(a => a.answered / divider > less && a.answered / divider <= (less + 1));
    const ever1 = (less) => filt1(less).length === divider && filt1(less).every(a => a.answerer === filt1(less).map(k => k.answerer)[0]);
    for (let i = 0; i < (divider - 1); i++) {
        if (ever1(i)) { less.value[i].click() }
    }

    const filt61 = responses.value.filter(a => a.answered % (divider + 1) === 1);
    if (filt61.length === divider && filt61.every(a => a.answerer === filt61.map(k => k.answerer)[0])) { mod61.value.click() }
    if (is.value === 'mces') {
        if (ever(4)) { mod.value[4].click() }
        if (ever1(4)) { less.value[4].click() }
        const filt41 = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1 || a.answered === 13);
        if (filt41.length === divider && filt41.every(a => a.answerer === filt41.map(k => k.answerer)[0])) { mod41.value.click() }
    } else {
        const filt42 = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1);
        if (filt42.length === divider && filt42.every(a => a.answerer === filt42.map(k => k.answerer)[0])) { mod41.value.click() }
    }
}

const disTriggered = ref(0)
const disMod = ref([false, false, false, false, false]);
const addMod = (mod) => {
    const ans = responses.value.filter(a => a.answered % divider === mod);
    i_model.value[contestants.value.map(a => a.name).indexOf(ans.map(k => k.answerer)[0])] += bonus.value;
    disTriggered.value += 1;
    disMod.value[mod] = true;
    openModal(1);
}

const disLess = ref([false, false, false, false, false]);
const addLess = (less) => {
    const ans = responses.value.filter(a => a.answered / divider > less && a.answered / divider <= (less + 1));
    i_model.value[contestants.value.map(a => a.name).indexOf(ans.map(k => k.answerer)[0])] += bonus.value;
    disTriggered.value += 1;
    disLess.value[less] = true;
    openModal(1);
}

const disDiag = ref([false, false]);
const addDiag1 = () => {
    const ans = responses.value.filter(a => a.answered % (divider + 1) === 1);
    i_model.value[contestants.value.map(a => a.name).indexOf(ans.map(k => k.answerer)[0])] += bonus.value;
    disTriggered.value += 1;
    disDiag.value[0] = true;
    openModal(1);
}
const addDiag2 = () => {
    const ans = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1 || a.answered === 13);
    const ans1 = responses.value.filter(a => a.answered % (divider - 1) === 1 && a.answered % (divider + 1) !== 1);
    if (is.value === 'mces') {
        i_model.value[contestants.value.map(a => a.name).indexOf(ans.map(k => k.answerer)[0])] += bonus.value;
    } else {
        i_model.value[contestants.value.map(a => a.name).indexOf(ans1.map(k => k.answerer)[0])] += bonus.value;
    }
    disTriggered.value += 1;
    disDiag.value[1] = true;
    openModal(1)
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
    openToast(2);
}

const undo_message = ref();
const undoMin = (e, f) => {
    i_model.value[e] += minscore.value;
    disBtn.value[e] = false;
    disAdd.value[e] = false;
    undo_message.value = `Pengurangan ${minscore.value} poin untuk peserta ${f} dibatalkan`;
    openToast(3);
}

const violation = (e, f) => {
    i_model.value[e] -= vioscore.value;
    err_message.value = `Pengurangan ${vioscore.value} poin untuk peserta ${f}`;
    openToast(2)
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
                <button v-for="i in divider" :key="i" :ref="e => { mod[i - 1] = e }" @click="addMod(i - 1);"
                    :disabled="disMod[i - 1] === true ? true : false"></button>
                <button v-for="i in divider" :key="i" :ref="e => { less[i - 1] = e }" @click="addLess(i - 1);"
                    :disabled="disLess[i - 1] === true ? true : false"></button>
                <button ref="mod61" @click="addDiag1()" :disabled="disDiag[0] === true ? true : false"></button>
                <button ref="mod41" @click="addDiag2()" :disabled="disDiag[1] === true ? true : false"></button>
            </div>
            <div class="content">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <h2>Pilihan Soal</h2>
                    <div class="questions">
                        <button v-for="val in quests" :key="val.index" @click="openQuest(val.index)"
                            :style="`background-color: var(${val.bg}); color: var(${val.font}); border-color: var(${val.border}); width: ${is === 'mces' ? '15' : '18'}vw; height: ${is === 'mces' ? '15' : '18'}vw; max-width: ${is === 'mces' ? '3.5' : '4.5'}rem; max-height: ${is === 'mces' ? '3.5' : '4.5'}rem`">
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
            <p>{{disTriggered}}</p>
        </div>
        <div class="overlay" :class="{ 'dis-none': !modal[0].container, 'dis-flex': modal[0].container }">
            <div class="time" :class="{ 'quest-disapp': !modal[0].box, 'quest-app': modal[0].box }">
                <h4 :style="`color: var(--${colorize})`">Sisa Waktu (s)</h4>
                <Progress :withImage="false" :percent="percentage()" :current="countDown_var" :color="colorize" />
            </div>
            <div class="question" :class="{ 'quest-disapp': !modal[0].box, 'quest-app': modal[0].box }">
                <div class="pend" style="left: 0;">
                    <img src="@/assets/keping.png" alt="nomor">
                    <span style="left: -.6rem;">{{ filtered().map(e => e.value)[0] }}</span>
                </div>
                <div class="pend" style="right: 0;">
                    <img src="@/assets/keping.png" alt="nomor" style="transform: scaleX(-1);">
                    <span style="right: -.6rem; text-align: center;">{{ filtered().map(e => e.score)[0]
                    }}<br />pt</span>
                </div>
                <div
                    style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;">
                    <div class="text"
                        :style="`min-height: ${expand === true ? 'calc(100% - 27.25rem)' : 'calc(100% - 7.25rem)'}`">
                        <div style="width: 100%" v-html="filtered().map(e => e.question)[0]"></div>
                    </div>
                    <div class="options">
                        <span @click="expand = !expand">
                            <i class="fa-solid fa-chevron-down"
                                :style="expand === true ? '' : 'transform: rotate(180deg)'"></i>
                        </span>
                        <div class="violation">
                            <p style="height: 25%; color: var(--red-600);">Pelanggaran Tata Tertib</p>
                            <div>
                                <button style="width: 50%;" @click="violation(0, 'A')">A - 10</button>
                                <button style="width: 50%;" @click="violation(1, 'B')">B - 10</button>
                            </div>
                            <div>
                                <button style="width: 50%;" @click="violation(2, 'C')">C - 10</button>
                                <button style="width: 50%;" @click="violation(3, 'D')">D - 10</button>
                            </div>
                            <div>
                                <button style="width: 50%;" @click="violation(4, 'E')">E - 10</button>
                                <button style="width: 50%;" @click="violation(5, 'F')">F - 10</button>
                            </div>
                        </div>
                        <div class="option">
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
                                    <i class="fa-solid fa-arrow-rotate-left" style="font-size: var(--card-detail);"></i>
                                    &nbsp;{{ contestant.name }}
                                </button>
                            </div>
                            <div>
                                <button
                                    @click="notAnswered(filtered().map(e => e.index)[0]); arrLength += 1; countDown_var = 0">
                                    Tak Terjawab
                                </button>
                                <button @click="justClose(); arrLength += 1; countDown_var = 0">Kembali</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Overlay is="toast" :container="toast[1].container" :box="toast[1].box"
            :message="`Selamat. Tambahan ${quests.map(a => a.score)[selected - 1]} poin untuk peserta ${responses.map(a => a.answerer)[responses.length - 1]}`" />
        <Overlay is="toast" type="warning" :container="toast[0].container" :box="toast[0].box"
            :message="`Soal nomor ${selected} tidak terjawab`" />
        <Overlay is="toast" type="error" :container="toast[2].container" :box="toast[2].box" :message="err_message" />
        <Overlay is="toast" type="success" :container="toast[3].container" :box="toast[3].box"
            :message="undo_message" />
        <Overlay type="success" :with-confirm="false" :container="modal[1].container" :box="modal[1].box"
            @close-modal="closeModal(1); disTriggered = 0;" title="Poin Bonus !" closeText="OK">
            <b>Peserta {{ responses.map(a => a.answerer)[responses.length - 1] }}</b> memperoleh bonus poin
            sebanyak <b>{{ disTriggered * bonus }} poin</b>.
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

.text {
    /* calc(100% - 7.25rem) */
    width: 100%;
    padding: 0 3vw;
    margin-top: 5.75rem;
    overflow-y: auto;
    transition: min-height .75s ease-in-out;
}

.options {
    position: relative;
    width: 100%;
    min-height: 12rem;
    display: flex;
    padding: calc(.55rem + .5vw);
    gap: 1rem;
    border-top: 2px solid var(--blue-500);
}

.options>div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .5rem;
}

.violation {
    width: 36vw;
    max-width: 13rem;
    height: 100%;
}

.option {
    min-width: calc(100% - 36vw);
    width: calc(100% - 13rem);
    height: 100%;
}

.options p,
.options button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--card-detail);
    font-weight: 700;
    z-index: 5;
}

.options>div>div {
    height: 25%;
    display: flex;
    gap: .5rem;
    justify-content: space-between;
}

.options button {
    border-radius: .25rem;
    color: var(--blue-500);
    background-color: var(--blue-300);
    border: 2px solid var(--blue-500);
    cursor: pointer;
    transition: .5s;
}

.violation button {
    color: var(--red-500);
    background-color: var(--red-300);
    border: 2px solid var(--red-500);
}

.options button:hover {
    transform: scaleY(1.1);
    border-width: 3px;
    border-color: var(--primary);
    color: var(--primary);
}

.violation button:hover {
    border-color: var(--red-600);
    color: var(--red-600);
}

.options button:active {
    transform: scaleY(.9);
    border-width: 3px;
}

.option>div>button {
    width: calc(100% / 6);
}

.option>div:nth-child(4)>button {
    width: 50%;
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
    cursor: pointer;
}

.options>span>i {
    transition: .5s;
    transition-delay: .5s;
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

@media all and (max-width: 459px) {
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

    .options {
        flex-direction: column;
        min-height: 20rem;
    }

    .options>div {
        min-width: 100%;
    }

}
</style>