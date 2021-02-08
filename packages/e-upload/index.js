import eUpload from './src/main.vue'

eUpload.install = function(Vue) {
    Vue.component(eUpload.name, eUpload);
  };

export default eUpload