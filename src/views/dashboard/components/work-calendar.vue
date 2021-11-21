<template>
  <!-- bug：刷新之后才能实现多语言化 让组件重新加载 ===》销毁再重新挂载 ====》v-if -->
  <el-calendar v-if="show" v-model="currentDate">
    <!-- 具名插槽 日历单元格中显示的内容-->
    <!-- date	单元格代表的日期 -->
    <!-- data	{ type, isSelected, day}，type 表示该日期的所属月份
    可选值有 prev-month，current-month，next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 yyyy-MM-dd -->
    <template #dateCell="{ date, data }">
      <!-- <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split("-").slice(1).join("-") }}
        {{ data.isSelected ? "✔️" : "" }}
      </p> -->
      <div class="date-content">
        <span class="text">{{ getDay(data.day) }}</span>
        <span v-if="isWeek(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data () {
    return {
      // 动态去刷新挂载
      show: true,
      currentDate: new Date()
    }
  },
  // watch: {
  //   async '$i18n.locale' (newValue) {
  //     console.log('监控到多语言切换了：', newValue)
  //     // 监听多语言变化=》手动销毁日历，让他重新创建=》解决星期切换不翻译问题
  //     // 1. 先销毁
  //     this.show = false
  // 如果不传回调支持promise对象===》async和await
  //     await this.$nextTick()
  //     // 注意：等到销毁之后
  //     // 2. 在创建（刷新）
  //     this.show = true
  //   }
  // },
  // 监听多语言化的变化后实现某些事(重新挂载===》show=false/true)//不用v-show是它是display:none隐藏仍然存在dom树
  watch: {
    '$i18n.locale' (newValue) {
      console.log('监控到多语言切换了：', newValue)
      this.show = false
      // 销毁完后重新渲染Dom才执行
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  // created () {
  //   console.log(this.$i18n)
  // },
  // 定制
  methods: {

    // 显示几号  2021-11-19===> 19
    getDay (d) {
      // 日历单元格中显示的内容
      // console.log(d)
      // 取日
      return d.split('-')[2]
    },
    // 周末
    isWeek (v) {
      // 周末
      return v.getDay() === 6 || v.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: 50px;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
// 休息时间
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
// 当前日期
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
</style>
