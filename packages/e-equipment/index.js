import eEquipment from "./src/main.vue";

eEquipment.install = function(Vue) {
  Vue.component(eEquipment.name, eEquipment);
};

export default eEquipment;
