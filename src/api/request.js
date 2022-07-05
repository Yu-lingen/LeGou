//对于axios的二次封装
import axios from 'axios';

import store from '@/store';

//引入进度条
import nprogress from 'nprogress';
//引入进度条css样式
import "nprogress/nprogress.css";

//1.利用axios对象的方法create,去创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径,发送请求时，路径中会出现api
    baseURL: "/api",
    //代表请求超时的时间5s
    timeout: 5000,
})

//请求拦截器：在发送请求之前，请求拦截器可以检测到，在请求发送之前做一些事情
requests.interceptors.request.use((config)=>{
    //config配置对象，对象中有一个很重要的header
    //在请求发送之前，在header中带上一个nanoid临时id
    if(store.state.detail.nanoid_token){
        config.headers.userTempId = store.state.detail.nanoid_token;
    }
    //携带token
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    // 在发送请求之前做些什么
    //进度条开始动
    nprogress.start();
    return config;
});

// 添加响应拦截器
requests.interceptors.response.use((response)=>{
    //成功的回调，服务器响应数据返回成功后，响应器可以检测到，可以做一些事情
    // 对响应数据做点什么
    //进度条结束
    nprogress.done();
    return response.data;
    
}, (error)=>{
    // 对响应错误做点什么
    return Promise.reject(error);
});


//对外暴露
export default requests;
