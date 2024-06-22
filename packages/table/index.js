import RuTable from "./lib/table.vue";
import RuTableColumn from "./lib/tableColumn.vue";

export default  {
    install: (app) => {
        app.component(RuTable.name, RuTable);
        app.component(RuTableColumn.name, RuTableColumn);
    }
}