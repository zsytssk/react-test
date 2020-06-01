import React, { useEffect, useRef } from 'react';

/**  */
const UseRefParent = () => {
	const ref1 = useRef(null as any);
	const ref2 = useRef(null as any);

	const onClick1 = () => {
		console.log(ref1.current);
		ref1.current.focus();
	};
	const onClick2 = () => {
		console.log(ref2.current);
		ref2.current();
	};

	return (
		<>
			<div>
				<UseRefChild forwardRef={ref1} />;
				<UseRefChildFn forwardRef={ref2} />;
			</div>
			<button onClick={onClick1}>click1</button>
			<button onClick={onClick2}>click2</button>
		</>
	);
};

const UseRefChild = (props: any) => {
	const { forwardRef } = props;
	return <input ref={forwardRef} />;
};

const UseRefChildFn = (props: any) => {
	const inputRef = useRef((null as unknown) as HTMLInputElement);
	const { forwardRef } = props;
	useEffect(() => {
		forwardRef.current = () => {
			inputRef.current.focus();
		};
	}, []);
	return <input ref={inputRef} />;
};

export default UseRefParent;
