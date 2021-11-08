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
