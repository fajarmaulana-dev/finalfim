import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "katex/dist/katex.min.css";
import "nprogress/nprogress.css";
import store from "./store";
import setupInterceptors from "./api/setupInterceptors";

setupInterceptors();

const app = createApp(App);

app.use(router);
app.use(store);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
