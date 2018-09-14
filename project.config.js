const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    moduleName : 'alpha',
    env        : NODE_ENV,
    basePath   : __dirname,
    srcDir     : 'src',
    outDir     : 'dist',
    publicPath : NODE_ENV == 'development' ? './' : '/resources/web/dist/',
    sourceMap  : NODE_ENV == 'development' ? true : false,
    externals  : {},
    vendor     : ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'antd']
}
