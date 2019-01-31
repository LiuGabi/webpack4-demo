// Webpack version 4.0.0 及以上
const webpack = require('webpack');
const path  = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, arg) => {

	const devMode = arg.mode === 'development';

	// 设置统一插件
	const plugins = [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(arg.mode)
		}),
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[hash].css",
			chunkFilename: "static/css/[id][hash].css"
		}),
		new HtmlWebpackPlugin({
			favicon: './favicon.ico',
			template: './index.html',
			inject: 'body',
		})
	];

	const config = {
		performance: {
			maxEntrypointSize: 2097152,
			maxAssetSize: 1048576
		},
		mode: arg.mode,
		context: path.resolve(__dirname, './src'),
		entry: {
			app: './app.js', // 程序启动入口
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: 'static/js/[name].[hash].js', // 设置文件夹 和 文件的文字
		},
		module: {
			rules: [{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'file-loader',
				options:{
					name: 'static/image/[name].[hash].[ext]'
				}
			}, {
				test: /\.(le|c)ss$/,
				use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
			}, {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader']
			}, {
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: !devMode
					}
				}
			}],
		},
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					sourceMap: devMode,
				}),
				new OptimizeCSSAssetsPlugin({})
			],
		},
		plugins: plugins,
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': path.join(__dirname, '', 'src')
			}
		}
	};

	if (devMode) {
		config.devtool = "eval";
		config.devServer = {
			contentBase:'./dist',
			historyApiFallback: true,
			disableHostCheck: true,
			stats: {
				chunks: true
			},
			port: 3600,
			proxy: [{
				context: ['/auth'],
				target: 'http://10.100.15.100:8080',
				// target: 'http://10.100.15.100:8081',//测试
				secure: false
			}]
		};
	}

	return config;
};