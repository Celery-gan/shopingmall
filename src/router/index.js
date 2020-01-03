import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common/Common'


Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/',
        component: Common,
        children: [{
            path: '',
            name: 'home',
            component: Home,
        }]
    },
    // 分类
    {
        path: '/category',
        component: Common,
        children: [{
            path: '',
            name: 'category',
            component: () =>
                import ('../views/category/Category'),
        }]
    },
    // 购物车
    {
        path: '/shopingcars',
        component: Common,
        children: [{
            path: '',
            name: 'shopingcars',
            component: () =>
                import ('../views/shopingcars/shopingcars'),
        }]
    },
    // 我的
    {
        path: '/mine',
        component: Common,
        children: [{
            path: '',
            name: 'mine',
            component: () =>
                import ('../views/user/Mine'),
        }]
    },
    // 详情页
    {
        path: '/detail',
        name: 'detail',
        component: () =>
            import ('../views/details/Deatils'),
    },
    // 城市
    {
        path: '/citys',
        name: 'citys',
        component: () =>
            import ('../views/citys/Citys'),
    },
    // 订单结算 PayMent
    {
        path: '/payMent',
        name: 'payMent',
        component: () =>
            import ('../views/payMent/PayMent'),
    },
    // 地址列表 address
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/address/Address'),
    },
    // 编辑地址 addressedit
    {
        path: '/addressedit',
        name: 'addressedit',
        component: () =>
            import ('../views/addressedit/Addressedit'),
    },
    // 我的订单 order
    {
        path: '/order',
        name: 'order',
        component: () =>
            import ('../views/order/Order'),
    },
    // 我的评价 evaluate
    {
        path: '/evaluate',
        name: 'evaluate',
        component: () =>
            import ('../views/evaluate/Evaluate'),
    },
    // 评论 rate
    {
        path: '/rate',
        name: 'rate',
        component: () =>
            import ('../views/rate/Rate'),
    },
    // 我的收藏 collect
    {
        path: '/collect',
        name: 'collect',
        component: () =>
            import ('../views/collect/Collect'),
    },
    // 最近浏览 browes
    {
        path: '/browes',
        name: 'browes',
        component: () =>
            import ('../views/browes/Browes'),
    },
    // 登录注册 login
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login'),
    },
    // 我的详情 userdetail
    {
        path: '/userdetail',
        name: 'userdetail',
        component: () =>
            import ('../views/userdetail/Userdetail'),
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title
//         // let username = localStorage.getItem('username')
//         // if (to.path === '/login' || to.path === '/register') {
//         //     next()
//         // } else {
//         //     username ? next() : next('/login')
//         // }
// })

export default router