import { Downloader, Parser } from 'svga.lite';

export function genRandomStr() {
	return 'r' + Math.random().toString(16).replace('0.', '');
}

const map = {} as { [key: string]: any };
const wait_map = {} as { [key: string]: Promise<any> };
export function getSvgData(url: string) {
	const temp_data = map[url];
	if (temp_data) {
		return Promise.resolve(temp_data);
	}
	const wait_temp_data = wait_map[url];
	if (wait_temp_data) {
		return wait_temp_data;
	}

	const task = new Promise((resolve, reject) => {
		const downloader = new Downloader();
		const parser = new Parser();
		downloader
			.get(url)
			.then((data) => {
				return parser.do(data);
			})
			.then((data) => {
				wait_map[url] = undefined;
				map[url] = data;
				resolve(data);
			});
	});
	wait_map[url] = task;

	return task;
}
