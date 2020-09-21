import React, { useState, useEffect } from 'react';

export function UseStateTest() {
	const [count, setCount] = useState(0);

	function addCount() {
		setCount(count + 1);
	}

	useEffect(() => {
		document.body.addEventListener('click', addCount, false);
		return () => document.body.removeEventListener('click', addCount);
	}, [count]);

	return <div style={{ width: 100, height: 100, backgroundColor: 'red' }}>{count}</div>;
}
