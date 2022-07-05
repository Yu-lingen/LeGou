//search模块的小仓库

import { reqCarList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';
//准备state对象——保存具体的数据
const state = {
    cartList: []
};
//准备actions对象——响应组件中用户的动作
const actions = {
    async reqCarList({ commit }) {
        let result = await reqCarList();
        if (result.code === 200) {
            commit('CARTLIST', result.data)
        }
    },
    async reqDeleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async reqUpdateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise(new Error('faile'));
        }
    },
    //删除勾选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context上下文，commit==>提交mutations修改state,getters==>计算属性，dispatch==>派发actions
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('reqDeleteCartById', element.skuId) : "";
            //上面的语句每次都返回一个promise对象,然后把promise对象push进promiseAll这个数组中用于最后调用promise.all()方法，判断promiseAll中的每一个promise是否都成功
            promiseAll.push(promise);
        });
        //只有全部的promise成功，才返回成功，否则返回失败
        return Promise.all(promiseAll);
    },
    //点击下面全选按钮时候，派发dispatch
    updateAllCartChecked({ state, dispatch }, isChecked) {
        if (state.cartList[0]) {
            //创建一个数组
            let promiseAll = [];
            //遍历购物车数组
            state.cartList[0].cartInfoList.forEach(element => {
                let promise = dispatch('reqUpdateCheckedById', { skuId: element.skuId, isChecked });
                promiseAll.push(promise);
            })

            return Promise.all(promiseAll);
        }
    }
};
//准备mutations对象——修改state中的数据
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//类似compute计算属性,为了简化数据而生
const getters = {
    cartList() {
        return state.cartList[0] || {};
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}