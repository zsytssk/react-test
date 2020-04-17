import React, { useRef } from 'react';
import style from './scss.less';

export const UseLessTest = () => {
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);

	return (
		<div className={style.box}>
			<div ref={ref1} className={style.child}>
				<div> line1</div>
			</div>
			<div className={style.child}>line2</div>
		</div>
	);
};
