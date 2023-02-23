<script setup>
import { ref, computed, toRefs, watch } from 'vue';
import Card from '@/components/Card.vue';
import InputText from '@/components/InputText.vue';
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import router from '../router';
const route = useRoute()

const props = defineProps({
    is: {
        type: String,
        default: 'login'
    },
    message: {
        type: Object,
        default: { success: '', error: '', code: 0 }
    },
    loading: {
        type: Object,
        default: { load: false }
    },
    login: Function,
    edit: Function,
    sendmail: Function,
    reset: Function,
})
const { is, login, message, edit, sendmail, reset, loading } = toRefs(props);

const store = useStore()

const title = computed(() => {
    if (is.value === 'login') return 'Login';
    else if (is.value === 'profile') return 'Edit Password';
    else if (is.value === 'forgot') return 'Lupa Password';
    else return 'Perbarui Password';
})

const btn_title = computed(() => {
    if (is.value === 'login') return 'Login';
    else if (is.value === 'profile') return 'Perbarui password';
    else if (is.value === 'forgot') return 'Kirimi saya email';
    else return 'Perbarui';
})

const seen = ref(false)
const newSeen = ref(false)
const confSeen = ref(false)
const email = ref('')
const password = ref('')
const newPassword = ref('')
const confPassword = ref('')

const user = computed(() => store.state.user)

const load = ref(false)
const mess = ref(0)

watch(loading.value, () => {
    load.value = loading.value.load
})

watch(message.value, () => {
    mess.value = message.value.code
})

const to = (page) => {
    if (load.value === false) {
        setTimeout(() => {
            router.push(page)
        }, 1500)
    }
}

const logged = async (login) => {
    load.value = true;
    await login({ email: email.value.toLowerCase(), password: password.value });
    store.dispatch('login')
    if (mess.value < 300) to('/')
}

const reseted = async (reset) => {
    load.value = true;
    await reset(route.params.id, route.params.token, { password: confPassword.value });
    if (mess.value < 300) to('/auth/login')
}

const mail = async (sendmail) => {
    load.value = true;
    await sendmail({ email: email.value.toLowerCase() })
}

const edited = async (edit) => {
    load.value = true;
    await edit(user.value.userId, { password: password.value, newPassword: confPassword.value })
    if (mess.value < 300) to('/')
}
</script>
<template>
    <div class="main">
        <Card style="margin-top: 1.5rem;"
            content-style="width: 100%; display flex; flex-direction: column; overflow: hidden"
            body-style="display: flex; width: 100%; align-items: center"
            header-style="display: flex; flex-direction: column; margin: 2.5vw 0">
            <template #header>
                <img src="@/assets/fim.png" alt="fim-image" style="width: 20vw; max-width: 5rem;" />
                <h2 style="font-size: var(--title); line-height: calc(1.25rem + 1.25vw); color: var(--primary);">
                    {{ title }}
                </h2>
                <p style="font-weight: 700; color: var(--warning); font-size: var(--sub-title);">Forum Ilmiah
                    Matematika Nasional</p>
            </template>
            <template #body>
                <div style="width: 100%; text-align: center; padding: 1rem; display: flex; flex-direction: column;">
                    <div>
                        <p v-if="is === 'forgot'" :style="`color: var(--${mess >= 300 ? 'error' : 'primary'})`"
                            style="font-weight: 500; text-align: left; font-size: var(--card-detail); margin-bottom: calc(.5rem + .65vw);">
                            {{ mess === 0 ? "Kirimkan emailmu untuk menerima tautan penggantian password" :
                            mess > 0 && mess < 300 ? message.success : message.error }}</p>
                                <p v-if="is !== 'forgot'" :style="`color: var(--${mess >= 300 ? 'error' : 'primary'})`"
                                    style="font-weight: 500; text-align: left; font-size: var(--card-detail); margin-bottom: calc(.5rem + .65vw); min-height: var(--card-detail);">
                                    {{ mess === 0 ? "" : mess > 0 && mess < 300 ? message.success : message.error }}</p>
                                        <InputText v-if="is === 'login' || is === 'forgot'" id="email" name="email"
                                            type="email" placeholder="Email" v-model="email"
                                            prepend-icon="fa-solid fa-at" style="margin-bottom: calc(.5rem + .65vw)" />
                                        <InputText v-if="is === 'login' || is === 'profile'" id="password"
                                            name="password" :type="seen ? 'text' : 'password'" placeholder="Password"
                                            prepend-icon="fa-solid fa-lock"
                                            :append-icon="seen ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                                            append-cursor="pointer" style="margin-bottom: calc(.5rem + .65vw)"
                                            @append-click="seen = !seen" v-model="password" />
                                        <InputText v-if="is === 'reset' || is === 'profile'" id="password2"
                                            name="password2" :type="newSeen ? 'text' : 'password'"
                                            placeholder="Password baru" prepend-icon="fa-solid fa-lock"
                                            :append-icon="newSeen ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                                            append-cursor="pointer" style="margin-bottom: calc(.5rem + .65vw)"
                                            @append-click="newSeen = !newSeen" v-model="newPassword" />
                                        <InputText v-if="is === 'reset' || is === 'profile'" id="password3"
                                            name="password3" :type="confSeen ? 'text' : 'password'"
                                            placeholder="Password baru (lagi)" prepend-icon="fa-solid fa-lock"
                                            :append-icon="confSeen ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                                            append-cursor="pointer" style="margin-bottom: calc(.5rem + .65vw)"
                                            @append-click="confSeen = !confSeen" v-model="confPassword" />
                                        <div class="checkdiv" v-if="is === 'login'">
                                            <section class="checkbox">
                                                <!-- <InputCheck type="binnercheck" name="in" label="Ingat kata sandi" v-model="check" /> -->
                                            </section>
                                            <p class="forgot" @click="router.push('/auth/forgot')"
                                                style="color: var(--primary); font-size: var(--sub-title); cursor: pointer; margin: .35vw 0 calc(.25rem + .35vw) 0">
                                                Lupa kata sandi ?</p>
                                        </div>
                    </div>
                    <Button :round="true" @click="is === 'login' ? logged(login) :
                is === 'profile' ? edited(edit) :
                    is === 'forgot' ? mail(sendmail) : reseted(reset);" style="margin-top: calc(1vw)"
                        :disabled="newPassword !== confPassword ? true : false">
                        <p v-if="!load">{{ newPassword !== confPassword ? 'Kedua password baru belum sama' : btn_title
                        }}
                        </p>
                        <Spinner v-if="load" is="lazy-ring" :width="20" color="light" />
                    </Button>
                    <Button v-if="is === 'forgot' || is === 'profile'" :round="true" :dismiss="true"
                        @click="router.push(`/${is === 'forgot' ? 'auth/login' : ''}`)"
                        style="margin-top: calc(.5rem + .65vw);">Kembali ke
                        {{ is === 'forgot' ? 'login' : 'halaman utama' }}</Button>
                </div>
                <div style="width: calc(100% - 55rem); text-align: center;">
                    <img src="@/assets/flip2.png" alt="fimo image" style="max-height: calc(6rem + 15vw);" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 4rem 5vw;
    min-height: 100vh;
}

.checkdiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .25rem;
    color: var(--primary);
    margin-bottom: .75vw;
}

.forgot:hover {
    color: var(--blue-600) !important;
}

.forgot:active {
    color: var(--blue-700) !important;
}
</style>