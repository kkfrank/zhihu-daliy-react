const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    devtool: 'cheap-eval-source-map',
    entry: './src/index.js',
	output:{
		path:__dirname + '/build/',
		// publicPath:'',
		filename:'js/bundle.js'
	},
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
	module:{
		rules:[
			{
				//test:/\*.js$/,
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				use:[{
					loader:'babel-loader'
				}]
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:[{
					loader:'style-loader'
				},{
					loader:'css-loader'
				}]
			},
            {
                test: /\.scss$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "style-loader" // 将 JS 字符串生成为 style 节点
                        },{
                            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: "sass-loader",// 将 Sass 编译成 CSS
                            options: {
                                sourceMap: true
                            }
                        }]
                })
            }
		]
	},
    plugins: [
        // 独立css文件
        new ExtractTextPlugin({
            filename: 'css/main.css',
            disable: true
        }),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/main.js'
        }),
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.template.html'
        })
	],
    devServer:{
		port:9000,
		historyApiFallback:true,
		// headers:{
		// 	'Access-Control-Allow-Origin':'*'
		// }
	}
}

