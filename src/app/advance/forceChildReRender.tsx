// https://linguinecode.com/post/get-child-component-state-from-parent-component
import React, { useEffect } from 'react';
import { useState } from 'react';

export function ForceChildReRender() {
	const [state, setState] = useState(0);

	useEffect(() => {
		setState(100);
	}, []);

	console.log(`test:.1`);
	return (
		<>
			<button
				onClick={() => {
					setState(state + 1);
				}}
			>
				add
			</button>
			<Child count={state} />
		</>
	);
}

type Props = {
	count: number;
};
export function Child(props: Props) {
	const { count } = props;
	const [state, setState] = useState(count);

	console.log(`test:.2`);
	useEffect(() => {
		if (count !== state) {
			setState(count);
		}
	}, [count]);

	return <div>{state}</div>;
}
