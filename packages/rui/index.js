import RuPagination from "@rui/pagination/lib/pagination.vue"
import RuRichtext from "@rui/richtext/lib/richtext.vue"

const components = [
    RuPagination,
    RuRichtext
]

export default  {
    install: (app) => {
        components.forEach(component => {
            app.component(component.name, component)
        });
    }
}

