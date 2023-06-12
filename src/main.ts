import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './global';
import {QuillEditor} from '@vueup/vue-quill';
import interceptor from '@/api/interceptor';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'nprogress/nprogress.css';
import 'katex/dist/katex.min.css';
import './style.css';

const app = createApp(App);

app.use(router);
app.use(store);
interceptor(store, router);
app.component('QuillEditor', QuillEditor);

app.mount('#app');
