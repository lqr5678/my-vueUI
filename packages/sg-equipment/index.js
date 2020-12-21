import sgEquipment from "./src/main.vue";

sgEquipment.install = function(Vue) {
  Vue.component(sgEquipment.name, sgEquipment);
};

export default sgEquipment;
