import Vue from 'vue'
import './plugins/axios'
import './plugins/vue-cookies'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
