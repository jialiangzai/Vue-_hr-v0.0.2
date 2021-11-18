<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showAssignRoleDialog"
    @close="close"
  >
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="rolesList">
      <!-- label复选框选中值===>id；v-model数组记录选中的值 -->
      <el-checkbox v-for="it in list" :key="it.id" :label="it.id">
        {{ it.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 底部 -->
    <template #footer>
      <el-button type="primary" size="small" @click="saveRole">确定</el-button>
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
// 角色api
import { getRoleList } from '@/api/setting'
// 数据回显api===》user个人用户信息
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showAssignRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 所有角色列表
      list: [],
      // 选中角色列表集合
      rolesList: []
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 关闭弹出层
    close () {
      this.$emit('update:show-assign-role-dialog', false)
    },
    // 获取全部角色列表
    async getRoleList () {
      const { rows } = await getRoleList({ page: 1, pagesize: 1000 })
      // console.log('角色列表', rows)
      this.list = rows
    },
    // 必须有id知道你要给谁分配角色/查看哪个用户的角色
    // 当前分配角色用户的ID在父组件中，如果我们的数据获取是在mounted里执行的
    // 此时我们还没有点击角色按钮进行父传子，请求发起时是没有userId的，就会报错
    async getRoleDetail (id) {
      // const { roleIds } = await getUserDetailById(id)
      const res = await getUserDetailById(id)
      console.log('当前点击的用户人的资料', res)
      // 入库提交时用
      this.userId = id
      // 赋值===》数据回显 roleIds是一个数组
      this.rolesList = res.roleIds
    },
    // 分配角色实现
    async saveRole () {
      await assignRoles({ id: this.userId, roleIds: this.rolesList })
      this.$message.success('分配角色成功')
      // 关闭弹框
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox {
  margin: 16px;
}
</style>
