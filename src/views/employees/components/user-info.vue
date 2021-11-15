<template>
  <div class="app-container">
    <!-- 个人信息 -->
    <el-form
      ref="userFormss"
      label-width="100px"
      :model="userInfos"
      :rules="rules"
    >
      <!-- 部门departmentName  timeOfEntry -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="部门" prop="departmentName">
            <el-input v-model.trim="userInfos.departmentName" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="userInfos.timeOfEntry"
              type="date"
              class="inputW"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <UploadImg :staff-photo.sync="userInfos.staffPhoto" />
            <!-- <el-image :src="require('@/assets/common/head.jpg')"></el-image> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="updateInfo">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
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
        departmentName: [{ required: true, message: '请输入', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '请输入', trigger: 'change' }]
      }
    }
  },
  methods: {
    updateInfo () {
      this.$refs.userFormss.validate(async valid => {
        if (!valid) return
        await saveUserDetailById(this.userInfos)
        this.$message.success('更新成功')
      })
    }
  }
}
</script>
