<template>
  <el-calendar v-model="currentDate">
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
      currentDate: new Date()
    }
  },
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
