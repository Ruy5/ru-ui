import RuMarkdown from "./lib/markdown.vue";

export default  {
    install: (app) => {
        app.component(RuMarkdown.name, RuMarkdown);
    }
}