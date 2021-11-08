/**
 * 判断是否有token
 * 有token  是否是登录页
 * 无token  判断是否是白名单 是白名单 直接访问 不是白名单就要跳转登录页
 */
import router from './router'
import store from './store'
const whiteList = ['/login', '/404']
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 401
  if (store.getters.token) {
    // 有token 判断是否是登录页
    if (to.path === '/login') {
      next('/')
    } else {
      // 有token不是登录页
      next()
      // 此时用户有token进行获取用户信息
      // 判断如果没有获取用户信息才进行调用
      // name是用户信息内的  可以是别的信息资料
      if (!store.getters.name) {
        // 每次跳转路由就会发送请求  资料同步最新
        await store.dispatch('user/getUserInfoAction')
      }
    }
  } else {
    // 无token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
