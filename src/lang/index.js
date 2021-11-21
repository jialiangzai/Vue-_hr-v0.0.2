import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入国际化的插件包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
Vue.use(VueI18n)
// 引入自定义中文包
import customZH from './zh'
// 引入自定义英文包
import customEN from './en'
import Cookie from 'js-cookie'
const i18n = new VueI18n(
  {
    // 指定语言类型 zh表示中文  en表示英文  字符串
    // 实现动态
    locale: Cookie.get('lange') || 'zh',
    // 将elementUI语言包加入到插件语言数据里
    messages: {
      en: {
        ...elementEN,
        ...customEN
      },
      zh: {
        ...elementZH,
        ...customZH
      }

    }
  }
)
// 导出多语实例
export default i18n
