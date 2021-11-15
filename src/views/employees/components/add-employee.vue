<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="close">
    <!-- 表单 -->
    <el-form ref="addForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="it in hireType"
            :key="it.id"
            :label="it.value"
            :value="it.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="showDep = true"
        />
        <!-- 选择部门显示到上面的输入框 -->
        <el-row v-show="showDep" class="selBox">
          <i class="el-icon-circle-close" @click="showDep = false"></i>
          <!-- row独占一行 -->
          <el-tree
            :data="departData"
            :props="{ label: 'name' }"
            @node-click="selDep"
          ></el-tree>
        </el-row>
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="$emit('close-show', false)">取消</el-button>
      <el-button type="primary" @click="addEmpl"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<script>
import EnumTypes from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
// 复用树形部门
import { getDepartments } from '@/api/department'
// 时间格式化转树形工具
import { transformTreeData, parseTime } from '@/utils/index'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 控制部门显示或隐藏
      showDep: false,
      // 部门
      departData: [],
      // 枚举
      // EnumTypes,
      hireType: EnumTypes.hireType,
      // 表单的数据
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        timeOfEntry: '', // 入职时间
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        correctionTime: '' // 转正时间
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getDepartData()
  },
  methods: {
    // 新增只能添加一个
    async addEmpl () {
      try {
        //  做整体验证
        this.$refs.addForm.validate()
        // 格式化时间 入职---转正
        this.formData.correctionTime = parseTime(this.formData.correctionTime, '{y}-{m}-{d}')
        this.formData.timeOfEntry = parseTime(this.formData.timeOfEntry, '{y}-{m}-{d}') // 掉接口
        await addEmployee(this.formData)
        // 提示
        this.$message.success('添加成功')
        // 关闭
        this.close()
        // 刷新 通知父级
        this.$parent.getList()
      } catch (error) {
        console.dir(error)
      }
    },

    // 关闭
    close () {
      this.$emit('close-show', false)
      this.$refs.addForm.resetFields()
    },
    // 获取部门数据
    // 获取部门数据
    async getDepartData () {
      const { depts } = await getDepartments()
      // 转换结构s
      // 不可调用两次重复的key
      /**
         * element组件库内部封装了数据的遍历有key且是递归的 log一次再调用函数就会报错
         * 数组中多个对象调用函数后遍历递归用的push那么就会改变源数组，所以不是同一个地址会报错
         */
      // console.log('转换后的新数据架构：', transformTreeData(depts))
      this.departData = transformTreeData(depts)
      // this.departData = depts
    },
    // 选择部门
    selDep (currDept) {
      console.log('当前选中的部门对象', currDept)
      // 数据驱动更改input的显示
      this.formData.departmentName = currDept.name
      // 选择后关闭
      this.showDep = false
    }
  }
}
</script>
<style lang="scss" scoped>
// row
.selBox {
  width: 280px;
  border: 1px solid;
  position: relative;
  .el-icon-circle-close {
    position: absolute;
    top: 6px;
    right: 6px;
    color: rgba(6, 75, 131, 0.541);
    font-size: 24px;
    // 不显示表示被压住了
    z-index: 10;
  }
}
</style>
