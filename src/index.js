// src/index.js 示例，主要是引入(import)组件再导出(export)，包括Vue.use所需的 install函数处理
import myTabs from '../packages/my-tabs/index'
import myTag from '../packages/my-tag/index'
import myStep from '../packages/my-step/index'
import myProgress from '../packages/my-progress/index'
import myLoading from '../packages/my-loading/index'
import myButtonGroup from '../packages/my-button-group/index'
import myCheckbox from '../packages/my-checkbox/index'

const components = [myTabs, myTag, myStep, myProgress, myLoading, myButtonGroup, myCheckbox];

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
  myTabs,
  myTag,
  myStep,
  myProgress,
  myLoading,
  myButtonGroup,
  myCheckbox
};
