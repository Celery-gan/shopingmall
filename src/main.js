import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"
import dayjs from "dayjs"
import axios from 'axios'
import VCharts from 'v-charts'
import JsonExcel from 'vue-json-excel'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import lodash from 'lodash'

Vue.component('downloadExcel', JsonExcel)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(mavonEditor)


Vue.prototype.$lodash = lodash
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')