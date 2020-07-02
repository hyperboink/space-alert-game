module.exports = {
	entry: ['./app/app.js'],
	output: {
		filename: 'bundle.js'
	},
	module:{
		rules:[
			{
				loader:'babel-loader',
				test:/\.js$/,
				exclude:/node_modules/
			}
		]
	},
	devServer:{
		port:8003
	}
};