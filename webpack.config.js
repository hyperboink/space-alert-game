module.exports = {
	entry: ['./app/app.js'],
	output: {
		filename: 'app.js'
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
		writeToDisk: true,
		hot: false,
		inline: false,
		port: 3000
	}
};