<template>
  <!-- 点击菜单项触发的事件回调	dropdown-item 的指令 -->
  <el-dropdown trigger="hover" @command="changeLanguage">
    <div>
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">
        中文
      </el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">
        en
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Lang',
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      const newTimesCookie = new Date(Date.now() + 2 * 60 * 60 * 1000) // 一天
      // Cookie.set('lange', lang, { expires: 2 })// 默认session关闭 可以传一个对象键为expires 值为数字或者时间对象
      Cookie.set('lange', lang, { expires: newTimesCookie })
      this.$message.success('切换成功')
    }
  }
}
</script>
