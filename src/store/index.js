import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 图标
import routes from './modules/routes'

Vue.use(Vuex)
// 模块化
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    routes
  },
  getters
})

export default store
