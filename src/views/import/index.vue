<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>批量导入员工</span>
      </div>
      <!-- card body -->
      <UploadExcel :before-upload="beforeUpload" :on-success="handleSuccess" />
    </el-card>
  </div>
</template>

<script>
import { formatExcelDate } from '@/utils/index'
import { importEmployees } from '@/api/employees'
export default {
  methods: {
    /**
     * file 选择的excel文件
     * 上传之前校验：
     * 1. 校验大小
     * 2. 校验文件格式
     * 校验通过 return true | 校验失败 return false（必须）
     */
    // 只有返回true才会触发onSuccess函数
    beforeUpload (file) {
      console.log('上传之前校验', file)

      return true
      //   const isLt1M = file.size / 1024 / 1024 < 1

      //   if (isLt1M) {
      //     return true
      //   }

      //   this.$message({
      //     message: 'Please do not upload files larger than 1m in size.',
      //     type: 'warning'
      //   })
      //   return false
      // },
    },
    // 参数就是读取的文件
    async handleSuccess ({ results, header }) {
      // 把excel经过分析转换成js能够识别的常规数据，拿到数据我们可以进行任何操作
      console.log('读取的数据头', header)
      console.log('读取的数据', results)
      // header中, results中的数据是中文的, 但是提交给后台的要是英文的
      // const newArr = this.transExcelData(results)
      // 此时是英文键的每个成员信息
      const newRee = this.transExcelData(results)
      await importEmployees(newRee)
      // 返回员工管理页面
      this.$router.back()
    },
    transExcelData (results) {
      const newArr = []
      const newUser = {}
      // 设计映射表 中====》英
      const maps = {
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      results.forEach(user => {
        // 存储
        for (const key in user) {
          // 中文
          const enKey = maps[key]
          // 英文
          // newUser[enKey] = user[key]
          // 格式化时间
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // excel时间转换(读取excel时间多70年)
            newUser[enKey] = formatExcelDate(user[key], '-')
          } else {
            newUser[enKey] = user[key]
          }
        }
        newArr.push(newUser)
      })
      return newArr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
