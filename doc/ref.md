- useImperativeHandle 应该比直接赋值 ref.current 更好
- forwardRef 只是为了传递 ref key ？

```tsx
/*
下面的代码可以执行 不知道 forwardRef到底能干嘛，
只是为了保证 ref 这个能传给child吗？
*/
import React, { forwardRef, useEffect, useImperativeHandle, useRef, createRef } from 'react';

export default class UseImperativeHandleParent extends React.Component {
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
	return <input ref={forwardedRef} />;
};
```
