<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div>
    <el-switch
      v-model="flag"
      active-text="开启"
      inactive-text="不开启"
      @change="loop"
    >
    </el-switch>
    <div ref="myDiv" class="radar-echart" />
  </div>
</template>

<script>
// import * as echarts from 'echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
// import * as echarts from 'echarts/core'
// import { TitleComponent, LegendComponent } from 'echarts/components'
// import { RadarChart } from 'echarts/charts'
// import { CanvasRenderer } from 'echarts/renderers'

// echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer])
export default {
  data () {
    return {
      flag: false,
      myChart: null,
      opt: {
        // 标题
        // title: {
        //   text: 'Basic Radar Chart'
        // },
        // 图例
        // legend: {
        //   data: ['Allocated Budget', 'Actual Spending']
        // },
        radar: {
          axisName: {
            // 维度样式
            // textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
            // }
          },
          // shape: 'circle',
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '考勤', max: 100 },
            { name: '积极性', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '自主学习', max: 100 },
            { name: '正确率', max: 100 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: []
          }
        ]
      }
    }
  },
  // 挂载之后才可初始化echart图表操作dom
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.echarts.init(this.$refs.myDiv)
      // series是数组可多个数据对象
      // 绘制图表=> 传入不同图表的配置对象options:{}
      // 动态切换核心改option里的data=》重新调用myChart.setOption方法
      this.opt.series[0].data = [{
        value: [10, 1, 100, 5, 100, 0],
        name: '张三'
      },
      {
        value: [100, 100, 50, 50, 50, 10],
        name: '李四'
      }]
      this.myChart.setOption(this.opt)
    },
    // switch
    // switch 状态发生变化时的回调函数	新状态的值
    loop (flag) {
      console.log(flag)
      if (this.trs) {
        clearInterval(this.trs)
        this.trs = null
        return
        // return this.trs && clearInterval(this.trs)  初始化节流环境定时器
      }
      this.trs = setInterval(this.changeData, 1500)
    },
    changeData () {
      /**
       * 随机生成数据值data.value
       */
      const newData = []
      // 约定三个人
      for (let index = 0; index < 2; index++) {
        const newArray = []
        // value ===>indicator对应留个维度
        for (let k = 0; k < 5; k++) {
          const newArrayItems = Math.floor(Math.random() * 100 + 1)
          newArray.push(newArrayItems)
        }
        // 单个随机数
        // 每个对象
        const DataItem = {
          value: newArray,
          name: `王${index + 1}`
        }
        newData.push(DataItem)
      }
      this.opt.series[0].data = newData
      this.myChart.setOption(this.opt)
      // return newData
    }
  }
}
</script>

<style>
.radar-echart {
  width: 100%;
  height: 400px;
}
</style>
