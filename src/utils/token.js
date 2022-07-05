//设置token
export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token);
}

//读取token
export const getToken = ()=>{
    return localStorage.getItem("TOKEN");
}

//清楚token
export const removeToken = ()=>{
    return localStorage.removeItem("TOKEN");
}