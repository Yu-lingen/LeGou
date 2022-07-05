export default [
    {
        path: '/Center',
        name: 'center',
        component: ()=> import('@/pages/Center'),
        redirect: '/center/myorder',
        //二级路由组件
        children:[
            {
                path: 'myOrder',
                name: 'myorder',
                component: ()=> import('@/pages/Center/myOrder'),
            },
            {
                path: 'groupOrder',
                name: 'grouporder',
                component: ()=> import('@/pages/Center/groupOrder'),
            },
        ],
        meta: {
            showFooter: true
        },
    },
    {
        path: '/PaySuccess',
        name: 'paysuccess',
        component: ()=> import('@/pages/PaySuccess'),
        //独享路由守卫
        //如果想要进入支付成功页面，必须从购物车页才能进入，否则停留在原页
        beforeEnter: (to, from, next) => {
            if(from.path== '/pay'){
                //如果是从pay也过来的，则放行
                next()
            }else{
                //停留在原页
                next(false)
            }
        },
        meta: {
            showFooter: true
        },
    },
    {
        path: '/Pay',
        name: 'pay',
        component: ()=> import('@/pages/Pay'),
        //独享路由守卫
        //如果想要进入支付页面，必须从购物车页才能进入，否则停留在原页
        beforeEnter: (to, from, next) => {
            if(from.path== '/trade'){
                //如果是从trade也过来的，则放行
                next()
            }else{
                //停留在原页
                next(false)
            }
        },
        meta: {
            showFooter: true
        },
    },
    {
        path: '/Trade',
        name: 'trade',
        component: ()=> import('@/pages/Trade'),
        //独享路由守卫
        //如果想要进入交易页面，必须从购物车页才能进入，否则停留在原页
        beforeEnter: (to, from, next) => {
            if(from.path== '/shopcart'){
                //如果是从shopcart也过来的，则放行
                next()
            }else{
                //停留在原页
                next(false)
            }
        },
        meta: {
            showFooter: true
        },
    },
    {
        path: '/ShopCart',
        name: 'shopcart',
        component: ()=> import('@/pages/ShopCart'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/Register',
        name: 'register',
        component: ()=> import('@/pages/Register'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=> import('@/pages/AddCartSuccess'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/detail/:skuId?',
        name: 'detail',
        component: ()=> import('@/pages/Detail'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/home',
        component: ()=> import('@/pages/Home'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/search/:keyWords?',
        name: 'search',
        component: ()=> import('@/pages/Search'),
        meta: {
            showFooter: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('@/pages/Login'),
        meta: {
            showFooter: false
        },
    },
    //重定向，在项目跑起来的时候，在访问/，立马让它定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]