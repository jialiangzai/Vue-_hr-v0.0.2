<template>
  <div class="department-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 具名插槽 传入面板头部 -->
        <template #header>
          <!-- 组织架构 -->
          <!-- 用一个行列布局 -->
          <el-row>
            <!-- 左栏公司 -->
            <el-col :span="20">
              <span>{{ company.name }}</span>
            </el-col>
            <!-- 右栏操作 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
        <!-- card body 默认插槽--》面板的内容-->
        <!-- 单个树架构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
        >
          <!-- 作用域插槽 -->
          <!-- <template #default="{ data }">
            <h1>{{ data.name }}</h1>
          </template> -->
          <!-- 作用域插槽 data拿到的是每一个子节点的对象 -->
          <!--
      什么时候用到作用域插槽？父组件中如果想使用子组件中的数据进行自定义内容的渲染 (table 单元格数据渲染)
    -->
          <template #default="{ data }">
            <el-row style="width: 100%">
              <!-- 显示部门名 与第一层对齐 -->
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <!-- 操作 -->
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartments } from '@/api/department'
import { transfromTreeData } from '@/utils/index'
export default {
  data () {
    return {
      // 数据组织架构
      departs: [
        {
          name: '总裁办'

        },
        {
          name: '财务部',
          children: [{
            name: '税务'
          }]
        }
      ],
      // 公司的信息
      company: { name: '', manger: 'CEO' },
      // 修改树形结构中的属性名
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    // 获取部门数据
    async getDepartments () {
      const { depts, companyName } = await getDepartments()
      console.table(depts)
      this.company.name = companyName
      // 转换结构
      // transfromTreeData(depts)
      console.log('转换后的新数据架构：', transfromTreeData(depts))
      this.departs = depts
    }
  }
}
</script>

<style lang="scss" scoped>
// less用/deep/空格    scss用::v-deep空格 ---->作用一样开启深度样式控制
::v-deep .el-tree-node__content {
  margin: 3px 0;
  font-size: 14px;
}
</style>
