import webpack, { Stats } from 'webpack';
import chalk from 'chalk';
import { webpackConfigFn } from '../webpack/webpack.config';

const config = webpackConfigFn('Prod');

type BuildResult = {
	stats: Stats;
	warnings: string[];
};
function build() {
	const compiler = webpack(config);
	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			let messages: Partial<Stats.ToJsonOutput>;
			if (err) {
				if (!err.message) {
					return reject(err);
				}

				let errMessage = err.message;

				// Add additional information for postcss errors
				if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
					errMessage += '\nCompileError: Begins at CSS selector ' + err['postcssNode'].selector;
				}

				messages = {
					errors: [errMessage],
					warnings: [],
				};
			} else {
				messages = stats.toJson({ all: false, warnings: true, errors: true });
			}

			if (messages.errors.length) {
				// Only keep the first error. Others are often indicative
				// of the same problem, but confuse the reader with noise.
				if (messages.errors.length > 1) {
					messages.errors.length = 1;
				}
				return reject(new Error(messages.errors.join('\n\n')));
			}

			return resolve({
				stats,
				warnings: messages.warnings,
			});
		});
	}) as Promise<BuildResult>;
}

build()
	.then((data) => {
		console.log(chalk.blue(data.stats.toString()));
		if (data.warnings) {
			console.log(chalk.yellow(data.warnings));
		}
	})
	.catch((err) => {
		if (err && err.message) {
			console.log(chalk.red(err.message));
		}
		process.exit(1);
	});
