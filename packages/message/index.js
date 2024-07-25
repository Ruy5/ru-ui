import {Message} from "./lib/message.js";
import { App } from "vue"

Message.install = (app) => {
    app.config.globalProperties.$message = Message
}

export default Message