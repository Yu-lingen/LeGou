import { reqUserAddress, reqOrderInfo } from '@/api';

const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    //获取用户地址信息
    async reqUserAddress({ commit }) {
        let result = await reqUserAddress();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
        }

    },
    //获取用户订单信息
    async reqOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('ORDERINFO', result.data)
        }
    }
}

const mutations = {
    GETUSERADDRESS(state, data) {
        state.address = data;
    },
    ORDERINFO(state, data) {
        state.orderInfo = data;
    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters
}