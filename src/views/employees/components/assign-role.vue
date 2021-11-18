<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showAssignRoleDialog"
    @close="close"
  >
    <!-- 这里准备复选框 -->
    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button
        size="small"
        @click="$emit('update:show-assign-role-dialog', false)"
      >
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showAssignRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭弹出层
    close () {
      this.$emit('update:show-assign-role-dialog', false)
    }
  }
}
</script>
