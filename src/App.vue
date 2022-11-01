<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router';
import router from './router/index';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import EventBus from "./common/eventBus";
import TokenService from "@/api/token";

const route = useRoute();
const menus = ref([
  { title: 'MCES', path: '/' },
  { title: 'MCJHS', path: '/mcjhs' },
  { title: 'MCSHS', path: '/mcshs' },
])

const edit_menus = ref([
  { title: 'MCES', path: '/edit/mces' },
  { title: 'MCJHS', path: '/edit/mcjhs' },
  { title: 'MCSHS', path: '/edit/mcshs' },
])

const logOut = () => {
  store.dispatch('auth/logout');
  router.push('/auth/login')
}

onMounted(() => {
  EventBus.on("logout", () => {
    logOut();
  });
})

onBeforeUnmount(() => {
  EventBus.remove("logout");
})

const user = TokenService.getUser()
</script>

<template>
  <header style="justify-content: space-between; padding: 0 1rem;">
    <div class="nav-logo">
      <img class="org-logo" src="@/assets/fimojempol.png" alt="organization logo">
      <p class="page-title">Forum Ilmiah<br />
        <span style="color: var(--warning);">Matematika Nasional</span>
      </p>
      <p class="page-title2">FIMNAS</p>
    </div>
    <div class="action-i" style="display: flex; flex-direction: row; gap: .5rem; align-items: center;">
      <p v-if="user && !route.path.includes('auth')" title="Edit Profil" @click="router.push('/auth/profile')"
        :style="`margin-right: ${(route.path === '/' || route.path === '/mcjhs' || route.path === '/mcshs') ? 3 : 0}rem`">
        Halo, {{
            user?.name.split(' ')[0]
        }}</p>
      <i v-if="user && !route.path.includes('auth')" class="fa-solid fa-user users-logo" title="Edit Profil"
        @click="router.push('/auth/profile')"
        :style="`margin-right: ${(route.path === '/' || route.path === '/mcjhs' || route.path === '/mcshs') ? 2.5 : 0}rem`"></i>
      <i v-if="user && !route.path.includes('auth')" title="Logout" class="fa-solid fa-right-from-bracket"
        @click="TokenService.removeUser(); router.push('/auth/login')"></i>
      <i v-if="user && !route.path.includes('auth') && !route.path.includes('edit')" title="Edit Soal"
        class="fa-solid fa-pen-to-square" @click="router.push('/edit/mces')"></i>
      <i title="Home"
        v-if="user && !route.path.includes('auth') && route.path !== '/' && route.path !== '/mcjhs' && route.path !== '/mcshs'"
        class="fa-solid fa-house-chimney" @click="router.push('/')"></i>
    </div>
  </header>
  <RouterView />
  <footer v-if="route.path === '/edit/mces' || route.path === '/edit/mcjhs' || route.path === '/edit/mcshs'">
    <router-link v-for="menu in edit_menus" :key="menu.title" :to="menu.path" class="foot-menu">
      <p>{{ menu.title }}</p>
    </router-link>
  </footer>
  <footer v-if="route.path === '/' || route.path === '/mcjhs' || route.path === '/mcshs'">
    <router-link v-for="menu in menus" :key="menu.title" :to="menu.path" class="foot-menu">
      <p>{{ menu.title }}</p>
    </router-link>
  </footer>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Be Vietnam Pro', 'Poppins', 'Ubuntu', Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

:root {
  --cloud: #F1F9FD;
  --error: #f43f5e;
  --primary: #28a0f6;
  --success: #42ba96;
  --warning: #eab308;
  /* gray */
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  /* orange */
  --orange-300: #fed7aa;
  --orange-400: #fdba74;
  --orange-500: #fb923c;
  --orange-600: #f97316;
  --orange-700: #ea580c;
  /* yellow */
  --yellow-300: #fef9c3;
  --yellow-400: #fde047;
  --yellow-500: #facc15;
  --yellow-600: #fb923c;
  --yellow-700: #854d0e;
  /* green */
  --green-300: #ccfbf1;
  --green-400: #bef264;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
  /* blue */
  --blue-300: #e0f2fe;
  --blue-400: #bae6fd;
  --blue-500: #38bdf8;
  --blue-600: #0988e3;
  --blue-700: #0372c2;
  /* red */
  --red-300: #ffe4e6;
  --red-400: #fb7185;
  --red-500: #f43f5e;
  --red-600: #e11d48;
  --red-700: #be123c;

  --blue-trans: #bae5fd46;

  --dark: #1a2b45;
  --shadow: #334155;
  --light: #ffff;

  /* clamp */
  --card-title: clamp(.85rem, 2.25vw, 1.2rem);
  --card-detail: clamp(.6rem, 2vw, .85rem);
  --icon: clamp(.75rem, 2.5vw, 1rem);
  --title: clamp(1.1rem, 2.75vw, 1.6rem);
  --sub-title: clamp(.7rem, 2.35vw, 1.05rem);
  --mini-icon: clamp(.6rem, 3vw, .8rem);
  --logo: clamp(.735rem, 4.5vw, 1.05rem);
  --footer-cap: clamp(.5rem, 2vw, .85rem);
  --subtitle: clamp(.9rem, 2.75vw, 1.25rem);
  --sidebar-maxwidth: 21rem;
}

body {
  background-color: var(--cloud);
  color: var(--primary);
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background-color: var(--cloud);
  border-radius: 5px 5px 0 0;
  margin: 0 .75rem;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 5px 5px 0 0;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--blue-700);
}

.action-i i {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: var(--light);
  background-color: var(--primary);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: .5s;
}

.action-i p {
  font-weight: 700;
  height: 2.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  text-align: right;
  text-transform: lowercase;
}

.action-i p {
  text-transform: capitalize;
}

.action-i *:hover {
  opacity: .8;
}

.action-i *:active {
  opacity: 1;
}

.gridcardImg {
  min-width: 4rem;
  max-width: 6vw;
  margin: .5rem 0 1rem 0;
}

header {
  top: 0;
  min-height: 3.5rem;
  background-color: var(--cloud);
  box-shadow: 0 3px 5px var(--blue-400);
}

header,
footer {
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: .5s;
  display: flex;
  align-items: center;
  padding: .5rem .75rem;
}

.nav-logo {
  height: 2.5rem;
  display: flex;
  cursor: pointer;
  transition: opacity .5s;
}

.nav-logo:hover {
  opacity: .8;
}

.nav-logo:active {
  opacity: 1;
}

.org-logo {
  height: 100%;
  border-right: 3px solid var(--primary);
  padding-right: .5rem;
  box-shadow: 2px 0 0 0 var(--warning);
}

@media all and (min-width: 640px) {

  .page-title,
  .action-i p {
    display: flex !important;
  }

  .page-title2,
  .users-logo {
    display: none !important
  }
}

@media all and (max-width: 640px) {
  .action-i p {
    display: none !important;
  }
}

@media all and (max-width: 360px) {
  .page-title2 {
    display: none !important
  }
}

.page-title {
  display: none
}

.page-title2 {
  display: flex;
  font-size: 1.65rem;
}

.page-title,
.page-title2 {
  font-weight: 700;
  padding-left: .5rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

footer .foot-menu {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  text-decoration: none;
  transition: .5s;
}

footer {
  height: 3.5rem;
  padding: 0;
  bottom: 0;
  background-color: var(--cloud);
  box-shadow: 0 -3px 5px 0 var(--blue-400);
  justify-content: space-around !important;
}

footer .foot-menu:hover {
  cursor: pointer;
  background-color: var(--blue-400);
}

footer .router-link-exact-active {
  background-color: var(--blue-400);
}

footer .foot-menu p {
  font-size: var(--sub-title);
  background-color: var(--primary);
  color: var(--light);
  padding: .15rem .5rem;
  font-weight: 700;
  border-radius: .5rem;
  margin-top: .25rem;
  letter-spacing: .2rem;
}

@media screen and (max-width: 414px) {
  footer {
    height: 2.65rem;
  }
}

.text>div>p {
  margin-bottom: .75rem !important;
  line-height: 1.6rem;
}

.text>div {
  padding-top: .5rem;
}

.ql-align-right {
  text-align: right;
}

.ql-align-center {
  text-align: center;
}

.ql-align-justify {
  text-align: justify;
}

.ql-indent-1 {
  margin-left: 3.5rem;
}

.ql-indent-2 {
  margin-left: 7rem;
}

.ql-indent-3 {
  margin-left: 10.5rem;
}

.ql-indent-4 {
  margin-left: 14rem;
}

.ql-indent-5 {
  margin-left: 17.5rem;
}

.ql-indent-6 {
  margin-left: 21rem;
}

.ql-indent-7 {
  margin-left: 24.5rem;
}

.ql-indent-8 {
  margin-left: 28rem;
}

.ql-font-serif {
  font-family: serif !important;
}

.ql-font-monospace {
  font-family: monospace !important;
}

.basic-radio input,
.basic-checkbox input,
.switch input,
.tab input,
.option input,
.select input,
.radio-box input {
  position: absolute;
  opacity: 0;
}
</style>
