import Vue from 'vue'
// 重置浏览器默认css样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入element组件库和css样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 改为中文
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 导入全局样式
import '@/styles/index.scss' // global css
// 根组件
import App from './App'
import store from './store'
import router from './router'
// 导入不带名字就会默认执行一次
import '@/icons' // icon
// 添加路由守卫 2个
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
