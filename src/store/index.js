import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        category: [],
        amountgoods: '',
        tobeEvaluats: '',
        // 浏览历史
        browsing: [],
        // 选择地址
        addresslist: {},
        // 购物车购买
        paylists: {},
        payone: {},
        buyway: 1,
    },
    mutations: {},
    actions: {},
    modules: {}
})