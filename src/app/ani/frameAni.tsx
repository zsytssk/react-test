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
	png: string;
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
	const [pos, setPos] = useState<Pos>();
	const [bgSize, setBgSize] = useState<Size>();

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setBgSize({
				width: img.width,
				height: img.height,
			});
			ref.current = true;
		};
		img.src = png;
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
			const {
				frame: { h, w, x, y },
			} = frames[key];
			setPos({ x, y });
			setSize({ width: w, height: h });
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
				overflow: 'hidden',
				transform: `translate(-${100 * anchorX}%, -${100 * anchorY}%)`,
				position: 'absolute',
				top: x,
				left: y,
			}}
		>
			<div
				style={{
					width: bgSize?.width,
					height: bgSize?.height,
					transform: `translate3d(-${pos?.x}px, ${-pos?.y}px, 0)`,
					backgroundImage: `url(${png})`,
				}}
			></div>
		</div>
	);
}
