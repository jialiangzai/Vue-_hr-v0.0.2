// 菜单图标
import { constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 菜单栏图标
    menuList: []
  },
  mutations: {
    setmenuList (state, asyncRoute) {
      // 将动态路由和静态路由组合起来
      state.menuList = [...constantRoutes, ...asyncRoute]
    }
  }
}
