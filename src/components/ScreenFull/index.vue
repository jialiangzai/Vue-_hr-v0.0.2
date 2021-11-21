<template>
  <!-- 放置一个图标 -->
  <div>
    <svg-icon
      :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data () {
    return {
      isFull: false
    }
  },
  // 组件创建的时候判断图标
  created () {
    // 监听状态的改变
    screenfull.on('change', () => {
      // isFullscreen是插件属性全屏状态 插件监听事件去监听自身的isFullscreen属性布尔值 ===》我们需要的
      // if (screenfull.isFullscreen) {
      //   this.isFull = true
      // } else {
      //   this.isFull = false
      // }
      this.isFull = screenfull.isFullscreen
    })
  },
  // 耗内存
  beforeDestroy () {
    screenfull.off('change')
  },
  methods: {
    toggleScreen () {
      if (!screenfull.isEnabled) {
        // 不支持
        this.$message.warning('您的浏览器不支持全屏')
        return
      }
      // 支持
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
