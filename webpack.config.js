module.exports={
	entry:'./src/index.js',
	output:{
		path:__dirname+'/build/',
		//publicPath:'',
		filename:'bundle.js'
	},
	module:{
		rules:[
			{
				//test:/\*.js$/,
				test:/\.js$/,
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
			}
		]
	},
	devtool:'cheap-eval-source-map',
	devServer:{
		port:9000,
		historyApiFallback:true,
		// headers:{
		// 	'Access-Control-Allow-Origin':'*'
		// }
	}
}

