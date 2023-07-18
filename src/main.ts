import {createApp} from '@vue/runtime-dom';
import App from './App.vue';
import router from './router';
import store from './global';
import {QuillEditor} from '@vueup/vue-quill';
import {useRegisterSW} from 'virtual:pwa-register/vue';
import interceptor from '@/api/interceptor';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'nprogress/nprogress.css';
import './style.css';
import '@fontsource/be-vietnam-pro/100.css';
import '@fontsource/be-vietnam-pro/200.css';
import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/be-vietnam-pro/900.css';

useRegisterSW({immediate: true});

interceptor(store, router);

const app = createApp(App);

app.use(router);
app.use(store);
app.component('QuillEditor', QuillEditor);

app.mount('#app');
