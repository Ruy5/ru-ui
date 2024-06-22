import RuRichtext from "./lib/richtext.vue";

export default  {
    install: (app) => {
        app.component(RuRichtext.name, RuRichtext);
    }
}