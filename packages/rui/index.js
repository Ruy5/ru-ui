import RuPagination from "@rui/pagination/lib/pagination.vue"
import RuRichtext from "@rui/richtext/lib/richtext.vue"
import RuMarkdown from "@rui/markdown/lib/markdown.vue"

const components = [
    RuPagination,
    RuRichtext,
    RuMarkdown
]

export default  {
    install: (app) => {
        components.forEach(component => {
            app.component(component.name, component)
        });
    }
}

