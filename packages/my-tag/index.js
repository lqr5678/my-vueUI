import myTag from "./src/main.vue";

myTag.install = function(Vue) {
  Vue.component(myTag.name, myTag);
};

export default myTag;
