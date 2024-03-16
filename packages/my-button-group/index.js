import myButtonGroup from "./src/main.vue";

myButtonGroup.install = function(Vue) {
  Vue.component(myButtonGroup.name, myButtonGroup);
};

export default myButtonGroup;
