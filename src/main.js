import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueNotifications from 'vue-notification'
import VeeValidate from './plugins/vee-validate'
import http from './plugins/axios'
import Configuration from './configuration'
import './assets/scss/style.scss'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

Vue.use(Configuration)
Vue.use(VueNotifications)
Vue.prototype.$http = http
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
