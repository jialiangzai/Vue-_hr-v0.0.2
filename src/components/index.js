/**
 * 注册全局组件
 */
import PageTool from '@/components/PageTools'
export default {
  /**
   *
   * @param {*} Vue Vue构造函数
   */
  install (Vue) {
    // 注册全局组件 去main用Vue.use
    Vue.component('PageTool', PageTool)
  }
}
