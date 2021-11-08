import request from '@/utils/request'
export function getDepartments () {
  return request({
    url: '/company/department'
  })
}
/**
 * @description: 删除部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export function delDepartments (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 * @description: 新增子部分
 * @param {*}
        data {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '', // 部门介绍
            pid: '' // 新增子部门给谁 (直接获取不到)=》父节点	父级部门ID
        }
 * @return {*}
 */
export function addDepartments (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
