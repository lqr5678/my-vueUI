import sgRadio from "./src/main.vue";

sgRadio.install = function(Vue) {
  Vue.component(sgRadio.name, sgRadio);
};

export default sgRadio;
