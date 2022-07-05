module.exports = {
    productionSourceMap: false,
    lintOnSave:false, //关闭语法检测
    //开启代理服务器，第二种配置方式
    devServer: {
        proxy: {
          '/api':{
            target: 'http://gmall-h5-api.atguigu.cn'
          }
        },
      }
}