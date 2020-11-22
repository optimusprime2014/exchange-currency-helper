import Vue from 'vue'
import App from './App'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BootstrapVue} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')