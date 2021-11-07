import * as auth from '@/utils/auth'
import { login } from '@/api/user'

export default {
  namespaced: true,
  state: {
    // 定义变量(响应式) 存储的token直接是字符串
    token: auth.getToken() || null
  },
  mutations: {
    // 修改变量(同步)
    /**
     *
     * @param {*} state 获取变量
     * @param {*} token 调用此方法传入的参数
     */
    setToken (state, token) {
      state.token = token
      auth.setToken(token)
    },
    delToken (state) {
      state.token = null
      auth.removeToken()
    }

  },
  actions: {
    // 定义后台请求的方法和逻辑业务 (异步)
    // 登录请求
    /**
     *
     * @param {*} param0 上下文 结构commit
     * @param {*} payload 调用是传递的数据是表单的手机号和密码
     */
    async getTokenAction ({ commit }, formData) {
      const token = await login(formData)
      console.log(`actions中的token:${token}`)
      // console.log(token)
      // // 调用login存储到vuex中
      // console.log('调用的结果vuex实例：', this.$store)
      commit('setToken', token)
    }
  }
}
