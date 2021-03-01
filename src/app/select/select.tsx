import React, { useEffect, useMemo, useRef } from 'react';

import style from './select.less';
import { getEventPosInDom } from './selectUtils';

type Item = {
	id: string;
	value: string;
};
type Props<T extends Item> = {
	value?: string;
	data: T[];
	title: string;
	cancelTxt?: string;
	confirmTxt?: string;
	onChange: (value: string) => void;
	itemRender?: (value: T, index: number) => React.ReactNode;
};
export function Select<T extends Item>({
	itemRender,
	value,
	data,
	onChange,
	title,
	cancelTxt,
	confirmTxt,
}: Props<T>) {
	cancelTxt = cancelTxt || 'cancel';
	confirmTxt = confirmTxt || 'confirm';

	return (
		<div className={style.selectModalWrap}>
			<div className="select">
				<div className="header">
					<div className="cancel">{cancelTxt}</div>
					<div className="title">{title}</div>
					<div className="confirm">{confirmTxt}</div>
				</div>
				<div className="panel">
					<div className="fixWidth">
						<div className="wheels">
							<div className="wheel">
								<List itemRender={itemRender} value={value} data={data} onChange={onChange} />
							</div>
						</div>
						<div className="selectLine"></div>
						<div className="shadowMask"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

type ListProps<T extends Item> = {
	value: string;
	data: T[];
	onChange: Props<T>['onChange'];
	itemRender?: Props<T>['itemRender'];
};
type Pos = {
	x: number;
	y: number;
};
type Status = 'normal' | 'start' | 'move' | 'end';
function List<T extends Item>({ value, data, onChange, itemRender }: ListProps<T>) {
	const ref = useRef<HTMLUListElement>(null);
	const onChangeRef = useRef<(index: number) => void>();

	useEffect(() => {
		onChangeRef.current = (_index: number) => {
			onChange?.(data[_index].value);
		};
	}, [onChange, data]);

	const index = useMemo(() => {
		const calcIndex = data.findIndex((item) => item.value === value);
		return calcIndex === -1 ? 0 : calcIndex;
	}, [value, data]);

	useEffect(() => {
		const dom = ref.current;
		let endMove = 0;
		let status: Status = 'normal';
		let dist = 0;
		let lastPos = {} as Pos;

		const moveDom = (n: number) => {
			dom.setAttribute('style', `transform: translateY(${n}px)`);
		};
		const start = (e: TouchEvent) => {
			e.preventDefault();
			const pos = getEventPosInDom(dom, e);
			lastPos = pos;
			status = 'start';
		};
		const move = (e: TouchEvent) => {
			if (status !== 'start' && status !== 'move') {
				return;
			}
			e.preventDefault();
			status = 'move';
			const newPos = getEventPosInDom(dom, e);
			const distPos = {
				x: newPos.x - lastPos.x,
				y: newPos.y - lastPos.y,
			};
			lastPos = newPos;
			if (Math.abs(distPos.x) > Math.abs(distPos.y)) {
				return;
			}
			let nextDist = dist + distPos.y;
			if (isOut(nextDist + endMove)) {
				nextDist = dist + distPos.y / 3;
			}
			dist = nextDist;
			moveDom(nextDist + endMove);
		};

		const end = (e: TouchEvent) => {
			if (status !== 'move') {
				return;
			}
			calcCurIndex(dist + endMove);
			status = 'end';
			dist = 0;
			lastPos = {} as Pos;
		};

		const isOut = (move: number = 0) => {
			const parentHeight = dom.parentElement?.getBoundingClientRect()?.height;
			const itemHeight = dom.children[0]?.getBoundingClientRect()?.height;
			const len = dom.children.length;
			const middle = parentHeight / 2;

			let min: number;
			let newIndex = 0;
			for (let i = 0; i < len; i++) {
				const itemMiddle = i * itemHeight + itemHeight / 2 + move;
				const itemSpace = Math.abs(itemMiddle - middle);
				if (min === undefined || min > itemSpace) {
					min = itemSpace;
					newIndex = i;
				}
			}

			if (newIndex === 0 && min > itemHeight / 2) {
				return true;
			}
			if (newIndex === len - 1 && min > itemHeight / 2) {
				return true;
			}
			return false;
		};

		const calcCurIndex = (move: number = 0) => {
			const parentHeight = dom.parentElement?.getBoundingClientRect()?.height;
			const itemHeight = dom.children[0]?.getBoundingClientRect()?.height;
			const middle = parentHeight / 2;

			let min: number;
			let newIndex = 0;
			for (let i = 0; i < dom.children.length; i++) {
				const itemMiddle = i * itemHeight + itemHeight / 2 + move;
				const itemSpace = Math.abs(itemMiddle - middle);
				if (min === undefined || min > itemSpace) {
					min = itemSpace;
					newIndex = i;
				}
			}
			moveToIndex(newIndex);
		};
		const moveToIndex = (index: number) => {
			const parentHeight = dom.parentElement?.getBoundingClientRect()?.height;
			const itemHeight = dom.children[0]?.getBoundingClientRect()?.height;
			const middle = parentHeight / 2;
			endMove = middle - (index * itemHeight + itemHeight / 2);
			onChangeRef.current?.(index);
			moveDom(endMove);
		};

		dom.addEventListener('touchstart', start, { passive: false });
		document.body.addEventListener('touchmove', move, { passive: false });
		document.body.addEventListener('touchend', end, { passive: false });
		document.body.addEventListener('touchcancel', end, { passive: false });
		moveToIndex(index);

		return () => {
			dom.removeEventListener('touchstart', start);
			document.body.removeEventListener('touchmove', move);
			document.body.removeEventListener('touchend', end);
			document.body.removeEventListener('touchcancel', end);
		};
	}, [index]);

	return (
		<ul ref={ref}>
			{data.map((item, index) => {
				return <li key={item.id}>{itemRender ? itemRender(item, index) : item.value}</li>;
			})}
		</ul>
	);
}
