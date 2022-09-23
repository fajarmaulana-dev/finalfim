<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { ref } from 'vue'
const menus = ref([
  { title: 'MCES', path: '/' },
  { title: 'MCJHS', path: '/mcjhs' },
  { title: 'MCSHS', path: '/mcshs' },
])
</script>

<template>
  <header>
    <div class="nav-logo">
      <img class="org-logo" src="@/assets/fimojempol.png" alt="organization logo">
      <p class="page-title">Forum Ilmiah<br />
        <span style="color: var(--warning);">Matematika Nasional</span>
      </p>
    </div>
  </header>
  <RouterView />
  <footer>
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
  --card-detail: clamp(.665rem, 2.5vw, .85rem);
  --icon: clamp(.75rem, 2.5vw, 1rem);
  --title: clamp(1.1rem, 2.25vw, 1.6rem);
  --sub-title: clamp(.7rem, 3.5vw, 1.05rem);
  --mini-icon: clamp(.6rem, 2.5vw, .8rem);
  --logo: clamp(.735rem, 4.5vw, 1.05rem);
  --footer-cap: clamp(.55rem, 1.5vw, .65rem);
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

.page-title {
  font-weight: 700;
  padding-left: .5rem;
  display: flex;
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

.ql-align-center {
  text-align: center !important;
}
</style>
