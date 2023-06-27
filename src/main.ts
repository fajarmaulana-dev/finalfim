import {createApp} from '@vue/runtime-dom';
import App from './App.vue';
import router from './router';
import store from './global';
import {QuillEditor} from '@vueup/vue-quill';
import interceptor from '@/api/interceptor';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'nprogress/nprogress.css';
import './style.css';
import './awesome.css';
import '@fontsource/be-vietnam-pro';

interceptor(store, router);
const app = createApp(App);

app.use(router);
app.use(store);
app.component('QuillEditor', QuillEditor);

app.mount('#app');
