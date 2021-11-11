import request from '@/utils/request'

/**
 * @description: 获取下拉选择部门负责人数据
 * @param {*}
 * @return {*}
 */
export function getEmployeeSimple () {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * @description: 获取员工列表
 * @param {*} params {page:当前页,size：每页条数}
 * @return {*}
 */
export function getEmployeeList (params) {
  return request({
    method: 'get',
    url: '/sys/user',
    params
  })
}

