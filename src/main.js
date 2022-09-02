import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "katex/dist/katex.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
