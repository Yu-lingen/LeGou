import { reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqUserLogout } from '@/api';
//引入获取和设置token模块
import {setToken,getToken,removeToken} from '@/utils/token';

const state = {
    //验证码
    code: '',
    token: getToken(),
    userInfo: {}
};
const actions = {
    //获取验证码
    async reqGetCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            //派发commit，修改state
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async reqUserRegister({commit},userObj){
        let result = await reqUserRegister(userObj);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录
    async reqUserLogin({commit},userObj){
        let result = await reqUserLogin(userObj);
        if(result.code ==200){
            commit('REQUSERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token);
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async reqGetUserInfo({commit}){
        let result = await reqGetUserInfo();
        if(result.code ==200){
            //派发commit
            commit("REQGETUSERINFO",result.data);
        }
    },
    //用户退出登录
    async reqUserLogout({commit}){
        let result = await reqUserLogout();
        if(result.code==200){
            commit("CLEARUSER")
        }else{
            return Promise.reject(new Error('退出失败!'));
        }
    }
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    REQUSERLOGIN(state,data){
        state.token = data;
    },
    REQGETUSERINFO(state,data){
        state.userInfo = data;
    },
    CLEARUSER(state){
        state.token = removeToken();
        state.userInfo = {};
    }
};
const getters = {

};
export default {
    state,
    actions,
    mutations,
    getters
}