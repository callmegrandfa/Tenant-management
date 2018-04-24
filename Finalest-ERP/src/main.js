// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import router from './router/indexc.js'//路由
import ElementUI from 'element-ui'//UI组件http://element-cn.eleme.io
import 'element-ui/lib/theme-chalk/index.css'
import SimpleVueValidation from 'simple-vue-validator'//表单验证http://simple-vue-validator.maijin.info
import App from './App'
import axios from './axios'//ajax封装
import 'jquery'
import vuescroll from 'vuescroll'//火狐无法更改滚动条样式，引入虚拟滚动条https://github.com/wangyi7099/vuescroll
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(SimpleVueValidation);
Vue.use(vuescroll);
Vue.prototype.$axios = axios;
Vue.prototype.Validator  = SimpleVueValidation.Validator;
SimpleVueValidation.extendTemplates({//表单验证全局配置
  error: '错误.',
  required: '必填',
  float: '必须是浮点数',
  integer: '必须是整数',
  number: '必须是数字',
  lessThan: 'Must less than {0}.',
  lessThanOrEqualTo: 'Must less than or equal to {0}.',
  greaterThan: 'Must greater than {0}.',
  greaterThanOrEqualTo: 'Must greater than or equal to {0}.',
  between: 'Must between {0} and {1}.',
  size: 'Size must be {0}.',
  length: 'Length must be {0}.',
  minLength: '最小长度为 {0} 字节',
  maxLength: '最大长度为 {0} 字节',
  lengthBetween: 'Length must between {0} and {1}.',
  in: 'Must be {0}.',
  notIn: 'Must not be {0}.',
  match: 'Not matched.',
  regex: 'Invalid format.',
  digit: 'Must be digit.',
  email: 'Invalid email.',
  url: 'Invalid url.',
});

new Vue({
  el: '#app',
  store,
  router,
  axios,
  render: h => h(App),
  template: '<App/>',
  components: { App },
  meta: {
    keepAlive: store.state.Alive // 用户登录跳转时页面不被缓存
  }
})
