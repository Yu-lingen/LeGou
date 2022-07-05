import Vue from 'vue'
import App from './App.vue'


//引入Vuex的store
import store from '@/store';
//引入全局组件TypeNav
import TypeNav from '@/components/TypeNav';
//引入全局轮播图组件
import Carousel from '@/components/Carousel';
//引入全局分页器组件
import Pagination from '@/components/Pagination';
//引入路由文件
import router from '@/router';
//引入element-ui,按需引入
import { Button,MessageBox } from 'element-ui';


//如果不使用vuex，可以这样引入请求接口，挂载到$API上供全部组件使用
import * as API from '@/api';

//引入mockServe模块数据
import '@/mock/mockServe'

//引入swiper样式，在main.js中引入可以方便以后在任何组件中直接使用,引入样式不需要improt a from b
import 'swiper/css/swiper.css';

//注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name,Button);

//引入elementui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


Vue.config.productionTip = false

//图片懒加载
import VueLazyload  from 'vue-lazyload';
import bgif from '@/assets/b.gif';

//引入表单验证插件
import '@/plugins/validate';

Vue.use(VueLazyload ,{
  //默认显示图片
  loading: bgif,
})


new Vue({
  render: h => h(App),
  //注册路由，写法kv一致,es6新语法可省略v,router小写
  router,
  store,
  beforeCreate() {
    Vue.prototype.$API = API;
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
}).$mount('#app')
