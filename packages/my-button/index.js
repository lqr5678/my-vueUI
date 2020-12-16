import MyButton from "./src/main.vue";

MyButton.install = function(Vue) {
  Vue.component(MyButton.name, MyButton);
};

export default MyButton;
