module.exports = {
  outputDir: './build',
// 跨域配置
devServer: {
  proxy: {
    '^/api': {
      // http://123.207.32.32:8000/home/multidata
      // target: 'https://nicemusic-api.lxhcool.cn',
      target: 'http://www.codeman.ink:3000',
      pathRewrite: {
        '^/api': ''
      },
      changeOrigin: true
    }
  }
},
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  },

}

