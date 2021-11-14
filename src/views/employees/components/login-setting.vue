<template>
  <div class="app-container">
    <!-- 放置表单 -->
    <el-form
      label-width="60px"
      :model="userInfos"
      ref="userFormss"
      :rules="rules"
    >
      <el-form-item label="姓名:" prop="username">
        <el-input style="width: 300px" v-model.trim="userInfos.username" />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input disabled style="width: 300px" v-model="userInfos.mobile" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          disabled
          style="width: 300px"
          v-model="userInfos.password"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updeName">更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { saveUserDetailById } from '@/api/employees'
export default {
  props: {
    userInfos: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rules: {
        username: [{ min: 2, max: 10, required: true, message: '请输入用户名', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 校验
    updeName () {
      this.$refs.userFormss.validate(async valid => {
        if (!valid) return
        await saveUserDetailById(this.userInfos)
        // 密码是加密的，所以不能直接修改
        this.$message.success('更新成功')
      })
    }
  }
}
</script>