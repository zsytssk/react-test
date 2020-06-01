import React, { forwardRef, useEffect, useImperativeHandle, useRef, createRef } from 'react';

/** 我试过 funCom中 createRef === useRef， 不需要 forwardRef
 * classCom 需要
 */
export default class CreateRefParent extends React.Component {
	testRef: any;
	constructor(props: {}) {
		super(props);
		this.testRef = createRef();
	}
	onClick = () => {
		console.log(this.testRef);
		this.testRef.current.focus();
	};
	render() {
		console.log(`test:>`, this.testRef);
		return (
			<>
				<div>
					<UseImperativeHandle forwardedRef={this.testRef} />
				</div>
				<button onClick={this.onClick}>click</button>
			</>
		);
	}
}

const UseImperativeHandle = (props: any) => {
	const { forwardedRef } = props;
	// console.log(props, forwardedRef);
	// const inputRef = useRef((null as unknown) as HTMLInputElement);
	// useImperativeHandle(forwardedRef, () => ({
	// 	focus: () => {
	// 		inputRef.current.focus();
	// 	},
	// }));
	return <input ref={forwardedRef} />;
};

const FancyInput = forwardRef(UseImperativeHandle);

// export default UseImperativeHandleParent;
