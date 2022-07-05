//search模块的小仓库

import {reqGetSearchInfo} from '@/api';
//准备state对象——保存具体的数据
const state = {
    //searchList看返回数据格式，是一个对象
    searchList: {},
};
//准备actions对象——响应组件中用户的动作
const actions = {
        //发送请求，获取搜索页数据
        async reqGetSearchInfo({ commit },params={}) {
            let result = await reqGetSearchInfo(params);
            //对结果进行判断
            if (result.code === 200) {
                //表示成功 200,则调用commit派发mutations操作
                commit('GETSEARCHINFO', result.data)
            }
        },
};
//准备mutations对象——修改state中的数据
const mutations = {
    GETSEARCHINFO(state,searchList){
        state.searchList = searchList;
    }
};
//类似compute计算属性,为了简化数据而生
const getters = {
    //当断网时，防止没有数据返回,而遍历undifend，然后报错，所以当数据没有返回时,用[]空数组替代
    attrsList: state=> state.searchList.attrsList || [],
    goodsList: state=> state.searchList.goodsList || [],
    trademarkList: state=> state.searchList.trademarkList || [],

};

export default {
    state,
    actions,
    mutations,
    getters,
}