import path from 'path';

export const resolve = {
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
	alias: {
		'@app': path.resolve(__dirname, './src'),
	},
};
