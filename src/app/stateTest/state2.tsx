import React, { useEffect } from 'react';
import { getState } from './stateManger';

export function State2() {
	const [state, changeIndex] = getState();

	useEffect(() => {}, [changeIndex]);
	return (
		<button onClick={state?.setCount}>
			count:{state?.count}|test:{state?.x}
		</button>
	);
}
