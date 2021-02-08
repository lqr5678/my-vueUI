import eDate from "./src/main.vue";

eDate.install = function(Vue) {
  Vue.component(eDate.name, eDate);
};

export default eDate;
