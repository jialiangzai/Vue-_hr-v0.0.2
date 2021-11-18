<template>
  <!-- 分配权限的弹层 -->
  <el-dialog
    title="分配权限(一级为路由页面查看权限-二级为按钮操作权限)"
    :visible="showRolePer"
    @close="closeAssignDialog"
  >
    <!-- node-key="id" // 选中时绑定的数据字段(唯一) 必传属性 -->
    <el-row>
      <el-tree
        ref="tree"
        :data="list"
        node-key="id"
        :props="{ label: 'name' }"
        :show-checkbox="true"
        :highlight-current="true"
        :check-strictly="true"
        :default-expand-all="true"
      ></el-tree>
    </el-row>

    <!-- 权限点数据展示 -->
    <template #footer>
      <el-button @click="$emit('update:showRolePer', false)">取消</el-button>
      <el-button type="primary" @click="savePermiss">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
// 获取所有权限列表
import { getPermissionList } from '@/api/permisson'
import { transformTreeData } from '@/utils'
// 获取角色详情
import { getRoleDetail, assignPerm } from '@/api/setting'
export default {
  props: {
    showRolePer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 全部
      list: [],
      // 已选
      roleDetail: [],
      // id
      roleId: ''
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    // 关闭
    closeAssignDialog () {
      this.$emit('update:showRolePer', false)
      this.roleDetail = []
    },
    // 获取所有权限列表
    async getPermissionList () {
      const data = await getPermissionList()
      // 转为树形
      this.list = transformTreeData(data)
    },
    // 数据回显
    async getPerDetail (id) {
      // 获取当前角色的详情
      const roleDetail = await getRoleDetail(id)
      console.log('当前角色的详情', roleDetail)
      // 设置树形选中状态
      this.$refs.tree.setCheckedKeys(roleDetail.permIds)
      // 存储ID
      this.roleId = id
    },
    // 保存当前角色的最新权限
    async savePermiss () {
      //  {id:角色id, permIds:[] 所有选中的节点的id组成的数组}
      await assignPerm({ id: this.roleId, permIds: this.$refs.tree.getCheckedKeys() })
      this.$message.success('分配成功')
      this.$emit('update:showRolePer', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
