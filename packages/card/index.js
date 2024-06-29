import RuCard from "./lib/card.vue";

export default  {
    install: (app) => {
        app.component(RuCard.name, RuCard);
    }
}