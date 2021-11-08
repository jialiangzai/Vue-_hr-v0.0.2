// 快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,
  // 手机号
  mobile: state => state.user.userInfo.mobile,
  name: state => state.user.userInfo.username,
  company: state => state.user.userInfo.company
}
export default getters
