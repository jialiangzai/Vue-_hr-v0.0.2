import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // 动态请求基础地址 无缝切换不同环境的请求地址
  // process.env环境变量返回的是一个对象 VUE_APP_BASE_API是键
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
// 请求之前执行的请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 请求后执行响应拦截器 页面未拿到数据
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  // 因为参数传错仍然是200判断处理
  response => {
    const { success, message, data, code } = response.data
    // 给页面返回数据
    // return res
    if (success || code === 1000) {
      // 返回token
      return data
    } else {
      // 请求失败200但是输入正确
      Message({
        message: message,
        type: 'error'
      })
      // 对外抛出错误页面捕获 这里没error所以要new一个
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // console.dir(error)
    // 捕获401 删除之前的存储的数据======错误提示=====跳转登录页(被动跳转携带401页面地址便于登录后跳转到401正常访问)
    if (error.response && error.response.status === 401) {
      // 避免多次token失效跳转到login
      if (router.currentRoute.path === '/login') {
        return
      }
      store.dispatch('user/logoutAction')
      // 错误提示
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      router.replace(`/login?redirect=${router.currentRoute.path}`)
    }
    return Promise.reject(error)
  }
)

export default service
