<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <PageTool>
            <!-- 插入到left插槽位置 -->
            <template #left>
              <span>总记录数：{{ total }}条</span>
            </template>
            <!-- 插入到right插槽位置 -->
            <template #right>
              <el-button
                type="warning"
                size="small"
                @click="$router.push('/import')"
              >
                导入excel
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="exportData"
                :loading="downloadLoading"
                >导出excel</el-button
              >
              <el-button type="primary" size="small" @click="showDialog = true">
                新增员工
              </el-button>
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
            <el-table-column label="聘用形式" prop="formOfEmployment">
              <!-- 自定义数据及结构把后台传递的数据进行枚举控制格式不用过滤器用函数的形式 -->
              <template #default="{ row }">
                <p>{{ formatForm(row.formOfEmployment) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column sortable label="入职时间" prop="correctionTime">
              <template #default="{ row }">
                {{ formatDate(row.timeOfEntry) }}
              </template>
            </el-table-column>
            <el-table-column label="账户状态" align="center">
              <el-switch v-model="qy" />
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
              <template #default="{ row }">
                <el-button
                  type="text"
                  size="small"
                  @click="$router.push(`/employees/detail/${row.id}`)"
                  >查看</el-button
                >
                <el-button type="text" size="small">分配角色</el-button>
                <el-button type="text" size="small" @click="delEmpl(row)">
                  删除
                </el-button>
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
              :page-sizes="[5, 10, 20, 30, 40, 50, 100, 2]"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
        </div>
      </el-card>
    </div>
    <AddEmpl :show-dialog="showDialog" @close-show="showDialog = $event" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EnumTypes from '@/api/constant/employees'
console.log('枚举的数据', EnumTypes)
import dayjs from 'dayjs'
// 导入新增员工组件
import AddEmpl from './components/add-employee.vue'
export default {
  components: {
    AddEmpl
  },
  data () {
    return {
      // 枚举的数据====>和后台约定定义好的数据 一组常量的集合(对象)
      EnumTypes,
      // 存储成员列表
      list: [],
      query: {
        page: 1, // 当前页
        size: 5 // 每页条数与page-sizes第一个值保持一致
      },
      // 总条数
      total: 0,
      // 账户状态
      qy: true,
      // 对话框显示
      showDialog: false,
      // 避免重复点击
      downloadLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 导出
    async exportData () {
      // 开启导出
      this.downloadLoading = true
      // 导出核心 按需加载一个js模块（懒加载）
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      //   const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
      //   const list = this.list
      //   const data = this.formatJson(filterVal, list)
      //   // 使用js模块的方法
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: this.filename,
      //     autoWidth: this.autoWidth,
      //     bookType: this.bookType
      //   })
      // })
      // promise对象
      const excel = await import('@/vendor/Export2Excel')
      // excel.export_json_to_excel({
      //   // 表头 必填
      //   header: ['姓名', '工资'],
      //   // 表头对应的具体数据 必填
      //   data: [
      //     ['刘备', 100],
      //     ['关羽', 500]
      //   ],
      //   filename: 'excel-list', // 导出下载的文件名称
      //   autoWidth: true, // 导出excel列宽度是否自适应
      //   bookType: 'xlsx' // 导出生成的文件类型
      // })
      // excel表示导入的模块对象
      // console.log(excel)
      // 导出数据key对应关系
      const map = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '工号': 'workNumber',
        '转正日期': 'correctionTime',
        '部门': 'departmentName'
      }
      // 表头 数组
      const headerShips = Object.keys(map)
      // 导出数据项 数组
      const exportDatas = Object.values(map)
      // data转二维数组-----》考虑字段
      const data = this.transformTdata(this.list, exportDatas)
      // 单页导出excel
      excel.export_json_to_excel({
        header: headerShips,
        data,
        // 导出下载的文件名称
        filename: `elm-list-${Date.now()}`,
        // 导出excel列宽度是否自适应
        autoWidth: true,
        // 导出生成的文件类型
        bookType: 'xlsx'
      })
      // 导出结束
      this.downloadLoading = false

    },
    // 转二维数组
    transformTdata (list, enKeys) {
      /**
       * [{},{}]===>[[],[]]
       */
      // 最终效果
      const newList = []
      // 单个成员
      list.forEach(user => {
        // 每成员对象
        const newItem = []
        for (const key in user) {
          // 过滤字段 指定导出的excel的字段
          if (enKeys.includes(key)) {
            if (key === 'formOfEmployment') {
              // 聘用形式
              newItem.push(this.formatForm(user[key]))
            } else {
              newItem.push(user[key])
            }
          }
        }
        newList.push(newItem)
      })
      // console.log('二维数组', newList)
      return newList
    },
    async getList () {
      const { rows, total } = await getEmployeeList(this.query)
      // console.log(rows)
      this.list = rows
      this.total = total
    },
    // 分页
    changePage (newPage) {
      // console.log(newPage)
      this.query.page = newPage
      this.getList()
    },
    sizeChange (newPageSize) {
      // console.log(newPageSize)
      this.query.size = newPageSize
      this.getList()
    },
    // 格式化聘用形式
    formatForm (type) {
      // 也可以if直接改这里练习枚举
      // hireType
      // 用映射关系
      const map = {}
      this.EnumTypes.hireType.forEach(item => {
        map[item.id] = item.value
      })
      // console.log(map)
      return map[type]
    },
    formatDate (value, str = 'YYYY-MM-DD') {
      return dayjs(value).format(str)
    },
    async delEmpl (row) {
      // console.log(row)
      // 用户确认
      try {
        await this.$confirm(`确认要删除${row.username}吗?`)
        await delEmployee(row.id)
        // 仅限于最后一页删除完
        // 总条数
        const newPagess = Math.ceil(this.total - 1 / this.query.size)
        // console.log(newPagess)
        // if (this.query.page > newPagess) {
        //   // 有余情况 math.ceil
        //   this.query.page = newPagess
        // }
        // 排除只剩一页情况（页码默认是1）
        if (newPagess > 0) {
          this.query.page = this.query.page > newPagess ? newPagess : this.query.page
        }
        // 刷新
        this.getList()
        this.$message.success('删除成功！')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
