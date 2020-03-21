const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: './src/index.js',
	output:{
        path: '/build',
		// filename: '[name].bundle.js',
        filename: '[name].[hash].js',
        // chunkFilename: '[name].bundle.js',
	},
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
	module:{
		rules:[{
				test:/\.(js|jsx)$/,
                include: /src/,
				use: [{
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
				use:[{
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
                use:[{
                        loader: 'url-loader?limit=10000&name=img/[name].[ext]'
                }]
            }
		]
	},
    optimization:{
        // splitChunks: {
        //     chunks: 'all',
        //     // name: false
        // }
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            // minSize: 1024 * 100,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        // 独立css文件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.template.html'
        })
	],
    devServer:{
		port: 9000,
		historyApiFallback: true
	}
}

