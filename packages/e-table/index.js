import eTable from "./src/main.vue";

eTable.install = function(Vue) {
  Vue.component(eTable.name, eTable);
};

export default eTable;
