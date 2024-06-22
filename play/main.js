import { createApp } from "vue";
import App from "./App.vue";
import Rui from "@rui/core"

const app = createApp(App)
app.use(Rui)
app.mount("#app")