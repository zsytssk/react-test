import React, { useState, useEffect } from 'react';
// import { UseReducerFc } from './hook/useReducer';
// import { UseMemoFc } from './hook/useMemo';
// import { UseCallback } from './hook/useCallback';
import UseImperativeHandleParent from './hook/useImperativeHandle';
import { UseLayoutEffect } from './hook/useLayoutEffect';
import { UseDebugValueWrap } from './hook/useDebugValue';
import { UseIntervalDemo, UseCusHookDemo } from './hook/cusHook';
import { UseLessTest } from './less/scss';
import { StateTest } from './stateTest/stateTest';
import { FrameAni } from './ani/frameAni';
import aniPng from '../assets/ani/ani.png';
import aniJson from '../assets/ani/ani.json';
import rocketPng from '../assets/ani/rocket.png';
import rocketJson from '../assets/ani/rocket.json';
import { Svga, SvgaWrap } from './svga/svga';
import fishSvga from '../assets/svga/fish.svga';

const App = () => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const fn = () => {
			setShow(!show);
		};
		document.body.addEventListener('click', fn);
		return () => {
			document.body.removeEventListener('click', fn);
		};
	}, [show]);

	return (
		<>
			{/* <ReduxTest /> */}
			{/* <UseReducerFc /> */}
			{/* <UseMemoFc /> */}
			{/* <UseCallback /> */}
			{/* <UseImperativeHandleParent /> */}
			{/* <UseLayoutEffect /> */}
			{/* <UseDebugValueWrap /> */}
			{/* <UseCusHookDemo /> */}
			{/* <UseLessTest /> */}
			{/* <StateTest /> */}
			<FrameAni
				png={rocketPng}
				json={rocketJson}
				interval={40}
				anchorX={0}
				anchorY={0}
				endFn={() => {
					setShow(false);
				}}
			/>
			<SvgaWrap url={fishSvga} time={10} />
		</>
	);
};

export default App;
