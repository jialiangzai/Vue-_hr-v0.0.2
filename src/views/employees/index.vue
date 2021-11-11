<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <PageTool>
            <!-- 插入到left插槽位置 -->
            <template #left>
              <span>总记录数：100条</span>
            </template>
            <!-- 插入到right插槽位置 -->
            <template #right>
              <el-button type="warning" size="small">导入excel</el-button>
              <el-button type="danger" size="small">导出excel</el-button>
              <el-button type="primary" size="small">新增员工</el-button>
            </template>
          </PageTool>
        </div>
        <div>
          <!-- table列表 -->
          <!-- 假排序 prop指定某一列数据作为排序列 order排序方式 ascending升默认 descending降最新的-->
          <el-table
            border
            :data="list"
            :default-sort="{ prop: 'workNumber', order: 'descending' }"
          >
            <el-table-column label="序号" type="index" />
            <el-table-column label="姓名" prop="username" />
            <el-table-column sortable label="工号" prop="workNumber" />
            <el-table-column label="聘用形式" prop="formOfEmployment" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column sortable label="入职时间" prop="correctionTime" />
            <el-table-column label="账户状态">
              <el-switch v-model="qy" />
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
              <template>
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">分配角色</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row
            type="flex"
            justify="center"
            align="middle"
            style="height: 60px"
          >
            <el-pagination
              background
              layout="prev, pager, next,sizes"
              :total="total"
              :page-size="query.size"
              :current-page="query.page"
              :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  data () {
    return {
      // 存储成员列表
      list: [],
      query: {
        page: 1, // 当前页
        size: 5 // 每页条数与page-sizes第一个值保持一致
      },
      // 总数
      total: 0,
      // 账户状态
      qy: true
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { rows, total } = await getEmployeeList(this.query)
      // console.log(rows)
      this.list = rows
      this.total = total
    },
    // 分页
    changePage (newPage) {
      console.log(newPage)
      this.query.page = newPage
      this.getList
    },
    sizeChange (newPageSize) {
      console.log(newPageSize)
      this.query.size = newPageSize
      this.getList
    }
  }
}
</script>
