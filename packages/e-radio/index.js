import eRadio from "./src/main.vue";

eRadio.install = function(Vue) {
  Vue.component(eRadio.name, eRadio);
};

export default eRadio;
