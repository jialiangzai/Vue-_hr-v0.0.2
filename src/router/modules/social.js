import Layout from '@/layout/index.vue'
export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'social', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/social/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '社保', icon: 'table'
      }
    }
  ]
}
