let frameId: number;
/** 绑定的函数 */
type HookFun = (tick: number) => void;
type HookItem = {
	caller: any;
	delay: number;
	fun: (step: number) => void;
	off: () => void;
	once: boolean;
	then: number;
};

const hooks: HookItem[] = [];
/**开始执行循环函数
 * @param fun 每次执行的执行的韩式
 * @param delay 传入的间隔
 * @param caller 绑定对象
 * @param once 是否只执行一次
 */
export function loop(fun: HookFun, delay: number, caller?: any, once?: boolean) {
	const off = () => {
		clear(fun, caller);
	};
	hooks.push({
		caller,
		delay,
		fun,
		off,
		once,
		then: Date.now(),
	});
	startInterval();
	return off;
}

export function clear(fun: HookFun, caller: any) {
	for (let len = hooks.length, i = len - 1; i >= 0; i--) {
		const { fun: fun_item, caller: caller_item } = hooks[i];
		if (caller_item !== caller || fun_item !== fun) {
			continue;
		}
		hooks.splice(i, 1);
		startInterval();
		return;
	}
}
export function clearAll(caller: any) {
	for (let len = hooks.length, i = len - 1; i >= 0; i--) {
		const { caller: caller_item } = hooks[i];
		if (caller === caller_item) {
			hooks.splice(i, 1);
			continue;
		}
	}
	startInterval();
}
/** 计算所有interval的最大公约数, 每gcd（最大公约数）次执行一次interval */
function startInterval() {
	cancelAnimationFrame(frameId);
	if (!hooks.length) {
		return;
	}
	interval();
}

function interval() {
	const len = hooks.length;
	if (!len) {
		return;
	}
	const now = Date.now();
	for (let i = len - 1; i >= 0; i--) {
		const hook_item = hooks[i];
		const { fun, then, delay, once, off } = hook_item;
		const elapsed = now - then || 0;
		if (elapsed < delay) {
			continue;
		}
		const time = Math.floor(elapsed / delay);

		const new_then = now - (elapsed - time * delay);
		if (typeof fun === 'function') {
			fun(time);
		}
		if (once) {
			off();
			continue;
		}
		hook_item.then = new_then;
	}
	frameId = requestAnimationFrame(interval);
}
