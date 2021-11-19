import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 引入多个动态路由模块
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes 静态路由 (不需要权限，所有人都可以访问)
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// asyncRoutes 动态路由 (需要权限)
export const asyncRoutes = [
  // 组织架构 （公司的人员架构）
  departmentsRouter,
  // 公司设置 （角色管理）
  settingRouter,
  // 成员管理 （给员工分配角色）
  employeesRouter,
  // 权限 （配置各种权限点）
  permissionRouter,
  // 审批
  approvalsRouter,
  // 考勤
  attendancesRouter,
  // 工资
  salarysRouter,
  // 社保
  socialRouter
]
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true, // 不显示到左侧 不参与遍历
    children: [{
      path: '',
      component: () => import('@/views/import')
    }]
  }
  // 404 page must be placed at the end !!!
  // 重定向 动态权限路由

]
// 工厂函数 创建路由实例
const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 切换路由滚动条回到顶部
  scrollBehavior: () => ({ y: 0 }),
  // 合并静态路由和动态路由 根据权限去过滤规则
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由 根据权限动态添加路由规则
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 导出路由实例
export default router
