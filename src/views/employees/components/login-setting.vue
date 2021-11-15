<template>
  <div class="app-container">
    <!-- 放置表单 -->
    <el-form
      ref="userFormss"
      label-width="60px"
      :model="userInfos"
      :rules="rules"
    >
      <el-form-item label="姓名:" prop="username">
        <el-input v-model.trim="userInfos.username" style="width: 300px" />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="userInfos.mobile" disabled style="width: 300px" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          v-model="userInfos.password"
          disabled
          style="width: 300px"
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
import { mapActions } from 'vuex'
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
    ...mapActions('user', ['getUserInfoAction']),
    // 校验
    updeName () {
      this.$refs.userFormss.validate(async valid => {
        if (!valid) return
        await saveUserDetailById(this.userInfos)
        if (this.$route.params.id === this.userInfos.id) {
          this.getUserInfoAction()
        }
        // 密码是加密的，所以不能直接修改
        this.$message.success('更新成功')
      })
    }
  }
}
</script>
