// https://linguinecode.com/post/get-child-component-state-from-parent-component
import React from 'react';
import { useState, useEffect } from 'react';

export function GetChildState() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Child
				onChange={(state) => {
					setCount(state);
				}}
			/>
			<div>{count}</div>
		</>
	);
}

type Props = {
	onChange: (state: number) => void;
};
export function Child(props: Props) {
	const { onChange } = props;
	const [state, setState] = useState(0);

	useEffect(() => {
		if (onChange) {
			onChange(state);
		}
	}, [state]);

	return (
		<button
			onClick={() => {
				setState(state + 1);
			}}
		>
			add
		</button>
	);
}
