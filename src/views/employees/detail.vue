<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 登录账户设置 -->
            <LoginSetting :userInfos="userInfos" />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 个人详情 -->
            <userInfo :userInfos="userInfos" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import LoginSetting from './components/login-setting.vue'
import userInfo from './components/user-info.vue'
import { getUserDetailById } from '@/api/user'
export default {
  name: 'detail',
  components: {
    LoginSetting,
    userInfo
  },
  data () {
    return {
      userInfos: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const data = await getUserDetailById(this.$route.params.id)
      console.log(data)
      this.userInfos = data
    }
  }
}
</script>