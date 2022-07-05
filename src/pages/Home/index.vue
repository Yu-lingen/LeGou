<template>
  <div>
    <!-- 使用全局组件 -->
    <TypeNav />
    <!-- 局部组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="list in floorList" :key="list.id" :list='list' />
    <Brand />
  </div>
</template>

<script>
//引入局部组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";

export default {
  name: "Home",
  // 注册组件
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    //使用mapState映射数据到楼层组件中的计算属性里
    ...mapState({
      //这是一个简写形式的函数，每次用到这个计算属性时，函数会自动执行一次
      floorList: (state) => state.home.floorList,
    }),
  },
  mounted() {
    this.$store.dispatch("reqGetFloor");
    //派发获取用户信息组件
    this.$store.dispatch("reqGetUserInfo");
  },
};
</script>

<style>
</style>