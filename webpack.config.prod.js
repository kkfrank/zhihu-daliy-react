const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports={
    mode: 'production',
    devtool: false,
    entry: './src/index.js',
    output:{
        path: path.join(__dirname, 'build'),
        // publicPath: path.join(__dirname, 'build/'),
        // publicPath: '/assets/',
        filename: 'js/[name].[hash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            include: /src/,
            use:[{
                loader:'babel-loader'
            }]
        }, {
            test: /\.html$/,
            use: [{
                    loader: "html-loader"
                }]
        }, {
            test: /\.(sa|sc|c)ss$/,
            include: /src/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },{
                loader:'css-loader'
            },{
                loader:'postcss-loader'
            },{
                loader: "sass-loader"
            }]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                    loader: 'url-loader?limit=10000&name=img/[name].[ext]'
                }]
        }]
    },
    optimization:{
        splitChunks: {
            chunks: 'all',
        }
        // runtimeChunk: 'single',
        // splitChunks: {
        //     chunks: 'all',
        //     maxInitialRequests: Infinity,
        //     // minSize: 1024 * 100,
        //     cacheGroups: {
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name(module) {
        //                 // get the name. E.g. node_modules/packageName/not/this/part.js
        //                 // or node_modules/packageName
        //                 const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //                 // npm package names are URL-safe, but some servers don't like @ symbols
        //                 return `npm.${packageName.replace('@', '')}`;
        //             },
        //         },
        //     },
        // },
    },
    plugins: [
        // 删除build文件夹
        new CleanWebpackPlugin(),
        // 独立css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.template.html'
        })
    ]
}

