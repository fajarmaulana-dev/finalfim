<script setup lang="ts">
const getAssets = (path: string) => {
    return new URL(`/src/assets/${path}`, import.meta.url).href
}

const sosmed = [
    { ico: 'github', url: 'https://github.com/fajarmaulana-dev' },
    { ico: 'linkedin-in', url: 'https://www.linkedin.com/in/fajar-maulana-16b98b152' },
    { ico: 'facebook', url: 'https://web.facebook.com/profile.php?id=100090702398845' },
]
</script>

<template>
    <div class="min-h-screen grid place-items-center relative [&>*]:z-[1]">
        <div
            class="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10 px-[calc(1rem+6vw)] py-[calc(1rem+3vw)]">
            <div class="w-[10rem] lg:min-w-[18rem]">
                <img src="@/assets/fimojempol.avif" alt="fimo">
            </div>
            <div>
                <div class="text-[.8rem] xs:text-[1.075rem] sm:text-xl md:text-2xl font-black leading-4 xs:leading-6">
                    <span class="text-sky-600">Selamat Datang Di Babak Kuis</span><br />
                    <span class="text-teal-500">Forum Ilmiah Matematika Nasional</span><br />
                    <span class="text-amber-600">Universitas Negeri Semarang</span>
                </div>
                <div class="text-xs xs:text-sm md:text-base text-teal-700 font-medium mt-4 md:mt-5 lg:mt-8 text-justify">
                    &emsp;&emsp;&emsp;Aplikasi ini merupakan media yang digunakan untuk mempermudah penyelenggaraan babak
                    kuis FIM UNNES. Terdiri dari tiga halaman utama, yaitu halaman autentikasi, halaman kuis, serta halaman
                    pengeditan soal dan poin tiap soal.<br />&emsp;&emsp;&emsp;Dibangun dengan MEVN Stack, aplikasi ini
                    memiliki fitur yang mengakomodasi aturan-aturan yang telah ditetapkan pada panduan penyelenggaraan babak
                    kuis, seperti pemutaran waktu tiap soal, pemberian poin otomatis kepada peserta sesuai poin soal,
                    pemberian poin bonus otomatis sesuai panduan, fitur undo/redo, penampilan dan pengeditan konten rumus
                    serta Rich Text dengan Vue Quill dan Katex, dan lain-lain. Dengan desain yang sederhana, aplikasi telah
                    memperoleh skor lighthouse dengan indikator hijau untuk semua halaman.
                </div>
                <div class="flex flex-col-reverse sm:flex-row gap-3 sm:gap-7 items-center mt-4">
                    <div class="flex justify-center gap-4">
                        <a style="transition: .4s;" href="https://fajarmaulana-dev.me" :aria-label="`Go to my website`"
                            target="_blank"
                            class="fa-solid fa-blog text-base sm:text-lg md:text-xl cursor-pointer text-teal-500 hover:text-teal-700 lg:hidden xl:block">
                        </a>
                        <a style="transition: .4s;" v-for="social, i in sosmed" :key="i" :href="social.url"
                            :aria-label="`Go to my ${social.ico} account`" target="_blank"
                            :class="`fa-brands fa-${social.ico} text-base sm:text-lg md:text-xl cursor-pointer text-teal-500 hover:text-teal-700`">
                        </a>
                    </div>
                    <div
                        class="flex w-full flex-col sm:flex-row gap-2 sm:gap-3 xl:gap-4 justify-end [&>*]:text-xs xs:[&>*]:text-sm md:[&>*]:text-base [&>*]:h-8 xs:[&>*]:h-9 sm:[&>*]:h-10 [&>*]:font-bold [&>*]:rounded-md [&>*]:grid [&>*]:place-items-center">
                        <a :href="getAssets('Panduan_Kuis.pdf')" download style="transition: .4s;"
                            class="w-full sm:max-w-[16rem] lg:max-w-[18rem] border-[3px] border-teal-500 text-teal-500 hover:border-teal-600 hover:text-teal-600 active:border-teal-500 active:text-teal-500">
                            Unduh Panduan Babak Kuis</a>
                        <router-link to="/mces" style="transition: .4s;"
                            class="w-full sm:max-w-[8.5rem] lg:max-w-[10rem] bg-gradient-to-br from-sky-600 to-teal-500 text-white hover:tracking-wider active:tracking-tight">
                            Ayo Mulai !</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-teal-600 pb-3 xs:pb-4 md:pb-5 lg:pb-[1vw] xl:pb-0 font-bold text-xs xs:text-sm sm:text-base">
            Crafted by Fajar Maulana&emsp;©{{ new Date().getFullYear() }}</div>
        <div v-for="i in 10"
            :style="`top: ${((i - 1) * 19)}rem; left: ${i % 2 === 0 ? (Math.round(Math.random() * 42)) : ''}vw; right: ${i % 2 !== 0 ? (Math.round(Math.random() * 27)) : ''}vw; transform: rotate(${((i - 0.65) * 10) + Math.round(Math.random() * 60)}deg)`"
            class="absolute !z-0">
            <div
                class="w-48 h-44 relative [&>*]:absolute [&_.line]:border-[12px] [&_.line]:border-emerald-100 [&_.up]:!border-b-0 [&_.up]:rounded-t-full [&_.down]:!border-t-0 [&_.down]:rounded-b-full [&_.dot]:bg-emerald-100">
                <div class="line up w-32 h-16 top-4 left-12"></div>
                <div class="line up w-16 h-8 top-12 left-20"></div>
                <div class="line down w-24 h-12 top-20 left-12"></div>
                <div class="line down w-40 h-20 top-20 left-4"></div>
                <div class="dot up w-[12px] h-[8px] top-[calc(5rem-8px)] left-4"></div>
                <div class="dot down w-[12px] h-[8px] top-20 left-20"></div>
            </div>
        </div>
        <div v-for="i in 5"
            :style="`top: ${((i - 0.7) * 43)}rem; left: ${i % 2 === 0 ? (Math.round(Math.random() * 21)) : ''}vw; right: ${i % 2 !== 0 ? (Math.round(Math.random() * 38)) : ''}vw; transform: rotate(${((i - 0.35) * 20) + Math.round(Math.random() * 140)}deg)`"
            class="absolute !z-0">
            <div
                class="w-48 h-44 relative [&>*]:absolute [&_.line]:border-[12px] [&_.line]:border-purple-100 [&_.up]:!border-b-0 [&_.up]:rounded-t-full [&_.down]:!border-t-0 [&_.down]:rounded-b-full [&_.dot]:bg-purple-100">
                <div class="line up w-32 h-16 top-4 left-12"></div>
                <div class="line up w-16 h-8 top-12 left-20"></div>
                <div class="line down w-24 h-12 top-20 left-12"></div>
                <div class="line down w-40 h-20 top-20 left-4"></div>
                <div class="dot up w-[12px] h-[8px] top-[calc(5rem-8px)] left-4"></div>
                <div class="dot down w-[12px] h-[8px] top-20 left-20"></div>
            </div>
        </div>
    </div>
</template>