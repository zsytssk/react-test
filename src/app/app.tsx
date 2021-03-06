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

import dayjs from 'dayjs';
import 'mobile-select/mobile-select.css';
import DatePicker from './DatePicker';
import SelectMobile from './SelectMobile';

const App = () => {
	return (
		<>
			<DatePicker
				className="datePicker"
				isMobile={true}
				onChange={(val) => {
					console.log(val);
				}}
			/>
			{/* <DatePicker
				tz="America/New_York"
				locale={vi}
				disabledDate={(current) => current < Date.now()}
				onChange={(val: number) => {}}
			/> */}
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
