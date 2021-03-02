process.env.NODE_ENV = 'production';
var webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    OptimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        }),
        new TerserPlugin({
            parallel: 4
        }),
        new OptimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                  mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
                  compress: {
                    drop_console: true, // 传true就是干掉所有的console.*这些函数的调用.
                    drop_debugger: true, // 干掉那些debugger;
                    pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
                  }
                }
            }),
            new OptimizeCss({})
        ]
    }
});