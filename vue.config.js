'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title
/**
 * 指令 dev本地地址 prod stage后台的prod 三个环境
 * /api
 * /prod-api
 */
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// 短路 设置开发服务端口 node中的process进程 用webpack注入到js
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
// 把排除的大体积文件=》使用cdn方式引入（上线生产环境生效,开发环境不排除
/**
      * externals 对象属性解析：
      * '包名' : '模块内置对象'
    */
//  准备排除的配置
let externals = {}
// 准备cdn文件
let cdn = {
  css: [],
  js: []
}
const isEnv_prod = process.env.NODE_ENV === 'productions' // 生产环境
if (isEnv_prod) {
  // 排除
  // 1. 减少应用打包出来的包体积
  // 2. 加快静态资源的访问
  // 3. 利用浏览器缓存，不会变动的文件长期缓存

  externals = {
    // 值是cdn实际引入的包的全局变量名=====排除key的包，要用cdn注入全局变量名对应的包
    'vue': 'Vue',
    'element': 'ELEMENT',
    'xlsx': 'XLSX'
  }
  // cdn
  cdn = {
    css: ['https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index.css'],
    js: [
      // vue must at first!
      'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      // element-ui js
      'https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/index.js',
      // xlsx
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js']
  }
}
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://ihrm-java.itheima.net',
        target: 'http://8.142.65.7:3000', // 跨域请求的地址=>告诉代理服务器去哪里请求数据
        changeOrigin: true
      }
    }
    // before: require('./mock/mock-server.js')
  },
  // 打包执行
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    externals,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 打包时候才会执行的插件配置
  chainWebpack (config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
