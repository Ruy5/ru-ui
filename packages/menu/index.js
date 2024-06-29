import RuMenuWp from "./lib/menuWp.vue";
import RuMenuItemWp from "./lib/menuItemWp.vue";
import RuSubMenuWp from "./lib/subMenuWp.vue";

export default  {
    install: (app) => {
        app.component(RuMenuWp.name, RuMenuWp);
        app.component(RuMenuItemWp.name, RuMenuItemWp);
        app.component(RuSubMenuWp.name, RuSubMenuWp);
    }
}