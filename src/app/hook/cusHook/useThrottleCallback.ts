import { useRef, useEffect } from 'react';

export function useThrottledCallback<A extends any[]>(
	callback: (...args: A) => void,
	wait: number,
) {
	// track args & timeout handle between calls
	const disableRef = useRef<boolean>();
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	function cleanup() {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
	}

	// make sure our timeout gets cleared if
	useEffect(() => {
		return () => {
			cleanup();
			timeout.current = undefined;
		};
	}, []);

	return function throttleCallback(...args: A) {
		// capture latest args

		if (disableRef.current) {
			return;
		}

		disableRef.current = true;
		// clear debounce timer

		callback(...args);

		cleanup();
		timeout.current = setTimeout(() => {
			disableRef.current = false;
		}, wait);
	};
}
