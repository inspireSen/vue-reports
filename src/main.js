import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios'
import Toasted from 'vue-toasted'

require('@/assets/main.scss');

Vue.config.productionTip = false

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://127.0.0.1:5000/api/'
    })
  }
})

Vue.use(Toasted, {
  duration: 3000,
  keepOnHover: true,
  theme: 'bubble'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
