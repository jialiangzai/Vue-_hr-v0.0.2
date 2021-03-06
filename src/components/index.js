/**
 * 注册全局组件
 */
import PageTool from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import ScreenFull from '@/components/ScreenFull'
import Lang from '@/components/Lang'
const components = [PageTool, UploadExcel, UploadImg, ScreenFull, Lang]
export default {
  /**
   *
   * @param {*} Vue Vue构造函数
   */
  install (Vue) {
    // 注册全局组件 去main用Vue.use
    // Vue.component('PageTool', PageTool)
    // cp.name 作为批量注册组件的标签名
    // cp组件对象
    components.forEach(cp => {
      Vue.component(cp.name, cp)
    })
  }
}
