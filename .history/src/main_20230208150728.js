import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import '@mdi/font/css/materialdesignicons.css'



Vue.use(Vuelidate)
  Vue.use(VueDirectiveMask);
Vue.config.productionTip = false

window.csrfToken = document.querySelector('meta[name="csrf-token"]').content;


new Vue({
  router,
  store,
  vuetify,
  // axios,
  render: h => h(App)
}).$mount('#app')
