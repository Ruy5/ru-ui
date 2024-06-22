import RuPagination from "./lib/pagination.vue";

export default  {
    install: (app) => {
        app.component(RuPagination.name, RuPagination);
    }
}