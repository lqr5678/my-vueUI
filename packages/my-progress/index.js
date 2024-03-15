import myProgress from "./src/main.vue";

myProgress.install = function(Vue) {
  Vue.component(myProgress.name, myProgress);
};

export default myProgress;
