import Layout from '@/layout/index.vue'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '', // 默认加载
      name: 'approvals', // name属性跳转，权限的配置name不加/
      component: () => import('@/views/approvals/index'),
      // 配置左侧菜单的信息
      meta: {
        title: '审批', icon: 'tree-table'
      }
    }
  ]
}
