import RuPagination from "@rui/pagination/lib/pagination.vue"
import RuRichtext from "@rui/richtext/lib/richtext.vue"
import RuMarkdown from "@rui/markdown/lib/markdown.vue"
import RuTable from "@rui/table/lib/table.vue";
import RuTableColumn from "@rui/table/lib/tableColumn.vue";

const components = [
    RuPagination,
    RuRichtext,
    RuMarkdown,
    RuTable,
    RuTableColumn
]

export default  {
    install: (app) => {
        components.forEach(component => {
            app.component(component.name, component)
        });
    }
}

