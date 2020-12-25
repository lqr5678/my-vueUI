import SgUpload from './src/sg-upload.vue'

SgUpload.install = function(Vue) {
    Vue.component(SgUpload.name, SgUpload);
  };

export default SgUpload