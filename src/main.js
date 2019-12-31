import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// top 封装
import Top from './components/Top'
Vue.component('mytop', Top)

// 所有接口的api封装
import api from './http/api'
Vue.prototype.$api = api

// better-scroll(页面平滑滚动)
// import BScroll from 'better-scroll'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')