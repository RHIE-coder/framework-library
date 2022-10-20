import Vue from 'vue'
import Application from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Application),
}).$mount('#app')
