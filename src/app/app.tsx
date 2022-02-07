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
import { useWindowResize } from './utils';
import { Pagination } from './Pagination';

const App = () => {
	const [value, setVale] = useState<number>();
	const { innerWidth } = useWindowResize();

	return (
		<>
			<Pagination current={0} total={500} onChange={(index) => console.log(index)} />
			{/* {dayjs.tz(undefined, 'Etc/GMT+12').format('YYYY/MM/DD HH:mm')}
			<DatePicker
				tz="Etc/GMT+12"
				title={'Select Date1'}
				className="datePicker"
				isMobile={innerWidth < 1024}
				value={value}
				onChange={(val) => {
					setVale(val);
				}}
			/> */}
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
