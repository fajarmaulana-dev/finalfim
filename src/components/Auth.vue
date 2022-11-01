<script setup>
import { ref, computed, toRefs } from 'vue';
import Card from '@/components/Card.vue';
import InputText from '@/components/InputText.vue';
import TokenService from "@/api/token";
import Button from '@/components/Button.vue';
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';
import router from '../router';
const route = useRoute()

const props = defineProps({
    is: {
        type: String,
        default: 'login'
    },
    email: String,
    name: String,
    oldPass: String,
    newPass: String,
    confirmPass: String,
    login: Function,
    update: Function,
    sendmail: Function,
    reset: Function,
    ['message']: Array,
    loading: Boolean

})
const { is, login, message, update, sendmail, reset, loading } = toRefs(props);

const title = computed(() => {
    if (is.value === 'login') return 'Login';
    else if (is.value === 'profile') return 'Edit Profil';
    else if (is.value === 'forgot') return 'Lupa Password';
    else return 'Perbarui Password';
})

const btn_title = computed(() => {
    if (is.value === 'login') return 'Login';
    else if (is.value === 'profile') return 'Perbarui profil';
    else if (is.value === 'forgot') return 'Kirimi saya email';
    else return 'Perbarui';
})

const seen = ref(false);
const seen1 = ref(false);
const seen2 = ref(false);

const user = TokenService.getUser()
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
                        <p v-if="is === 'forgot'" :style="`color: var(--${message[1] === 200 ? 'primary' : 'error'})`"
                            style="font-weight: 500; text-align: left; font-size: var(--card-detail); margin-bottom: calc(.5rem + .65vw);">
                            {{ message[0] !== '' ? `✓ ${message[0]}!` :
                                    "Kirimkan emailmu untuk menerima tautan penggantian password"
                            }}</p>
                        <p v-if="is !== 'forgot'" :style="`color: var(--${message[1] === 200 ? 'primary' : 'error'})`"
                            style="font-weight: 500; text-align: left; font-size: var(--card-detail); margin-bottom: calc(.5rem + .65vw); min-height: var(--card-detail);">
                            {{ message[0] }}</p>
                        <InputText v-if="is === 'profile'" id="nama" name="nama" placeholder="Nama baru" v-model="name"
                            prepend-icon="fa-solid fa-user" style="margin-bottom: calc(.5rem + .65vw)" />
                        <InputText v-if="is === 'login' || is === 'forgot'" id="email" name="email" type="email"
                            placeholder="Email" v-model="email" prepend-icon="fa-solid fa-at"
                            style="margin-bottom: calc(.5rem + .65vw)" />
                        <InputText v-if="is === 'login' || is === 'profile'" id="password" name="password"
                            :type="seen ? 'text' : 'password'" placeholder="Password" prepend-icon="fa-solid fa-lock"
                            :append-icon="seen ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" append-cursor="pointer"
                            style="margin-bottom: calc(.5rem + .65vw)" @append-click="seen = !seen" v-model="oldPass" />
                        <InputText v-if="is === 'reset' || is === 'profile'" id="password2" name="password2"
                            :type="seen1 ? 'text' : 'password'" placeholder="Password baru"
                            prepend-icon="fa-solid fa-lock"
                            :append-icon="seen1 ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" append-cursor="pointer"
                            style="margin-bottom: calc(.5rem + .65vw)" @append-click="seen1 = !seen1"
                            v-model="newPass" />
                        <InputText v-if="is === 'reset' || is === 'profile'" id="password3" name="password3"
                            :type="seen2 ? 'text' : 'password'" placeholder="Password baru (lagi)"
                            prepend-icon="fa-solid fa-lock"
                            :append-icon="seen2 ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" append-cursor="pointer"
                            style="margin-bottom: calc(.5rem + .65vw)" @append-click="seen2 = !seen2"
                            v-model="confirmPass" />
                        <div class="checkdiv" v-if="is === 'login'">
                            <section class="checkbox">
                                <!-- <InputCheck type="binnercheck" name="in" label="Ingat kata sandi" v-model="check" /> -->
                            </section>
                            <p class="forgot" @click="router.push('/auth/forgot')"
                                style="color: var(--primary); font-size: var(--footer-cap); line-height: 1rem; cursor: pointer;">
                                Lupa kata sandi ?</p>
                        </div>
                    </div>
                    <Button :round="true"
                        @click="is === 'login' ? login({ email: email.toLowerCase(), password: oldPass }) :
                    is === 'profile' ? update(user?.userId, { name: name, password: oldPass, newPassword: confirmPass }) :
                        is === 'forgot' ? sendmail({ email: email.toLowerCase() }) : reset(route.params.id, route.params.token, { password: confirmPass });"
                        style="margin-top: calc(1vw)" :disabled="newPass !== confirmPass ? true : false">
                        <p v-if="!loading">{{ newPass !== confirmPass ? 'Kedua password baru belum sama' : btn_title }}
                        </p>
                        <Spinner v-if="loading" is="lazy-ring" :width="20" color="light" />
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