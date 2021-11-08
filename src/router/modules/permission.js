import Layout from '@/layout/index.vue'
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'permission', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/permission/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '权限管理', icon: 'lock'
      }
    }
  ]
}
