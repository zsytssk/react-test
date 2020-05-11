import { Downloader, Parser, Player } from 'svga.lite';
import React, { useEffect, useState } from 'react';

import { genRandomStr, getSvgData } from '@app/utils/utils';

type Props = {
	url: string;
	time?: number;
	endFn?: () => void;
	x?: number;
	y?: number;
	anchorX?: number;
	anchorY?: number;
};
const defaultProps = {
	anchorX: 0,
	anchorY: 0,
};

export function Svga(props: Props) {
	props = { ...defaultProps, ...props };
	const { url, time, endFn, x, y, anchorX, anchorY } = props;
	const [state, setState] = useState('');

	useEffect(() => {
		setState(genRandomStr());
	}, []);

	useEffect(() => {
		if (!state) {
			return;
		}
		let destroy = false;
		const player = new Player(`#${state}`); // #canvas is HTMLCanvasElement
		const fn = async () => {
			const svgaData = await getSvgData(url);

			player.set({
				loop: time || Infinity,
				fillMode: 'forwards',
			});
			if (destroy) {
				return;
			}
			await player.mount(svgaData);
			if (destroy) {
				return;
			}
			player.$on('end', () => {
				endFn && endFn();
			});
			player.start();
		};

		fn();
		return () => {
			destroy = true;
			player.destroy();
		};
	}, [state]);

	if (!state) {
		return null;
	}

	return (
		<canvas
			id={state}
			style={{
				transform: `translate(-${100 * anchorX}%, -${100 * anchorY}%)`,
				position: 'absolute',
				top: x,
				left: y,
			}}
		></canvas>
	);
}

export function SvgaWrap(props: Props) {
	const [show, setShow] = useState(true);

	return (
		show && (
			<Svga
				{...props}
				endFn={() => {
					setShow(false);
				}}
			/>
		)
	);
}
