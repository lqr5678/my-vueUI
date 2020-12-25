import sgDate from "./src/main.vue";

sgDate.install = function(Vue) {
  Vue.component(sgDate.name, sgDate);
};

export default sgDate;
