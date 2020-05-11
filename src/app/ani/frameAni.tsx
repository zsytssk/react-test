import React, { useEffect, useState, useRef } from 'react';
import { loop } from './zTimer';

type Size = {
	width: number;
	height: number;
};
type Pos = {
	x: number;
	y: number;
};
type Props = {
	png: string[];
	json: any;
	interval: number;
	time?: number;
	endFn?: () => void;
	x?: number;
	y?: number;
	anchorX?: number;
	anchorY?: number;
};
const defaultProps = {
	anchorX: 0.5,
	anchorY: 0.5,
};
export function FrameAni(props: Props) {
	props = { ...defaultProps, ...props };
	const { png, json, interval, time, endFn, x, y, anchorX, anchorY } = props;
	const ref = useRef<boolean>();
	const [size, setSize] = useState<Size>();
	const [innerPos, setInnerPos] = useState<Pos>();
	const [innerSize, setInnerSize] = useState<Size>();
	const [bgPos, setBgPos] = useState<Pos>();
	const [bgSize, setBgSize] = useState<Size>();
	const [pngIdx, setPngIdx] = useState<number>();

	useEffect(() => {
		const length = png.length;
		let i = 0;
		for (const item_png of png) {
			const img = new Image();
			img.onload = () => {
				setBgSize({
					width: img.width,
					height: img.height,
				});
				i++;
				if (i >= length) {
					ref.current = true;
				}
			};
			img.src = item_png;
		}
	}, []);

	useEffect(() => {
		const { frames } = json;
		const keys = Object.keys(frames);
		let i = 0;
		let time_count = 0;
		const fn = (t) => {
			if (!ref.current) {
				return;
			}
			if (i >= keys.length) {
				time_count++;
				i = 0;

				if (time_count >= time) {
					endFn();
					return;
				}
			}
			const key = keys[i];
			// console.log()frames[key]
			const {
				frame: { h, w, x, y, idx },
				sourceSize: { h: sh, w: sw },
				spriteSourceSize: { x: sx, y: sy },
			} = frames[key];
			setBgPos({ x, y });
			setSize({ width: sw, height: sh });
			setInnerSize({ width: w, height: h });
			setInnerPos({ x: sx, y: sy });
			setPngIdx(idx);
			i = i + t;
		};
		const off = loop(fn, interval, fn);
		return () => {
			off();
		};
	}, []);

	if (!ref.current) {
		return null;
	}

	return (
		<div
			style={{
				width: size?.width,
				height: size?.height,
				transform: `translate(-${100 * anchorX}%, -${100 * anchorY}%)`,
				position: 'absolute',
				top: x,
				left: y,
			}}
		>
			<div
				className="inner"
				style={{
					position: 'absolute',
					overflow: 'hidden',
					width: innerSize?.width,
					height: innerSize?.height,
					left: innerPos?.x,
					top: innerPos?.y,
				}}
			>
				<div
					style={{
						width: bgSize?.width,
						height: bgSize?.height,
						transform: `translate3d(-${bgPos?.x}px, ${-bgPos?.y}px, 0)`,
						backgroundImage: `url(${png[pngIdx]})`,
					}}
				></div>
			</div>
		</div>
	);
}
