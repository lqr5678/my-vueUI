import myStep from "./src/main.vue";

myStep.install = function(Vue) {
  Vue.component(myStep.name, myStep);
};

export default myStep;
