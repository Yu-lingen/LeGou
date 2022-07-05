//detail模块的小仓库

//引入发送请求的api模块
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";

//引入生成临时随机id的函数
import {getNanoID} from '@/utils/nanoid_token';

//准备state对象——保存具体的数据
const state = {
    //初始化数据，根据请求返回的数据来定义初始化数据的类型
    goodsInfo: {},
    //临时游客身份
    nanoid_token:getNanoID(),
};


//准备actions对象——响应组件中用户的动作
const actions = {
    //发送请求，获取详情页数据
    async getGoodsInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid);
        //对结果进行判断
        if (result.code === 200) {
            //表示成功 200,则调用commit派发mutations操作
            commit('GETGOODSINFO', result.data)
        }
    },
    //发送请求，添加商品到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code === 200) {
            //表示成功 200,则调用commit派发mutations操作
            //成功，则返回一个非空字符串
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }

    }
};


//准备mutations对象——修改state中的数据
const mutations = {
    //操作详情页数据
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
};


//类似compute计算属性
const getters = {
    categoryView: state => state.goodsInfo.categoryView || {},
    skuInfo: state => state.goodsInfo.skuInfo || {},
    spuSaleAttrList: state => state.goodsInfo.spuSaleAttrList || [],
};


export default {
    state,
    actions,
    mutations,
    getters,
}