module.exports = {
  outputDir: './build',
  // 跨域配置
  devServer: {
    proxy: {
      '^/api': {
        // http://123.207.32.32:8000/home/multidata
        // target: 'https://nicemusic-api.lxhcool.cn',
        target: 'http://124.220.210.84:3000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 最终合并到webpack中
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
