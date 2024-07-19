import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "@/plugins/firebase";
import JsonExcel from "vue-json-excel3";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component("downloadExcel", JsonExcel);

app.mount("#app");
