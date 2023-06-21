<script setup lang="ts">
import { toRefs } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import Api from '@/api/api';
import Local from '@/api/local';
import { useStore } from 'vuex';
import Spinner from './Spinner.vue';

const emit = defineEmits(['reset'])
const props = defineProps({
    disabled: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    },
})

const { disabled, loading } = toRefs(props)

const router = useRouter()
const route = useRoute()
const store = useStore()
const footer = ['mces', 'mcjhs', 'mcshs']

const user = Local.getLocalData('user')
const logout = async () => {
    await Api.get('/users/logout');
    if (user) {
        Local.removeLocalData('user');
        store.dispatch('logout');
    }
    router.replace('/auth/login');
}
</script>

<template>
    <header style="transition: .4s;"
        class="z-[1] select-none bg-sky-50 shadow-[0_3px_5px_0] shadow-sky-200 px-4 h-[3.5rem] w-full fixed top-0 left-0 flex items-center justify-between">
        <div class="flex gap-3 items-center cursor-pointer" @click="router.push('/')">
            <div class="w-[1.65rem] grid place-items-center cursor-pointer" @click="router.push('/');">
                <img src="@/assets/fimojempol.avif" width="26" height="50" alt="logo">
            </div>
            <div
                class="[&>*]:text-sky-600 [&>*]:font-extrabold [&>*]:place-items-center [&>*]:h-[2.5rem] [&>*]:pl-2.5 [&>*]:border-l-[3px] [&>*]: [&>*]:border-teal-500 [&>*]:shadow-[-2px_0_0_0] [&>*]:shadow-sky-600">
                <h1 class="text-sm hidden sm:grid">
                    <span>Forum Ilmiah<br /><span class="text-teal-500">Matematika Nasional</span></span>
                </h1>
                <h1 class="text-2xl hidden xs:grid sm:hidden tracking-wider">FIMNAS</h1>
            </div>
        </div>
        <div
            class="flex gap-2 items-center [&>button]:w-[2rem] [&>button]:h-[2rem] [&>button]:text-[.9rem] [&>button]:rounded-full [&>*]:transtion [&>*]:duration-500 [&>button]:cursor-pointer [&>button]:bg-sky-600 hover:[&>button]:bg-sky-700 active:[&>button]:bg-sky-600 [&>button]:text-white [&>*]:place-items-center">
            <router-link :to="`/auth?redirect=${route.fullPath}`" title="Perbarui Kata Sandi"
                :class="route.path == '/auth' ? 'hidden' : 'hidden sm:grid'"
                class="font-extrabold text-sky-600 hover:text-sky-700 active:text-sky-600 pr-2">
                Halo, {{ user?.name }} !
            </router-link>
            <button @click="router.push(`/auth?redirect=${route.fullPath}`)" title="Perbarui Kata Sandi"
                class="fa-solid fa-user" :class="route.path == '/auth' ? 'hidden' : 'grid sm:hidden'"></button>
            <button @click="emit('reset')" :disabled="disabled" title="Reset Kuis" class="place-items-center"
                :class="[route.path.includes('edit') ? 'hidden' : (route.path == '/auth' ? 'hidden' : 'grid'), disabled ? `${loading ? '!bg-rose-600 active:!bg-rose-600' : '!bg-stone-300 active:!bg-stone-300'} hover:!bg-stone-300 !text-stone-500 !cursor-not-allowed` : '!bg-rose-600 active:!bg-rose-600 hover:!bg-rose-700']">
                <Spinner v-if="loading" is="yin" :width="18" fill="fill-white" />
                <i v-else class="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button @click="logout()" title="Logout" class="fa-solid fa-right-from-bracket grid"></button>
            <button @click="router.push(`/edit?sch=${route.query.sch}`)" title="Edit Soal" class="fa-solid fa-pen"
                :class="route.path.includes('edit') ? 'hidden' : (route.path == '/auth' ? 'hidden' : 'grid')"></button>
            <button @click="router.push(`/?sch=${route.query.sch ? route.query.sch : 'mces'}`)" title="Kembali ke Kuis"
                class="fa-solid fa-house-chimney" :class="route.path.includes('edit') ? 'grid' : 'hidden'"></button>
        </div>
    </header>
    <footer v-if="!route.path.includes('auth')"
        class="z-[1] select-none bg-sky-50 shadow-[0_-3px_5px_0] shadow-sky-200 h-[3.5rem] w-full fixed bottom-0 left-0 flex items-center justify-around">
        <router-link v-for="foot, i in footer" :key="i"
            :to="route.path.includes('edit') ? `/edit?sch=${foot}` : `/?sch=${foot}`"
            class="w-full h-full grid place-items-center" :class="route.query.sch == foot ? 'bg-sky-200' : ''">
            <span class="px-2 py-0.5 rounded-md bg-sky-600 text-white text-sm xs:text-base font-extrabold tracking-widest">
                {{ foot.toUpperCase() }}</span>
        </router-link>
    </footer>
</template>