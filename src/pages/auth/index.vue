<script setup lang="ts">
import { ref, reactive, computed } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue';
import SimpleText from '@/components/SimpleText.vue';
import Spinner from '@/components/Spinner.vue'
import Toast from '@/components/Toast.vue';
import { useAuth } from '@/api/auth';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex'

const { message, toast, sendmail, login, reset, update } = useAuth()
const store = useStore()
const router = useRouter()
const route = useRoute()
const is = ref(route.query.p as string || 'update')
const id = computed(() => store.getters.id)

const send = async () => {
    loading.value = true
    if (is.value == 'forgot') await sendmail({ email: email.value })
    else {
        if (is.value == 'login') {
            await login({ email: email.value, password: pass.def })
            store.dispatch('login')
        }
        if (is.value == 'reset') await reset((route.query.id as string), (route.query.token as string), { password: pass.new })
        if (is.value == 'update') await update(id.value, { password: pass.def, newPassword: pass.new })
        if (message.success.length > 0) {
            setTimeout(() => {
                router.replace(is.value == 'reset' ? '/auth?p=login' : (route.query.redirect as string || '/?sch=mces'))
            }, 3700)
        }
    }
    loading.value = false
}

watch(route, () => {
    is.value = route.query.p as string || 'update'
    email.value = ''
    for (const i of Object.keys(seen)) { seen[i] = false; pass[i] = '' }
}, { deep: true })

const loading = ref(false)
const email = ref('')
const seen: any = reactive({ def: false, new: false, conf: false })
const pass: any = reactive({ def: '', new: '', conf: '' })
const placeholder = ['Kata Sandi', 'Sandi Baru', 'Ketik Ulang']
const title: any = { login: 'Login', forgot: 'Request Token Penggantian Sandi', reset: 'Reset Kata Sandi', update: 'Perbarui Kata Sandi' }
const button: any = { login: 'LOGIN', forgot: 'Request Token', reset: 'RESET', update: 'PERBARUI' }
const exist = [['login', 'update'], ['reset', 'update'], ['reset', 'update']]

const passval = (x: string) => yup.string().required(`kata sandi${x} wajib diisi`).matches(/[A-Z]/, `kata sandi${x} harus memuat minimal 1 huruf kapital`).matches(/[a-z]/, `kata sandi${x} harus memuat minimal 1 huruf kecil`).matches(/\d/, `kata sandi${x} harus memuat minimal 1 angka`).matches(/[\W+_]/, `kata sandi${x} harus memuat minimal 1 karakter unik`).min(8, `kata sandi${x} harus terdiri dari minimal 8 karakter`).matches(/^\S+$/, `kata sandi${x} tidak boleh memuat spasi`)
const mailval = yup.string().required('email wajib diisi').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email tidak valid')
const schema: any = {
    login: yup.object({ email: mailval, def: passval('') }),
    forgot: yup.object({ email: mailval }),
    reset: yup.object({ new: passval(' baru '), conf: yup.string() }),
    update: yup.object({ def: passval(''), new: passval(' baru '), conf: yup.string() })
}
const invalid = computed(() => pass.new === pass.conf ? '' : 'isian ini harus sama dengan isian kata sandi baru')
</script>

<template>
    <div v-if="!Object.keys(title).includes(is)" class="min-h-screen grid place-items-center">
        <div class="w-[80vw] max-w-[35rem] grid place-items-center">
            <img src="@/assets/notfound.avif" class="max-h-[50vh]" alt="Notfound Thumbnail" />
            <router-link to="/" style="transition: .4s;"
                class="py-2 w-[14rem] grid place-items-center rounded-md mt-4 bg-gradient-to-br from-sky-600 to-teal-500 text-white font-bold hover:tracking-wider active:tracking-normal">
                Kembali ke Beranda</router-link>
        </div>
    </div>
    <div v-else>
        <Menu v-if="is == 'update'" />
        <div class="min-h-screen grid place-items-center py-[8vw]">
            <div class="w-[calc(100%-16vw)] bg-white shadow-[0_1px_14px_0] p-[calc(1rem+1vw)] shadow-sky-300 rounded-xl">
                <div class="flex flex-col">
                    <div class="flex w-full justify-center">
                        <img src="@/assets/fim.avif" width="80" height="40" alt="logo-fim" />
                    </div>
                    <p
                        class="w-full text-center font-extrabold md:text-lg text-sky-600 leading-6 md:leading-7 mt-0 sm:mt-2">
                        {{
                            title[is]
                        }}<br />
                        <span class="text-teal-600" v-if="is !== 'forgot'">Forum Ilmiah Matematika Nasional</span>
                    </p>
                </div>
                <div class="mt-[2rem] md:mt-[3rem] flex gap-2">
                    <Form class="w-full" id="form" @submit.prevent :validation-schema="schema[is]" v-slot="{ meta }">
                        <p v-if="is == 'forgot'" class="text-xs font-bold text-sky-600 mb-4">
                            Ketikkan emailmu disini untuk menerima token penggantian sandi.
                        </p>
                        <Field v-if="is == 'login' || is == 'forgot'" v-slot="{ field, errorMessage }" name="email">
                            <SimpleText placeholder="Email" id="email" width="w-36" type="text" v-model="email"
                                @on-enter="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf ? false : send()"
                                v-bind="field" />
                            <p class="text-left text-rose-600 text-xs mt-0.5 mb-6">{{ errorMessage }}</p>
                        </Field>
                        <div v-for="i, idx in Object.keys(seen)">
                            <Field v-if="exist[idx].includes(is)" v-slot="{ field, errorMessage }" :name="i">
                                <SimpleText :placeholder="placeholder[idx]" :id="i" width="w-36" v-bind="field"
                                    :ico="seen[i] ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                                    :type="seen[i] ? 'text' : 'password'" @append-click="seen[i] = !seen[i]"
                                    v-model="pass[i]"
                                    @on-enter="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf ? false : send()" />
                                <p class="text-left text-rose-600 text-xs mt-0.5 mb-6">
                                    {{ i == 'conf' ? invalid : errorMessage }}
                                </p>
                            </Field>
                        </div>
                        <button type="button" :disabled="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf"
                            style="transition: letter-spacing .4s;"
                            :class="(!(meta.valid && meta.dirty) || pass.new !== pass.conf) ? 'cursor-not-allowed text-stone-700 bg-stone-300 border-stone-700' : `${loading ? 'cursor-not-allowed' : 'cursor-pointer'} text-white bg-gradient-to-br border-white space`"
                            class="h-[2.65rem] md:h-[2.75rem] lg:h-[2.85rem] font-bold text-xs xs:text-update sm:text-lg rounded-lg w-full grid place-items-center from-sky-600 to-teal-500 border-2"
                            @click.prevent="send()">
                            <Spinner v-if="loading" is="lazy-ring" stroke="stroke-white" />
                            <span v-else>{{ button[is] }}</span>
                        </button>
                        <router-link
                            class="text-xs font-bold flex justify-center text-sky-600 hover:text-teal-700 active:text-sky-600 mt-1"
                            :to="is == 'update' ? (route.query.redirect as string || '/?sch=mces') : `/auth?p=${is == 'login' ? 'forgot' : 'login'}`"
                            style="transition: .4s;">{{ is == 'update' ? '< Ke Beranda' : is == 'login' ? 'Lupa kata sandi ?'
                                : '< Kembali ke Login' }}</router-link>
                    </Form>
                    <div class="w-[19rem] hidden sm:block relative">
                        <img class="absolute -bottom-6" width="300" height="600" src="@/assets/flip.avif" alt="fimo">
                    </div>
                </div>
            </div>
        </div>
        <Toast v-for="is, i in ['success', 'warning']" :is="is" v-model="(toast as any)[is]" :text="(message as any)[is]" />
    </div>
</template>

<style scoped>
button {
    letter-spacing: .2rem;
}

button:active {
    letter-spacing: .2rem !important;
}

.space:hover {
    letter-spacing: .35rem;
}
</style>