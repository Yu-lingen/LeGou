import { nanoid } from 'nanoid';

//生成一串随机字符串，且每次执行都不能发生变化
export const getNanoID = () => {
    //先从本地存储中获取nanoid,看一下有没有
    let nanoid_token = localStorage.getItem('NANOID');
    
    //如果当前没有nanoid_token
    if (!nanoid_token) {
        //进入判断，生成一个新的nanoid_token,并存储于本地存储中
        nanoid_token = nanoid();
        localStorage.setItem('NANOID',nanoid_token)
    }
    return nanoid_token;
}