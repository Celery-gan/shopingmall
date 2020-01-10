import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 用户城市
        usercity: '',
        // 分类列表
        category: [],
        amountgoods: '',
        // 浏览历史
        browsing: [],
        // 选择地址
        addresslist: {},
        // 购物车购买
        paylists: {},
        // 直接购买
        payone: {},
        // 购买方式 1:立即购买 2:购物车购买
        buyway: 1,
        // 购物车数据
        goodsinfo: []
    },
    mutations: {},
    actions: {},
    modules: {}
})