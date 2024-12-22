const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    transpileDependencies: true,
    devServer: {
        port: 3721,
        proxy: {
            '/api': {
                target: 'https://spark-api-open.xf-yun.com',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                secure: false
            }
        }
    }
})