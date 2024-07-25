import RuPagination from "@rui/pagination/lib/pagination.vue"
import RuRichtext from "@rui/richtext/lib/richtext.vue"
import RuMarkdown from "@rui/markdown/lib/markdown.vue"
import RuTable from "@rui/table/lib/table.vue";
import RuTableColumn from "@rui/table/lib/tableColumn.vue";
import RuMenuWp from "@rui/menu/lib/menuWp.vue";
import RuMenuItemWp from "@rui/menu/lib/menuItemWp.vue";
import RuSubMenuWp from "@rui/menu/lib/subMenuWp.vue";
import RuCard from "@rui/card/lib/card.vue";
import RuWaterFall from "@rui/waterfall/lib/waterfall.vue";
import {Message} from "@rui/message/lib/message.js";

const components = [
    RuPagination,
    RuRichtext,
    RuMarkdown,
    RuTable,
    RuTableColumn,
    RuMenuWp,
    RuMenuItemWp,
    RuSubMenuWp,
    RuCard,
    RuWaterFall
]

// const funcs = [
//     Message
// ]


export default  {
    install: (app) => {
        components.forEach(component => {
            console.log(component.name, component)
            app.component(component.name, component)
        });
        app.config.globalProperties.$message = Message
        // funcs.forEach(func => {
        //     app.config.globalProperties.$message = func
        // })
    },
}

export const Msg = Message