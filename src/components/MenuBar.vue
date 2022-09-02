<script setup>
import { ref, toRefs, onMounted } from 'vue';
import Spinner from './Spinner.vue';
import router from '../router';
const isExpanded = ref(false);
const toggleMenu = () => isExpanded.value = !isExpanded.value;
// maximum value for name1 is 20 characters
// maximum value for name2 is 20 characters
const props = defineProps({
    logo: {
        type: String,
        default: 'src/assets/lpom.svg'
    },
    name1: {
        type: String,
        default: 'Lembaga Pembinaan'
    },
    name2: {
        type: String,
        default: 'Olimpiade Matematika'
    },
    page1: {
        type: String,
        default: 'uni'
    },
    page2: {
        type: String,
        default: 'LIBRARY'
    },
    menus: {
        type: Array,
        default: []
    },
    extraMenu: {
        type: Array,
        default: [
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
            { text: 'Example', icon: 'fa-solid fa-user' },
        ]
    },
    profileMenus: Array,
    is: {
        type: String,
        default: 'sidebar'
    },
    tabindex: {
        type: Number,
        required: false,
        default: 0,
    },
    path: {
        default: false
    },
    notif: {
        type: [String, Number],
        default: 1,
    },
    signed: {
        default: false
    },
    signedImage: {
        type: String,
        default: 'src/assets/banner-image.svg'
    }
})

const { logo, name1, name2, menus, is, tabindex, path, page1, page2, notif, extraMenu, signed, signedImage, profileMenus } = toRefs(props);
const open = ref(false);
const openextra = ref(false);
const opendivextra = ref(false);
const onScrollY = ref(window.scrollY);
const screenWidth = ref(window.scrollX);
onMounted(() => {
    window.addEventListener('scroll', () => {
        onScrollY.value = window.scrollY;
    })
})
onMounted(() => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
    })
})
const abbr1 = (name1.value.match(/\b(\w)/g)).join('');
const abbr2 = (name2.value.match(/\b(\w)/g)).join('');
const onBlur = () => {
    setTimeout(() => { open.value = false }, 250)
}

const opExtra = () => {
    openextra.value === true ? setTimeout(() => { return openextra.value = false }, extraMenu.value.length > 8 ? screenWidth.value : (extraMenu.value.length * 120)) : openextra.value = true;
    opendivextra.value = !opendivextra.value;
}
</script>

<template>
    <div :id="is">
        <section v-if="is === 'header'">
            <header
                :style="onScrollY > 20 ? 'background-color: var(--cloud); box-shadow: 0 3px 5px var(--blue-400)' : 'transparent'">
                <div class="main-menu">
                    <div class="nav-logo" @click="router.push('/uniapp')">
                        <img class="org-logo" :src="logo" alt="organization logo">
                        <p v-if="path == false" class="page-title">{{ name1 }}<br />
                            <span style="color: var(--warning);">{{ name2 }}</span>
                        </p>
                        <h2 v-if="path == false">{{ abbr1 }}<span style="color: var(--warning);">{{ abbr2 }}</span></h2>
                        <h1 style="font-size: var(--card-title)" v-if="path != false" class="page-title">{{
                                page1
                        }}<br />
                            <span style="color: var(--warning);">{{ page2 }}</span>
                        </h1>
                    </div>
                    <div style="display: flex; flex-direction: row-reverse; align-items: center; gap: .6rem;">
                        <div class="head-menu drop" @click="open = !open;" :tabindex="tabindex" @blur="onBlur()"
                            :style="onScrollY > 20 ? 'border-color: var(--blue-400)' : 'border-color: var(--primary)'">
                            <div class="profile-img" :style="signed == true ? 'background-color: var(--light)' : ''">
                                <i v-if="signed == false" class="fa-solid fa-user"
                                    style="width: 100%; height: 100%; display: grid; place-items: center;"></i>
                                <img v-if="signed != false" :src="signedImage" alt="User's Image"
                                    style="width: 100%; max-height: 1.4rem;">
                            </div>
                        </div>
                        <div class="head-menu bell" style="position: relative"
                            :style="onScrollY > 20 ? 'border-color: var(--blue-400)' : 'border-color: var(--primary)'">
                            <i class="fa-solid fa-bell" style="font-size: 1.15rem;"></i>
                            <Spinner v-if="notif > 0" is="ping" color="red" :width=".45"
                                style="position: absolute; top: .175rem; right: .425rem;" />
                        </div>
                        <div v-if="extraMenu.length > 0" class="head-menu" @click="opExtra()"
                            :style="onScrollY > 20 ? 'border-color: var(--blue-400)' : 'border-color: var(--primary)'">
                            <i class="fa-solid fa-caret-down" :class="{ rotate: openextra }"
                                style="font-size: 1.25rem; transition: .75s;"></i>
                        </div>
                    </div>
                </div>
                <div class="extra-menu" :class="{ extraAppear: openextra }">
                    <div v-for="(menu, index) in extraMenu" :key="menu.text" :class="{ exAppear: opendivextra }"
                        :style="`--i:${(index / 10) + .1}s`">
                        <i :class="menu.icon" style="margin-right: .5rem;"></i>
                        {{ menu.text }}
                    </div>
                </div>
            </header>
            <div class="profile-opt" :class="{ appear: open }">
                <h1 v-if="signed == true" class="ellips">Hi, Fajar Maulana Malik</h1>
                <h1 v-if="signed != true" class="ellips">Hi, Tamu</h1>
                <div class="profile-menu" v-if="signed == true" style="margin-bottom: .75rem;">
                    <div @click="router.push('/profile')">
                        <i class="fa-solid fa-user"></i>
                        <p>Profil</p>
                    </div>
                    <div v-for="prof in profileMenus" :key="prof.text" @click="router.push(prof.path)">
                        <i :class="prof.icon"></i>
                        <p>{{ prof.text }}</p>
                    </div>
                    <div @click="router.push('/auth/login')">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <p>Logout</p>
                    </div>
                </div>
                <div class="profile-menu">
                    <div v-if="signed != true" @click="router.push('/auth/login')">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <p>Login</p>
                    </div>
                    <div @click="router.push('/help')">
                        <i class="fa-solid fa-circle-question"></i>
                        <p>Bantuan</p>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="is === 'sidebar'" style="display: flex">
            <aside :class="{ isExpanded: !isExpanded }">
                <div class="logo">
                    <img :class="{ isExpanded: !isExpanded }" :src="logo" alt="Organization Logo" />
                    <span class="logo-text" :class="{ isExpanded: !isExpanded }">{{ name1 }}<br />{{ name2 }}</span>
                </div>

                <!-- toggle-button -->
                <div class="toggle-button" :class="{ isExpanded: !isExpanded }">
                    <button class="menu-toggle" @click="toggleMenu" :class="{ isExpanded: !isExpanded }">
                        <i class="fa-solid fa-angles-right ico-side"></i>
                    </button>
                </div>

                <!-- menu -->
                <h3 :class="{ isExpanded: !isExpanded }">Menu</h3>
                <div class="menu">
                    <router-link v-for="menu in menus" :key="menu.title" :to="menu.path" class="menu-item">
                        <i class="ico-side" :class="menu.icon"></i>
                        <span class="text" style="font-weight: 700;" :class="{ isExpanded: !isExpanded }">{{ menu.title
                        }}</span>
                    </router-link>
                </div>
            </aside>
            <div style="flex: 1 1 0; padding: 0;"></div>
        </section>

        <footer v-if="is === 'footer'">
            <router-link v-for="menu in menus" :key="menu.title" :to="menu.path" class="foot-menu">
                <i :class="menu.icon"></i>
                <p>{{ menu.title }}</p>
            </router-link>
        </footer>
    </div>
</template>

<style scoped>
aside {
    display: flex;
    flex-direction: column;
    background-color: var(--dark);
    color: var(--light);
    min-width: 4rem;
    width: 4rem;
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    transition: 0.2s ease-in-out;
}

aside:not(:not(.isExpanded)) {
    min-width: var(--sidebar-minwidth);
    width: var(--sidebar-maxwidth);
}

.logo {
    margin: 1rem 0;
    display: flex;
}

.logo img {
    width: 2rem;
    transition: 0.3s ease-in-out;
}

.logo img:not(:not(.isExpanded)) {
    width: 4rem;
}

.toggle-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
}

.toggle-button:not(:not(.isExpanded)) {
    top: -4rem;
}

.menu-toggle {
    background-color: transparent;
    border: none;
    transition: 0.2s ease-in-out;
}

.menu-toggle:not(:not(.isExpanded)) {
    transform: rotate(-180deg);
}

.ico-side {
    font-size: 1.5rem;
    color: var(--light);
    transition: 0.2s ease-out;
}

.menu-toggle .ico-side:hover {
    color: var(--primary);
    transform: translateX(0.5rem);
}

h3,
.text,
.logo span {
    opacity: 0;
    display: none;
    transition: opacity 0.3s ease-in-out;
}

.logo-text {
    min-width: 8rem;
    width: 53vw;
    height: 4rem;
    margin: 1rem 0 0 .75rem;
    display: flex;
    line-height: 1.5rem;
    font-size: var(--logo);
    color: var(--light);
    font-weight: 700;
    text-transform: capitalize;
}

h3:not(:not(.isExpanded)),
.text:not(:not(.isExpanded)),
.logo span:not(:not(.isExpanded)) {
    display: block;
    opacity: 1;
}

h3 {
    color: var(--gray-500);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.menu {
    margin: 0 -1rem;
}

.menu-item {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    padding: 0.5rem 1rem;
}

.menu-item:hover,
#sidebar .router-link-exact-active {
    background-color: var(--shadow);
    border-right: 0.3rem solid var(--primary);
}

.menu-item:hover>*,
#sidebar .router-link-exact-active i,
#sidebar .router-link-exact-active span {
    color: var(--primary);
}

.ico-side:not(:not(.isExpanded)) {
    margin-right: 1rem;
}

.menu-item .ico-side {
    padding: 1rem 0;
    width: 3rem;
    transition: ease-in-out;
}

.text {
    color: var(--light);
}

header {
    top: 0;
    min-height: 3.5rem;
    flex-direction: column;
}

header *:not(i) {
    font-family: 'Ubuntu' !important;
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

.main-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

.main-menu div h2 {
    display: none;
    height: 100%;
    align-items: center;
    font-weight: 600;
    padding-left: .5rem;
    font-size: 6.25vw;
}

.page-title {
    font-weight: 600;
    padding-left: .5rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
}

header .head-menu {
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: .85rem;
    background-color: var(--blue-400);
    color: var(--primary);
    display: grid;
    place-items: center;
    cursor: pointer;
    border: 2px solid var(--blue-400);
    transition: .5s;
}

header .head-menu:hover,
.extra-menu div:hover {
    background-color: var(--blue-300);
}

header .head-menu:active,
.extra-menu div:active {
    background-color: var(--blue-400);
}

header .head-menu.drop {
    width: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.profile-img {
    margin-left: .25rem;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    overflow: hidden;
}

.profile-opt {
    position: fixed;
    z-index: 101;
    top: 4rem;
    right: .75rem;
    background-color: var(--light);
    border-radius: .5rem;
    padding: .75rem;
    max-width: 12rem;
    box-shadow: -1px -1px 5px var(--blue-400), 1px 1px 5px var(--blue-400);
    font-size: var(--icon);
    font-weight: 600;
    transform: scaleY(0);
    transition: transform .2s;
    transform-origin: top;
}

.profile-opt h1 {
    margin: 0 .25rem .75rem .25rem;
    -webkit-line-clamp: 1;
    max-width: 12rem;
    font-size: var(--icon);
    padding: .1rem .5rem;
    background-color: var(--primary);
    color: var(--light);
    border-radius: .25rem;
}

.appear {
    transform: scaleY(1);
}

.extra-menu {
    width: 100%;
    display: flex;
    gap: .5rem;
    align-items: center;
    margin-top: 0;
    font-weight: 600;
    font-size: var(--card-detail);
    overflow: auto;
    height: 0;
    transition: .75s;
}

.extraAppear {
    margin-top: .75rem;
    height: auto;
}

.rotate {
    transform: rotate(180deg);
}

.extra-menu div {
    background-color: var(--blue-400);
    padding: .25rem .75rem;
    border-radius: .5rem;
    min-width: fit-content;
    margin-bottom: .5rem;
    border: 2px solid var(--primary);
    cursor: pointer;
    transform: translateY(-1.75rem);
    transition: transform .5s;
    transition-delay: calc(0s + var(--i));
}

.extra-menu .exAppear {
    transform: translateY(0);
    transition-delay: calc(0.35s + var(--i));
}

.profile-opt .profile-menu div {
    line-height: 1.1rem;
    display: flex;
    align-items: center;
    padding: .25rem .5rem;
    border-radius: .5rem;
    cursor: pointer;
    transition: .3s;
    border-bottom: .1rem solid var(--blue-400);
    margin-bottom: .75rem;
}

.profile-opt .profile-menu div:hover {
    background-color: var(--blue-300);
}

.profile-opt .profile-menu div:nth-last-child(1) {
    margin-bottom: 0;
}

.profile-opt .profile-menu div i {
    margin-right: .75rem;
}

header .drop:after,
.profile-opt::after {
    position: absolute;
    content: "";
    top: .75rem;
    right: .35rem;
    width: 0;
    border: .3rem solid transparent;
    border-color: var(--primary) transparent transparent transparent;
}

.profile-opt::after {
    transform: rotate(180deg);
    top: -.55rem;
    right: .35rem;
    border-color: var(--light) transparent transparent transparent;
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

.foot-menu i {
    font-size: var(--sub-title);
    color: var(--primary);
    transform: translateY(.2rem);
}

footer .foot-menu:hover {
    cursor: pointer;
    background-color: var(--blue-400);
}

#footer .router-link-exact-active {
    background-color: var(--blue-400);
}

footer .foot-menu p {
    font-size: var(--footer-cap);
    background-color: var(--primary);
    color: var(--light);
    padding: .15rem .5rem;
    font-weight: 700;
    border-radius: .5rem;
    margin-top: .25rem;
    transform: translateY(-.2rem);
}

@media screen and (max-width: 414px) {
    footer .foot-menu p {
        display: none;
    }

    header div p {
        display: none !important;
    }

    .foot-menu i {
        font-size: var(--title);
        transform: translateY(0);
    }

    header div h2 {
        display: flex !important;
    }

    header div h1 {
        font-size: 4.25vw;
    }

    footer {
        height: 2.65rem;
    }
}
</style>