// https://linguinecode.com/post/get-child-component-state-from-parent-component
import React from 'react';
import { useState, useEffect } from 'react';

type PaState = { count: number };
type State = Partial<PaState>;
export function GetChildState() {
	const [state, setState] = useState<State>();

	return (
		<>
			<Child
				onChange={(change_state) => {
					setState({ ...state, ...change_state });
				}}
				state={state}
			/>
			<div>{state?.count}</div>
		</>
	);
}

type Props = {
	onChange: (state: State) => void;
	state: State;
};
export function Child(props: Props) {
	const { onChange, state: p_state } = props;
	const [state, setState] = useState(p_state?.count || 0);

	useEffect(() => {
		if (onChange) {
			onChange({
				count: state,
			});
		}
		console.log(state);
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
