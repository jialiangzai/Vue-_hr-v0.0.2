
// 利用install方法全局挂载echarts按需方法使用就不用再引入了
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer])

// 睡眠函数
const $sleep = (timers) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timers)
  })
}

export default {
  install (Vue) {
    Vue.prototype.$sleep = $sleep
    Vue.prototype.echarts = echarts
  }
}
