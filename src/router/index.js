//配置路由的地方
//引入Vue、vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter);

//引入路由配置
import routes from './routers';

//获取store中的token
import store from '@/store';

//解决问题出现这个问题，控制台会报[NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]。
//其原因在于Vue-router在3.1之后把$router.push()方法改为了Promise。
//所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.repalce = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
//配置路由
let router = new VueRouter({
  //配置路由规则
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
});

//配置路由守卫
//全局路由守卫,全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  //to==>获取到你要跳转到哪个路由的信息
  //from==>从哪个路由来的信息
  //next：放行函数 next()==>放行，next(path)放行到指定路由

  //拿到token判断，给不同的路由放行
  next();
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //用户登录
  if (token) {
    //如果已经登录了，并且还要去登录页面，不放行
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      //已经登录，并且访问非登录页面
      if (name) {
        //有用户名，放行
        next();
      } else {
        //登录了，但是没有用户名，目前获取用户名只有在home组件下派发了dispatch，才能获取用户信息
        //所以要在这种情况下重新派发dispatch
        try {
          await store.dispatch('reqGetUserInfo');
          //获取信息成功之后，再放行
          next();
        } catch (error) {
          //token失效的时候,重新登录，再重新登录之前要把token和userInfo清空
          store.dispatch('reqUserLogout');
          next('/login');
        }
      }

    }
  } else {
    //用户未登录,不能去交易相关页面，不能去支付相关页面，不能去个人中心
    let toPath = to.path;
    if (toPath.includes('/trade') || toPath.includes('/center') || toPath.includes('/pay')) {
      //把用户未登录前，想去的路由保存到query参数中，配合登录组件，进行判断
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }

  }
})

export default router;