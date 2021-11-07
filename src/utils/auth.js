import Cookies from 'js-cookie'
// cookie存储
const TokenKey = 'hrtoken_137'
// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 存储
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 清除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
