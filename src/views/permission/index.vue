<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-row type="flex" justify="space-between" align="middle">
            <span>权限管理</span>
            <el-button type="primary" @click="addPermiss(1, '0')">
              添加权限
            </el-button>
          </el-row>
        </div>
        <!-- card body 权限点树形table列表-->
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <!-- 给页面添加功能权限 -->
              <!-- <el-button type="text" @click="addPermiss(row,1)">可以打标识添加</el-button> -->
              <!-- type为1时为路由页面访问权限==》根据后台系统需要控制访问的页面的新增=》显示添加 -->
              <!-- type为2时为按钮功能操作权限==》根据需要控制当前下按钮操作(新增功能)=》不显示添加 -->
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="addPermiss(2, row.id)"
              >
                添加
              </el-button>
              <el-button type="text" @click="editPermission(row.id)">
                编辑
              </el-button>
              <el-button type="text" @click="delPermission(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增权限弹层 -->
    <el-dialog
      :visible="showDialog"
      :title="formData.id ? '编辑权限' : '新增权限'"
      @close="close"
    >
      <el-form
        ref="formData"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: right">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="savePermission">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>

import { getPermissionList, addPermission, delPermission, getPermissionDetail, updatePermission } from '@/api/permisson'
// 树形结构
import { transformTreeData } from '@/utils/index'
export default {
  name: 'Permission',
  data () {
    return {
      // 获取所有权限列表
      list: [],
      // 新增权限弹层
      showDialog: false,
      // 新增权限表单数据
      formData: {
        enVisible: '1', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: '权限点名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限点标识不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '权限点描述不能为空', trigger: 'blur' }]
      }

    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取所有权限列表
    async getList () {
      const data = await getPermissionList()
      this.list = transformTreeData(data)
      console.log('当前所有权限列表', this.list)
    },
    // 新增权限准备
    addPermiss (type, per) {
      console.log('当前点击的权限的id', per)
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = per
    },
    // 关闭弹层
    close () {
      this.showDialog = false
      // 表单的重置
      this.$refs.formData.resetFields()
      this.formData = {
        enVisible: '1', // 开启
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型
        pid: '' // 添加到哪个节点下
      }
    },
    // 实现真正的新增/提交修改入库====>根据id区分接口调用
    async savePermission () {
      // 校验
      await this.$refs.formData.validate()
      if (this.formData.id) {
        // 编辑
        updatePermission(this.formData)
      } else {
        // 正常新增
        await addPermission(this.formData)
      }
      this.$message.success('操作成功')
      this.getList()
      this.showDialog = false
    },
    // 删除
    async delPermission (row) {
      try {
        await this.$confirm(`确定要删除${row.name}权限吗?`)
        await delPermission(row.id)
        this.$message.success('删除成功')
        this.getList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑
    async editPermission (id) {
      // 获取最新的权限信息
      const newFormData = await getPermissionDetail(id)
      // 编辑返回的数据比新增多 拿唯一标识id作为新增和编辑的区别
      this.formData = newFormData
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
