//API统一管理

//引入二次封装后的axios
import requests from './request';

//引入mock请求
import mockRequest from './mockAjax';

//三级联动接口 /api/product/getBaseCategoryList get  无参数
//发送请求,axios发送请求，返回结果是Promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

//获取banner
export const reqGetBanner = () => mockRequest.get('/banner');

//获取floor
export const reqGetFloor = () => mockRequest.get('/floor');

//获取搜索商品
//params 参数只少是个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

//获取详情页数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//将产品加入购物车  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//发送购物车结算  /api/cart/cartList
export const reqCarList = () => requests({ url: `/cart/cartList`, method: 'get' });

//删除购物车  /api/cart/deleteCart/{skuId}   请求方式  DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改购物车选中状态 /api/cart/checkCart/{skuId}/{isChecked} 请求方式 get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码接口 /api/user/passport/sendCode/{phone} 请求方式 get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//用户注册 /api/user/passport/register 请求方式 post
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

//登录 /api/user/passport/login 请求方式 post 
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' });

//获取用户信息 /api/user/passport/auth/getUserInfo 请求方式 get
export const reqGetUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

//用户退出登录 /api/user/passport/logout 请求方式 get
export const reqUserLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息  /api/user/userAddress/auth/findUserAddressList 请求方式 get
export const reqUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取订单交易页信息 /api/order/auth/trade 请求方式 get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

//提交订单     /api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式  post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息  /api/payment/weixin/createNative/{orderId} 请求方式 get
export const reqGetOrderInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}  请求方式 get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表 /api/order/auth/{page}/{limit} 请求方式 get
export const reqGetOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})