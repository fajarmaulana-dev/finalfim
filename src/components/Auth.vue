<script setup lang="ts">
import { ref, reactive, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router'
import SimpleText from '@/components/SimpleText.vue';
import Spinner from '@/components/Spinner.vue'
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const emit = defineEmits(['send'])
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
const { loading } = toRefs(props)

const route = useRoute()
const is = route.path.split('/')[2] || 'update'
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
    <div class="min-h-screen grid place-items-center py-[8vw]">
        <div class="w-[calc(100%-16vw)] bg-white shadow-[0_1px_14px_0] p-[calc(1rem+1vw)] shadow-sky-300 rounded-xl">
            <div class="flex flex-col">
                <div class="flex w-full justify-center">
                    <img src="@/assets/fim.avif" width="80" height="40" alt="logo-fim" />
                </div>
                <p class="w-full text-center font-extrabold md:text-lg text-sky-600 leading-6 md:leading-7 mt-0 sm:mt-2">{{
                    title[is]
                }}<br />
                    <span class="text-teal-600" v-if="is !== 'forgot'">Forum Ilmiah Matematika Nasional</span>
                </p>
            </div>
            <div class="mt-[2rem] md:mt-[3rem] flex gap-2">
                <Form class="w-full" id="form" :validation-schema="schema[is]" v-slot="{ meta }">
                    <p v-if="is == 'forgot'" class="text-xs font-bold text-sky-600 mb-4">
                        Ketikkan emailmu disini untuk menerima token penggantian sandi.
                    </p>
                    <Field v-if="is == 'login' || is == 'forgot'" v-slot="{ field, errorMessage }" name="email">
                        <SimpleText placeholder="Email" id="email" width="w-36" type="text" v-model="email"
                            @on-enter="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf ? false : emit('send', { email, pass })"
                            v-bind="field" />
                        <p class="text-left text-rose-600 text-xs mt-0.5 mb-6">{{ errorMessage }}</p>
                    </Field>
                    <div v-for="i, idx in Object.keys(seen)">
                        <Field v-if="exist[idx].includes(is)" v-slot="{ field, errorMessage }" :name="i">
                            <SimpleText :placeholder="placeholder[idx]" :id="i" width="w-36" v-bind="field"
                                :ico="seen[i] ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                                :type="seen[i] ? 'text' : 'password'" @append-click="seen[i] = !seen[i]" v-model="pass[i]"
                                @on-enter="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf ? false : emit('send', { email, pass })" />
                            <p class="text-left text-rose-600 text-xs mt-0.5 mb-6">
                                {{ i == 'conf' ? invalid : errorMessage }}
                            </p>
                        </Field>
                    </div>
                    <button type="button" :disabled="!(meta.valid && meta.dirty) || loading || pass.new !== pass.conf"
                        style="transition: letter-spacing .4s;"
                        :class="(!(meta.valid && meta.dirty) || pass.new !== pass.conf) ? 'cursor-not-allowed text-stone-700 bg-stone-300 border-stone-700' : `${loading ? 'cursor-not-allowed' : 'cursor-pointer'} text-white bg-gradient-to-br border-white space`"
                        class="h-[2.65rem] md:h-[2.75rem] lg:h-[2.85rem] font-bold text-xs xs:text-update sm:text-lg rounded-lg w-full grid place-items-center from-sky-600 to-teal-500 border-2"
                        @click.prevent="emit('send', { email, pass })">
                        <Spinner v-if="loading" is="lazy-ring" stroke="stroke-white" />
                        <span v-else>{{ button[is] }}</span>
                    </button>
                    <router-link
                        class="text-xs font-bold flex justify-center text-sky-600 hover:text-teal-700 active:text-sky-600 mt-1"
                        :to="is == 'update' ? '/mces' : `/auth/${is == 'login' ? 'forgot' : 'login'}`"
                        style="transition: .4s;">{{ is == 'update' ? '< Ke Beranda' : is == 'login' ? 'Lupa kata sandi ?'
                            : '< Kembali ke Login' }}</router-link>
                </Form>
                <div class="w-[19rem] hidden sm:block relative">
                    <img class="absolute -bottom-6" width="300" height="600" src="@/assets/flip.avif" alt="fimo">
                </div>
            </div>
        </div>
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