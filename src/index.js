// src/index.js 示例，主要是引入(import)组件再导出(export)，包括Vue.use所需的 install函数处理
import MyButton from "../packages/my-button/index";
import sgUploadId from "../packages/sg-upload-id/index";
import sgEquipment from "../packages/sg-equipment/index";
import SgSelect from "../packages/select/index";
import SgUpload from "../packages/upload/index";
import sgRadio from "../packages/sg-radio/index";
import sgDate from "../packages/sg-date/index";
import SgInput from "../packages/input/index";

const components = [MyButton, sgUploadId, sgEquipment, SgSelect, SgUpload, sgRadio, sgDate, SgInput];

// Vue.use() 一次性安装所有组件
const install = function(Vue) {
  if (install.installed) return;
  components.forEach(component => Vue.use(component));
  // 如果没有在src/index.js里实现install方法，就需要使用下面的
  // components.forEach(component => Vue.component(component.name, component))
};

// 直接给浏览器或 AMD loader 使用
if (typeof window !== undefined && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}

export default {
  install, // 用于ES modules，import Vue 后直接使用 Vue.use()
  MyButton, // 支持解构赋值按需引入单个组件
  sgUploadId,
  sgEquipment,
  SgSelect,
  SgUpload,
  sgRadio,
  sgDate,
  SgInput
};
