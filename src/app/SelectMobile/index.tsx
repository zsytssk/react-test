import React, { useEffect, useMemo, useRef, useState } from 'react';
import SVG from 'react-inlinesvg';

import style from './style.module.less';
import closeIcon from './close.svg';

type Item<T> = {
	label: string | number;
	value: any;
};
type Props<T> = {
	visible: boolean;
	onClose: () => void;
	onChange: (value: T) => void;
	onMultiChange: (value: T, index: number) => void;
	value?: any;
	data?: Item<T>[];
	mulValue?: T[];
	mulData?: Item<T>[][];
	title: string;
	cancelTxt?: string;
	confirmTxt?: string;
	isEqual?: (value: T, item: T) => boolean;
	itemRender?: (value: Item<T>, index: number) => React.ReactNode;
};

export default function SelectMobile<T>({
	visible,
	onClose,
	itemRender,
	value,
	data,
	onChange,
	onMultiChange,
	title,
	cancelTxt,
	confirmTxt,
	mulData,
	mulValue,
	isEqual,
}: Props<T>) {
	cancelTxt = cancelTxt || 'cancel';
	confirmTxt = confirmTxt || 'confirm';

	const [localValue, setLocalValue] = useState<T>();
	const [localMultiValue, setLocalMulValue] = useState<T[]>();

	if (!visible || (!data?.length && !mulData?.length)) {
		return null;
	}

	// const onLocalMulValueChange = (val: T, index: number) => {
	//   localMultiValue[]
	// };
	const onConfirm = () => {
		onClose();
		onChange(localValue);
	};
	return (
		<div className={`${style.selectModalWrap} ${visible ? style.show : ''}`}>
			<div className="mask" onClick={onClose}></div>
			<div className={`select`}>
				<div className="header">
					<div className="title">{title}</div>
					<div className="cancel" onClick={onClose}>
						<SVG src={closeIcon} />
					</div>
				</div>
				<div className="panel">
					<div className="fixWidth">
						<div className="wheels">
							{mulData ? (
								mulData.map((item, index) => {
									return (
										<div className="wheel" key={index}>
											<List
												isEqual={isEqual}
												itemRender={itemRender}
												value={mulValue[index]}
												data={item}
												onChange={(value) => {
													onMultiChange(value, index);
												}}
											/>
										</div>
									);
								})
							) : (
								<div className="wheel">
									<List
										itemRender={itemRender}
										value={value}
										data={data}
										isEqual={isEqual}
										onChange={(value) => {
											setLocalValue(value);
										}}
									/>
								</div>
							)}
						</div>
						<div className="selectLine"></div>
						<div className="shadowMask"></div>
					</div>
				</div>
				<div className="confirmBox" onClick={onConfirm}>
					<div className="btnConfirm">{confirmTxt}</div>
				</div>
			</div>
		</div>
	);
}

type ListProps<T> = {
	value?: T;
	data: Item<T>[];
	onChange: Props<T>['onChange'];
	itemRender?: Props<T>['itemRender'];
	isEqual?: (value: T, item: T) => boolean;
};
type Pos = {
	x: number;
	y: number;
};
type Status = 'normal' | 'start' | 'move' | 'end';
function List<T>({ value, data, onChange, itemRender, isEqual }: ListProps<T>) {
	const ref = useRef<HTMLUListElement>(null);
	const onChangeRef = useRef<(index: number) => void>();

	useEffect(() => {
		onChangeRef.current = (_index: number) => {
			if (!data?.length) {
				return;
			}
			onChange?.(data[_index].value);
		};
	}, [onChange, data]);

	const index = useMemo(() => {
		const calcIndex = data.findIndex((item) => {
			if (isEqual) {
				return isEqual(item.value, value);
			} else {
				return item.value === value;
			}
		});
		return calcIndex === -1 ? 0 : calcIndex;
	}, [value, data]);

	useEffect(() => {
		const dom = ref.current;

		let endMove = 0;
		let status: Status = 'normal';
		let dist = 0;
		let lastPos = {} as Pos;

		if (!dom) {
			return;
		}

		const moveDom = (n: number, ani = false) => {
			if (ani) {
				dom.classList.add('ani');
				dom.addEventListener(
					'animationend',
					() => {
						dom.classList.remove('ani');
					},
					false,
				);
			}
			dom.setAttribute('style', `transform: translateY(${n}px)`);
		};
		const start = (e: TouchEvent) => {
			e.preventDefault();
			const pos = getEventPosInDom(e);
			lastPos = pos;
			status = 'start';
		};
		const move = (e: TouchEvent) => {
			if (status !== 'start' && status !== 'move') {
				return;
			}
			e.preventDefault();
			status = 'move';
			const newPos = getEventPosInDom(e);
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

		const isOut = (move = 0) => {
			const parentHeight = dom.parentElement?.getBoundingClientRect()?.height;
			if (!parentHeight) {
				return false;
			}

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

		const calcCurIndex = (move = 0) => {
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
			moveToIndex(newIndex, true);
		};

		const moveToIndex = (index: number, ani = false) => {
			const parentHeight = dom.parentElement?.getBoundingClientRect()?.height;
			const itemHeight = dom.children[0]?.getBoundingClientRect()?.height;
			const middle = parentHeight / 2;
			endMove = middle - (index * itemHeight + itemHeight / 2);
			onChangeRef.current?.(index);
			moveDom(endMove, ani);
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
	}, [index, data]);

	return (
		<ul ref={ref}>
			{data.map((item, index) => {
				return <li key={index}>{itemRender ? itemRender(item, index) : item.label}</li>;
			})}
		</ul>
	);
}

function getEventPosInDom(event: TouchEvent): { x: number; y: number } {
	const myLocation = event.changedTouches[0];
	return {
		x: myLocation.clientX,
		y: myLocation.clientY,
	};
}
