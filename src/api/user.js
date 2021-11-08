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

// export function getInfo (token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout () {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
/**
 * @description: 获取用户头像
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
