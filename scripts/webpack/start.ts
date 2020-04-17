import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { configFn } from './webpack.config';
import { devServerConfig } from './devserver';

const compiler = webpack(configFn());
const devServerOptions = {
	...devServerConfig,
	...{
		open: true,
		stats: {
			colors: true,
		},
	},
};

const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(8080, '127.0.0.1', () => {
	console.log('Starting server on http://localhost:8080');
});
