import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const projectPath = path.resolve(__dirname, '../../');
export const configFn = (env?, argv?) => {
	return {
		entry: './src/main.tsx',
		output: {
			path: path.resolve(projectPath, 'dist'),
			filename: '[name].[hash].js',
		},
		mode: 'development' as Configuration['mode'],
		module: {
			rules: [
				{
					test: /(\.ts|\.tsx|\.jsx|\.js)$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
				{
					test: /(\.css|\.less)$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								modules: true,
							},
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.(png|jpg|svg|gif)$/,
					exclude: /node_modules/,
					use: ['file-loader'],
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
		plugins: [
			new HtmlWebpackPlugin({
				favicon: './src/template/favicon.ico',
				template: './src/template/index.html',
			}),
			new CleanWebpackPlugin(),
		],
	};
};
