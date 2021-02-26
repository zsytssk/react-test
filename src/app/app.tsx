import React, { useState, useEffect } from 'react';
// import { UseReducerFc } from './hook/useReducer';
// import { UseMemoFc } from './hook/useMemo';
// import { UseCallback } from './hook/useCallback';
import CreateRefParent from './hook/createRef';
import { UseLayoutEffect } from './hook/useLayoutEffect';
import { UseDebugValueWrap } from './hook/useDebugValue';
import { UseIntervalDemo, UseCusHookDemo } from './hook/cusHook';
import { UseLessTest } from './less/scss';
import { StateTest } from './stateTest/stateTest';
import { Svga, SvgaWrap } from './svga/svga';
import fishSvga from '../assets/svga/fish.svga';
import { FrameAniDemo } from './ani/frameDemo';
import { GetChildState } from './advance/getChildState';
import { ForceChildReRender } from './advance/forceChildReRender';
import { UseCallback } from './hook/useCallback';
import UseRefParent from './hook/useRef';
import { UseStateTest } from './hook/useState';
import MobileSelect from 'mobile-select';

import 'mobile-select/mobile-select.css';

const App = () => {
	useEffect(() => {
		console.log(`test:>1`);
		var mobileSelect2 = new MobileSelect({
			trigger: '#area',
			title: '地区选择',
			wheels: [
				{
					data: [
						{ id: '1', value: '附近' },
						{ id: '2', value: '上城区' },
						{ id: '3', value: '下城区' },
						{ id: '4', value: '江干区' },
						{ id: '5', value: '拱墅区' },
						{ id: '6', value: '西湖区' },
					],
				},
				{
					data: [
						{ id: '1', value: '1000米' },
						{ id: '2', value: '2000米' },
						{ id: '3', value: '3000米' },
						{ id: '4', value: '5000米' },
						{ id: '5', value: '10000米' },
					],
				},
			],
			callback: function (indexArr, data) {
				console.log(data); //Returns the selected json data
			},
		});
	}, []);

	return (
		<>
			<div id="area">dsfsdfdsf</div>
			{/* <UseStateTest /> */}
			{/* <ReduxTest /> */}
			{/* <UseReducerFc /> */}
			{/* <UseMemoFc /> */}
			{/* <UseCallback /> */}
			{/* <CreateRefParent /> */}
			{/* <UseRefParent /> */}
			{/* <UseLayoutEffect /> */}
			{/* <UseDebugValueWrap /> */}
			{/* <UseCusHookDemo /> */}
			{/* <UseLessTest /> */}
			{/* <StateTest /> */}
			{/* <FrameAniDemo /> */}
			{/* <GetChildState /> */}
			{/* <SvgaWrap url={fishSvga} time={10} /> */}
			{/* <ForceChildReRender /> */}
		</>
	);
};

export default App;
