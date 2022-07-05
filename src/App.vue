<template>
  <div>
    <!-- 头部 -->
    <Header />
    <!-- 路由组件出口的地方，即显示路由组件的内容 -->
    <router-view></router-view>
    <!-- 尾部 -->
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
//引入组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  //注册组件
  components: {
    Header,
    Footer,
  },
  mounted() {
    //当组件挂载成功时，通知Vuex派发dispatch发送请求以获取数据
    //考虑到性能优化，因为只需要发送一次请求即可，所以可以把发送请求的代码拿去app.vue中，来实现只发送一次请求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
