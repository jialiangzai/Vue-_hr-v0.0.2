import request from '@/utils/request'

/**
 * @description: 登录
 * @param {*} data {modile, password}
 * @return {*}
 */
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * @description: 获取用户头像及员工详情信息
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
