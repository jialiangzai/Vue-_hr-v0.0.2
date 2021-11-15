<template>
  <!-- 简单自定义上云所以不用action 当改了之后就不会触发success事件 -->
  <!-- 使用自定义行为覆盖默认上传，注意一旦设置自定义上传行为之后，所有的上传操作都需要自己实现
比如数据处理，上传成功之后的后续操作，on-success钩子函数也不会继续触发 -->
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="upload"
  >
    <img v-if="staffPhoto" :src="staffPhoto" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <!-- 上传进度 -->
    <el-progress
      v-if="showProcess"
      type="line"
      :percentage="percentage"
      :stroke-width="6"
    ></el-progress>
  </el-upload>
</template>

<script>
// 导入cos的SDK调用
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID2JMPE1qvDJCmTvdDTqxFgssaAVbRkxoR', // 身份识别ID
  SecretKey: 'Xw62h4GDwa4JIzUGqKgZyCAzwf9N5f06' // 身份秘钥
})
export default {
  name: 'UploadImg',
  props: {
    staffPhoto: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // imageUrl: '',
      // 进度条 0-100
      percentage: 0,
      showProcess: false
    }
  },
  methods: {
    upload (params) {
      this.showProcess = true
      console.log('要上传的文件', params)
      // 腾讯云SDK上传...
      // 后续调用腾讯云cos后台接口上传图片
      /**
       * cos.putObject(Object:{上传配置}, callback:Function(成功回调函数))
       */
      cos.putObject({
        Bucket: 'hrsass-1255477649', /* 必须 */
        Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
        Key: params.file.name, /* 必须(上传文件文件名) */
        StorageClass: 'STANDARD', // 标准模式存储
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          // 上传进度（0-1）=》progressData.percent的值 =》0.0 => 0.1 ... => 0.9 1
          console.log('当前图片的上传进度：', progressData.percent)
          this.percentage = progressData.percent * 100
        }
        // 这里有个坑尽量使箭头函数不然还要在methods进行转this
      }, (err, data) => {
        // err 是null 表明上传成功 data 会包含Location图片存储地址
        // console.log(err, data)
        if (!err) {
          // 上传成功
          // 显示上传成功后的图片
          // this.imageUrl = `https://${data.Location}`
          setTimeout(() => {
            this.$emit('update:staffPhoto', `https://${data.Location}`)
            this.showProcess = false
          }, 800)
        }
      }
      )
    },
    // 上传之前的回调函数校验文件大小及格式
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
