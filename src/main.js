import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import service from "./http"
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';

import Top from './components/Top'
Vue.component('mytop', Top)

Vue.use(Vant);

Vue.prototype.$axios = service
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')