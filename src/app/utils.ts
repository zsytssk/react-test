import React from 'react';

import { useEffect } from 'react';

export type PlacementPos = {
	top: number;
	left: number;
};
export type Placement = 'top' | 'left' | 'right' | 'bottom';

export function getPlacementPos(
	placement: Placement,
	dom: HTMLElement,
	localDom: HTMLElement,
	offset: number,
) {
	const bounds = dom.getBoundingClientRect();
	const localBounds = localDom.getBoundingClientRect();
	const { scrollTop, scrollLeft } = document.documentElement;
	const { clientWidth, clientHeight } = document.body;

	let left = 0;
	let top = 0;

	if (placement === 'right') {
		left = scrollLeft + bounds.left + bounds.width + offset;
		top = scrollTop + bounds.top + bounds.height / 2 - localBounds.height / 2;
	} else if (placement === 'top') {
		left = scrollLeft + bounds.left + (bounds.width - localBounds.width) / 2;
		top = scrollTop + bounds.top - localBounds.height - offset;
	} else if (placement === 'left') {
		left = scrollLeft + bounds.left - localBounds.width - offset;
		top = scrollTop + bounds.top + bounds.height / 2 - localBounds.height / 2;
	} else if (placement === 'bottom') {
		left = scrollLeft + bounds.left + (bounds.width - localBounds.width) / 2;
		top = scrollTop + bounds.top + bounds.height + offset;
	}

	if (left < 10) {
		left = 10;
	} else if (left + bounds.width - clientWidth > 10) {
		left = clientWidth - bounds.width - 10;
	}

	if (top < 10) {
		top = 10;
	} else if (top + bounds.height - clientHeight > 10) {
		left = clientHeight - bounds.height - 10;
	}

	return { left, top };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const throttle = (fn: Function, threshHold = 250, scope?: any) => {
	let last: number, deferTimer: NodeJS.Timeout;
	return function () {
		const context = scope || this;
		const now = +new Date(),
			// eslint-disable-next-line prefer-rest-params
			args = arguments;
		if (last && now < last + threshHold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshHold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
};

export const cloneDeep = (obj: any) => {
	if (obj === null) return null;
	const clone = Object.assign({}, obj) as any;
	Object.keys(clone).forEach(
		(key) => (clone[key] = typeof obj[key] === 'object' ? cloneDeep(obj[key]) : obj[key]),
	);
	if (Array.isArray(obj)) {
		clone.length = obj.length;
		return Array.from(clone);
	}
	return clone;
};

/* hooks */
export const useClickOutside = (ref: React.RefObject<any>, callback: (e: Event) => void) => {
	const handleClick = (e: Event) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback(e);
		}
	};
	React.useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

export const useWindowResize = () => {
	const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);

	React.useEffect(() => {
		const updateWidthAndHeight = throttle(() => {
			setInnerWidth(window.innerWidth);
			setInnerHeight(window.innerHeight);
		});

		window.addEventListener('resize', updateWidthAndHeight);
		return () => window.removeEventListener('resize', updateWidthAndHeight);
	}, []);

	return { innerWidth, innerHeight };
};

export const useClickInside = (
	ref: React.RefObject<any>,
	callback: (e: Event) => void,
	stopPropagation = false,
) => {
	const handleClick = (e: Event) => {
		if (stopPropagation) {
			e.stopPropagation();
		}
		if (ref.current && ref.current.contains(e.target)) {
			callback(e);
		}
	};
	React.useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

export const useTouchStartOutside = (
	refs: React.RefObject<any>[],
	callback: (e: Event) => void,
	doc: any = document,
) => {
	const handleClick = (e: Event) => {
		let isInside = false;
		for (const ref of refs) {
			if (ref.current && ref.current.contains(e.target)) {
				isInside = true;
				break;
			}
		}
		if (!isInside) {
			callback(e);
		}
	};

	React.useEffect(() => {
		doc.addEventListener('touchstart', handleClick);
		doc.addEventListener('click', handleClick);
		return () => {
			doc.removeEventListener('touchstart', handleClick);
			doc.removeEventListener('click', handleClick);
		};
	});
};
