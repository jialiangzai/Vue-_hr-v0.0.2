import Layout from '@/layout/index.vue'
export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'settings', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/setting/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '公司设置', icon: 'setting'
      }
    }
  ]
}
