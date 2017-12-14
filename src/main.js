// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import axios from './http'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import cookie from 'vuecookie'

Vue.use(MuseUI)
Vue.use(cookie)
Vue.prototype.axios = axios
Vue.prototype.api_path = path => {
  return process.env.API_HOME + 'api/' + path
}

Vue.prototype.file_path = path => {
  return process.env.API_HOME + 'uploads/' + path
}

Vue.prototype.message = (msg, type) => {
  store.dispatch('message', { state: true, text: msg, type: type })
}

Vue.prototype.success = (msg = '操作成功') => {
  store.dispatch('message', { state: true, text: msg, type: 'success' })
}

Vue.prototype.failed = (msg = '操作失败', type) => {
  store.dispatch('message', { state: true, text: msg, type: 'failed' })
}

Vue.prototype.messageState = false

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
