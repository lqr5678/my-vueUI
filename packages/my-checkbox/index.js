import myCheckbox from "./src/main.vue";

myCheckbox.install = function(Vue) {
  Vue.component(myCheckbox.name, myCheckbox);
};

export default myCheckbox;
