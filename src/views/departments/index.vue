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
                        <el-dropdown-item @click.native="delPart(data)">
                          删除部门
                        </el-dropdown-item>
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
import { getDepartments, delDepartments } from '@/api/department'
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
    async delPart (currentd) {
      console.log('要删除的部门对象：', currentd)
      /**
       * 1. 确认框
       * 2. 如果有children node节点提示
       * 3. 删除掉接口
       * 4. 重新获取数据
       */
      try {
        await this.$confirm(`确定要删除${currentd.name}吗?`, '提示')
        // 确定
        if (currentd.children && currentd.children.length > 0) {
          return this.$message.error(`包含子部门不可删除，请删除所有子部门`)
        }
        await delDepartments(currentd.id)
        // 刷新
        this.getDepartments()
        this.$message.success('删除成功！')
      } catch (error) {
        // 取消
        console.log('取消删除')
      }
    },
    handleNodeClick (data) {
      console.log(data)
    },
    // 获取部门数据
    async getDepartments () {
      const { depts, companyName } = await getDepartments()
      // console.table(depts)
      this.company.name = companyName
      // 转换结构
      // 不可调用两次重复的key
      /**
       * element组件库内部封装了数据的遍历有key且是递归的 log一次再调用函数就会报错
       * 数组中多个对象调用函数后遍历递归用的push那么就会改变源数组，所以不是同一个地址会报错
       */
      // console.log('转换后的新数据架构：', transfromTreeData(depts))
      this.departs = transfromTreeData(depts)
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
