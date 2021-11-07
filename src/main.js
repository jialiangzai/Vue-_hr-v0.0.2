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

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// console.log('看看process', process.env)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
