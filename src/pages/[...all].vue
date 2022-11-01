<script  setup>
import Button from '../components/Button.vue';
import router from '../router';
</script>
<template>
    <div class="main">
        <img loading="lazy" src="@/assets/404.png" alt="404 image"
            style="min-width: 10rem; width: 60vw; max-width: 50vh;" />
        <p style="margin: 3rem 0 1rem 0; font-size: var(--card-title); font-weight: 700;">Kembali ke beranda ?</p>
        <Button :round="true" style="min-width: 10rem; width: 60vw; max-width: 50vh;" @click="router.push('/')">
            <i class="fa-solid fa-house-chimney" style="margin-right: .5rem;"></i> Home
        </Button>
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
</style>