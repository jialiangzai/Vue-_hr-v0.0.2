import Layout from '@/layout/index.vue'
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'departments', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/departments/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '组织架构', icon: 'tree'
      }
    }
  ]
}
