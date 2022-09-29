const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
  // https:true,
    port: 8889,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  chainWebpack: (config) => {
    // 新增bpm类型图片配置
      const urlRule = config.module.rule('url-loader')
      urlRule.uses.clear()
      urlRule
        .rule('url-loader')
        .test(/\.(bmp)$/)
        .use('url-loader')
        .loader('url-loader')
        .end()
  }     
})
