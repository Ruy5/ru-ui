import RuPagination from "@rui/pagination/lib/pagination.vue"

const components = [
    RuPagination
]

export default  {
    install: (app) => {
        components.forEach(component => {
            app.component(component.name, component)
        });
    }
}