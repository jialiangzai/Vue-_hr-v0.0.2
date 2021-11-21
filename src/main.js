import Vue from 'vue'
// 重置浏览器默认css样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入element组件库和css样式
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 开发环境
// 因为生产环境使用CDN方式引入Element样式，所以样式引入要在main入口排除
if (process.env.NODE_ENV === 'development') {
  require('element-ui/lib/theme-chalk/index.css')
}
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
// 自定义指令
import * as direct from '@/directives/index'
// 批量注册多个 遍历一个对象把对象的所有属性名放到数组中
Object.keys(direct).forEach(name => {
  Vue.directive(name, direct[name])
})
// 全局混入
import checkPermission from '@/mixin'
Vue.mixin(checkPermission)
// echarts按需加载
import importEcharts from '@/utils/plugins.js'
Vue.use(importEcharts)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 全局多语言
import i18n from '@/lang'
// Vue.use(ElementUI)
// Vue.use({ i18n: (key, value) => i18n.t(key, value) })
// 固定写法
Vue.use(ElementUI, {
  i18n: (k, v) => i18n.t(k, v)
})
// 注册全局组件用插件的形式
import ComponentPage from '@/components/index'
// 自动执行install方法
Vue.use(ComponentPage)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// console.log('看看process', process.env)
Vue.config.productionTip = false
// 加入到根实例配置项中 this.$
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
