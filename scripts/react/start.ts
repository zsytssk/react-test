import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackConfigFn from '../webpack/webpack.config';

const compiler = webpack(WebpackConfigFn());

compiler.watch({}, (err, stats) => {
	console.log(stats);
});
