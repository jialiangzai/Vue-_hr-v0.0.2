import Layout from '@/layout/index.vue'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'employees', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/employees/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '员工管理', icon: 'people'
      }
    }
  ]
}
