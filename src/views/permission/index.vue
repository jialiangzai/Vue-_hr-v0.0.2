<template>
  <!--成员管理 -->
  <div class="permission-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 具名插槽 传入面板头部 -->
        <template #header>
          <!-- 组织架构 -->
          <span>组织架构</span>
        </template>
        <!-- card body 默认插槽--》面板的内容-->
        <div>我是面板的内容</div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
