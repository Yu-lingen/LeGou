//home模块的小仓库


//引入发送请求的api模块
import { reqCategoryList, reqGetBanner, reqGetFloor } from '@/api';


//准备state对象——保存具体的数据
const state = {
    //初始化数据，根据请求返回的数据来定义初始化数据的类型
    categoryList: [],
    bannerList: [],
    floorList: []
};


//准备actions对象——响应组件中用户的动作
const actions = {
    //发送请求，获取导航栏数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        //对结果进行判断
        if (result.code === 200) {
            //表示成功 200,则调用commit派发mutations操作
            commit('CATEGORYLIST', result.data)
        }
    },
    //发送请求，获取轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBanner();
        //对结果进行判断
        if (result.code === 200) {
            //表示成功 200,则调用commit派发mutations操作
            commit('GETBANNERLIST', result.data)
        }
    },
    //发送请求，获取楼层数据
    async reqGetFloor({ commit }) {
        let result = await reqGetFloor();
        //对结果进行判断
        if (result.code === 200) {
            //表示成功 200,则调用commit派发mutations操作
            commit('GETFLOOR', result.data)
        }
    },
};


//准备mutations对象——修改state中的数据
const mutations = {
    //操作导航栏数据
    CATEGORYLIST(state, categoryList) {
        categoryList.pop();
        categoryList.pop();
        state.categoryList = categoryList;
    },
    //操作轮播图数据
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    //操作轮播图数据
    GETFLOOR(state, floorList) {
        state.floorList = floorList;
    }
};


//类似compute计算属性
const getters = {};


export default {
    state,
    actions,
    mutations,
    getters,
}