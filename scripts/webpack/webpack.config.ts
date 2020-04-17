import path from 'path';
import { Configuration } from 'webpack';
import { cssLoader, fileLoader, tsLoader } from './loader';
import { resolve } from './other';
import { plugins } from './plugin';

const projectPath = path.resolve(__dirname, '../../');

type Env = 'Test' | 'Dev' | 'Prod';
export const webpackConfigFn = (env: Env) => {
	const mode: Configuration['mode'] = env === 'Prod' ? 'production' : 'development';
	return {
		entry: './src/main.tsx',
		output: {
			path: path.resolve(projectPath, 'dist'),
			filename: '[name].[hash].js',
		},
		mode,
		module: {
			rules: [{ ...tsLoader }, { ...cssLoader }, { ...fileLoader }],
		},
		resolve,
		plugins,
	};
};
