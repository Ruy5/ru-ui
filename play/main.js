import { createApp } from "vue";
import App from "./App.vue";
import Rui from "rui/index.js"

const app = createApp(App)
app.use(Rui)
app.mount("#app")