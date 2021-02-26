import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	favicon: './public/favicon.ico',
	template: './public/index.html',
});

export const plugins = [htmlWebpackPlugin, new CleanWebpackPlugin()];
