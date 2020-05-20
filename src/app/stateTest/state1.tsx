import React from 'react';
import { getState } from './stateManger';

export function State1() {
	const [state] = getState();
	console.log(1);

	return (
		<button onClick={state.setTest}>
			count:{state?.count}|test:{state?.test?.x}
		</button>
	);
}
