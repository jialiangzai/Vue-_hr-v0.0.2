<template>
  <div class="department-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <!-- 具名插槽header=》传入面板头部结构 -->
        <template #header>
          <!-- <span>组织架构</span> -->
          <!-- 用一个行列布局 -->
          <el-row>
            <el-col :span="20">
              <span>{{ company.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="addDept()">
                        添加子部门
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
        <!-- 默认插槽=》传入面板内容 -->
        <el-tree
          :data="departData"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
        >
          <!-- 单项数据 作用域插槽定义好了的-->
          <template #default="{ data }">
            <!-- 单个树的项结构 -->
            <el-row style="width: 100%">
              <!-- 显示部门名 -->
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <!-- 部门操作按钮 -->
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager || "--" }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="addDept(data, 1)">
                          添加子部门
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="addDept(data, 2)">
                          编辑部门
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="delDept(data)">
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
    <!-- 新增弹出层 -->
    <AddDept
      ref="editDept"
      :show="show"
      :curr-dept="currDept"
      :all-depts="allDepts"
      @close-dialog="show = $event"
      @update-list="getDepartData"
    />
  </div>
</template>

<script>
import { getDepartments, delDepartments } from '@/api/department'
import { transformTreeData } from '@/utils/index'
import AddDept from './components/add-dept'
export default {
  components: {
    AddDept
  },
  data () {
    return {
      // 定义控制窗体显示的变量
      show: false,
      // 当前操作部门数据 是个对象
      currDept: null,
      // departData是嵌套的要递归为了方便重新声明
      allDepts: [],
      // // node节点
      // curNode: {},
      // 数据组织架构
      departData: [
        // {
        //   name: '总裁办'

        // },
        // {
        //   name: '财务部',
        //   children: [{
        //     name: '税务'
        //   }]
        // }
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
    this.getDepartData()
  },
  methods: {
    // 添加/操作部门 data表示当前添加子部门的父部门对象
    addDept (currDept, type) {
      /**
       * 1为新增 2 为编辑 自定义的flag
       */
      // type === '1' ? '编辑' : '新增'
      this.currDept = currDept
      // console.log(currDept)
      if (type === 2) {
        // 编辑情况下做数据回显  this.$refs
        this.$refs.editDept.getDepartDetail(this.currDept.id)
      }
      this.show = true
    },

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
        this.getDepartData()
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
    async getDepartData () {
      const { depts, companyName } = await getDepartments()
      // console.table(depts)
      this.company.name = companyName
      this.allDepts = depts
      // 转换结构s
      // 不可调用两次重复的key
      /**
         * element组件库内部封装了数据的遍历有key且是递归的 log一次再调用函数就会报错
         * 数组中多个对象调用函数后遍历递归用的push那么就会改变源数组，所以不是同一个地址会报错
         */
      // console.log('转换后的新数据架构：', transformTreeData(depts))
      this.departData = transformTreeData(depts)
      // this.departData = depts
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
