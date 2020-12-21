import Vue from 'vue'
import App from './App.vue'
import {Upload, Form, FormItem, Input, Table, TableColumn,Radio,RadioGroup,} from 'element-ui'

Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Radio);
Vue.use(RadioGroup);
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
