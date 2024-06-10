import { createApp } from "vue";
import "./style.css";
import VueLazyLoad from "vue3-lazyload";
import App from "./App.vue";

const app = createApp(App);
app.use(VueLazyLoad, {});

app.mount("#app");
