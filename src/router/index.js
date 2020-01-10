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
            meta: {
                title: "商城",
                isMeta: true
            },
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
            meta: {
                title: "分类",
                isMeta: true
            },
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
            meta: {
                title: "购物车",
                isMeta: true
            },
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
            meta: {
                title: "会员中心",
                isMeta: true
            },
        }]
    },
    // 详情页
    {
        path: '/detail',
        name: 'detail',
        component: () =>
            import ('../views/details/Deatils'),
        meta: {
            title: "商品详情",
            isMeta: true
        },
    },
    // 城市
    {
        path: '/citys',
        name: 'citys',
        component: () =>
            import ('../views/citys/Citys'),
        meta: {
            title: "城市",
            isMeta: true
        },
    },
    // 订单结算 PayMent
    {
        path: '/payMent',
        name: 'payMent',
        component: () =>
            import ('../views/payMent/PayMent'),
        meta: {
            title: "订单结算",
            isMeta: true
        },
    },
    // 地址列表 address
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/address/Address'),
        meta: {
            title: "地址列表",
            isMeta: true
        },
    },
    // 编辑地址 addressedit
    {
        path: '/addressedit',
        name: 'addressedit',
        component: () =>
            import ('../views/addressedit/Addressedit'),
        meta: {
            title: "编辑地址",
            isMeta: true
        },
    },
    // 我的订单 order
    {
        path: '/order',
        name: 'order',
        component: () =>
            import ('../views/order/Order'),
        meta: {
            title: "我的订单",
            isMeta: true
        },
    },
    // 我的评价 evaluate
    {
        path: '/evaluate',
        name: 'evaluate',
        component: () =>
            import ('../views/evaluate/Evaluate'),
        meta: {
            title: "我的评价",
            isMeta: true
        },
    },
    // 评价 rate
    {
        path: '/rate',
        name: 'rate',
        component: () =>
            import ('../views/rate/Rate'),
        meta: {
            title: "评价",
            isMeta: true
        },
    },
    // 查看评价 Seeeval
    {
        path: '/seeeval',
        name: 'seeeval',
        component: () =>
            import ('../views/Seeeval/Seeeval'),
        meta: {
            title: "查看评价",
            isMeta: true
        },
    },
    // 我的收藏 collect
    {
        path: '/collect',
        name: 'collect',
        component: () =>
            import ('../views/collect/Collect'),
        meta: {
            title: "我的收藏",
            isMeta: true
        },
    },
    // 最近浏览 browes
    {
        path: '/browes',
        name: 'browes',
        component: () =>
            import ('../views/browes/Browes'),
        meta: {
            title: "最近浏览",
            isMeta: true
        },
    },
    // 登录注册 login
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login'),
        meta: {
            title: "登录注册",
            isMeta: true
        },
    },
    // 我的详情 userdetail
    {
        path: '/userdetail',
        name: 'userdetail',
        component: () =>
            import ('../views/userdetail/Userdetail'),
        meta: {
            title: "我的资料",
            isMeta: true
        },
    },

    // 测试 userdetail
    {
        path: '/testwo',
        name: 'testwo',
        component: () =>
            import ('../views/test/Testwo'),
    },

]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
        // let username = localStorage.getItem('username')
        // if (to.path === '/login' || to.path === '/register') {
    next()
        // } else {
        //     username ? next() : next('/login')
        // }
})

export default router