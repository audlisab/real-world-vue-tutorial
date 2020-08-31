import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router/router'
import 'nprogress/nprogress.css'

import BaseIcon from './components/BaseIcon.vue'
import BaseInput from './components/BaseInput'
import BaseSelect from './components/BaseSelect'
import BaseButton from './components/BaseButton'
import DateFilter from './filters/date'
import Vuelidate from 'vuelidate/src'

Vue.config.productionTip = false

Vue.component('BaseIcon', BaseIcon)
Vue.component('BaseInput', BaseInput)
Vue.component('BaseSelect', BaseSelect)
Vue.component("BaseButton", BaseButton)

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
