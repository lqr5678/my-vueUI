import myTabs from "./src/main.vue";

myTabs.install = function(Vue) {
  Vue.component(myTabs.name, myTabs);
};

export default myTabs;
