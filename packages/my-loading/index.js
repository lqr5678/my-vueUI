import myLoading from "./src/main.vue";

myLoading.install = function(Vue) {
  Vue.component(myLoading.name, myLoading);
};

export default myLoading;
