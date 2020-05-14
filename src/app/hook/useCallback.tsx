import React, { useCallback, useState } from 'react';

export const UseCallback = () => {
	const [count, setCount] = useState(0);

	/** 每次都会重新创建函数 也能达到目标 就是消耗太大了 */
	const onClick1 = () => {
		console.log(count);
		setCount(count + 1);
	};

	/** 只有再 decency 发生改变时才会更新 */
	const onClick2 = useCallback(() => {
		console.log(count);
		setCount(count + 1);
	}, []);

	/** 这个是最好的写法 */
	const onClick3 = useCallback(() => {
		console.log(count);
		setCount(count + 1);
	}, [count]);

	/** 使用参数... */
	const onClickWithArgument = useCallback((new_count) => {
		setCount(new_count);
	}, []);

	return (
		<>
			<div>{count}</div>
			<button onClick={onClick1}>click1</button>
			<button onClick={onClick2}>click2</button>
			<button onClick={onClick3}>click3</button>
			<button
				onClick={() => {
					onClickWithArgument(count + 1);
				}}
			>
				click4
			</button>
		</>
	);
};
