import store from '@/store'
export default {
  // 定义一个方法匹配用户信息中point和权限列表的key是否能匹配===》或者操作权限是否存在用户的point中\
  methods: {
    /**
     *
     * @param {*} key 权限按钮操作标识
     * 返回布尔值
     */
    checkPermission (key) {
      const { userInfo } = store.state.user
      // console.log(roles)
      // 此处有bug因为没有进行无权限处理所以当用户退出后vuex会更新数据刷新页面点击后导致登出报错单不会影响功能使用用es2020语法 ?
      // 记得刷新页面
      return userInfo.roles?.points.includes(key)
      /**
       * 方案二：
       * if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
       */
    }
  }
}
