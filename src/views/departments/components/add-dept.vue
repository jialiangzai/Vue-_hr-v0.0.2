<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="handleCloseDialog">
    <!-- 新增部门的弹层 -->
    <!-- 表单 -->
    <el-form ref="deptForm" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <!--默认插槽  -->
          <!-- label选项显示的值；value选项选中被保存的值 -->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click.native="clickSubmit">
        确定
      </el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { addDepartments } from '@/api/department'
export default {
  // 需要传入一个props变量来控制 显示或者隐藏
  props: {
    // 控制弹出框
    showDialog: {
      type: Boolean,
      default: false
    },
    curnode: {
      type: Object,
      default: () => { }
    },
    departs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    // 编码
    const validateCode = (rule, value, callback) => {
      // 遍历所有部门数据匹配
      if (this.departs.some(item => item.code === value)) {
        callback(new Error('当前code码重复'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        /**
         * 部门名称（name）	必填 1-50个字符  / 同级部门中禁止出现重复部门
         * 部门编码（code）	必填 1-50个字符  / 部门编码在整个模块中都不允许重复
         * 部门负责人（manager）   	必填
         * 部门介绍 ( introduce)	必填 1-300个字符

         */
        name: [
          // 非空
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          // 长度
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] }
        ],
        code: [
          // 非空
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          // 长度
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      },
      // 部门负责人选择列表数据
      peoples: []
    }
  },
  mounted () {
    this.hGetEmployeeSimple()
  },
  methods: {
    handleCloseDialog () {
      this.$emit('close-dialog', false)
    },
    // 获取员工简单列表数据
    async hGetEmployeeSimple () {
      const data = await getEmployeeSimple()
      this.peoples = data
      console.log(data)
    },

    // 提交
    clickSubmit () {
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 表示可以提交了
          // 表示可以提交了 || 顶级部门pid传空（公司下）
          await addDepartments({ ...this.form, pid: this.curnode.id || '' })
          // 关闭弹框
          this.$emit('close-dialog')
          this.$emit('updatedepart')
          this.closeDialog()
        }
      })
    },
    closeDialog () {
      // 通知父组件把控制弹框显示的数据设置为false
      this.$emit('close-dialog')
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 清除校验残留
      this.$refs.deptForm.resetFields()
    }
  }
}

</script>
