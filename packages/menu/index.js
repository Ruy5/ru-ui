import RuMenuWp from "./lib/menu-wp.vue";

export default  {
    install: (app) => {
        app.component(RuMenuWp.name, RuMenuWp);
    }
}