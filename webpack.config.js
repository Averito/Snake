const HtmlWebpackPLugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/main.ts',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'webpack.bundle.js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /.ts$/,
				use: 'ts-loader'
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				use: 'file-loader',
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [new HtmlWebpackPLugin({ template: './public/index.html' })],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 3030
	}
}