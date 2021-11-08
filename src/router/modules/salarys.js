import Layout from '@/layout/index.vue'
export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'salarys', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/salarys/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '工资', icon: 'money'
      }
    }
  ]
}
