import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router/router'
import 'nprogress/nprogress.css'

import DateFilter from './filters/date'
import Vuelidate from 'vuelidate/src'
import {camelCase, upperFirst} from "lodash";

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

const requireComponent = require.context(
    './components',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
