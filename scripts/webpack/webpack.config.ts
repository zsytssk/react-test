import { Configuration } from 'webpack';
import { cssLoader, lessLoader, fileLoader, tsLoader } from './loader';
import { resolve } from './other';
import { plugins } from './plugin';
import { paths } from './paths';
import { devServerConfig } from './devServer';

type Env = 'Test' | 'Dev' | 'Prod';
export const webpackConfigFn = (env: Env) => {
	const mode: Configuration['mode'] = env === 'Prod' ? 'production' : 'development';
	return {
		entry: paths.appIndexJs,
		output: {
			path: paths.appBuild,
			filename: '[name].[hash].js',
		},
		mode,
		module: {
			rules: [{ ...tsLoader }, { ...cssLoader }, { ...lessLoader }, { ...fileLoader }],
		},
		resolve,
		plugins,
		devServer: devServerConfig,
	};
};
