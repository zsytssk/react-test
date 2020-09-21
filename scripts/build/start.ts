import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { webpackConfigFn } from '../webpack/webpack.config';
import { devServerConfig } from '../webpack/devServer';

async function main() {
	const compiler = webpack(webpackConfigFn('Test'));
	const devServerOptions = {
		open: true,
		stats: {
			colors: true,
		},
		...devServerConfig,
	};

	const server = new WebpackDevServer(compiler, devServerOptions);
	server.listen(4000, '127.0.0.1');
}
main();
