import { EventCom } from '../eventCom';
import { useState, useEffect } from 'react';
import { sleep } from '@app/utils/utils';

const StateEvent = {
	ChangeCount: 'change_count',
	ChangeTest: 'change_test',
};
class StateModel extends EventCom {
	public count = 0;
	public test = { x: 1 };
	public setCount = () => {
		this.count++;
		this.emit(StateEvent.ChangeCount);
	};
	public setTest = () => {
		this.test.x++;
		sleep(1).then(() => {
			this.emit(StateEvent.ChangeTest);
		});
	};
}

let state = new StateModel();
export function getState() {
	const [_state, setState] = useState(state);
	const [changeIndex, setChangeIndex] = useState(0);

	useEffect(() => {
		const fn = () => {
			setState(state);
			setChangeIndex(changeIndex + 1);
		};
		// 如果不做成异步的就会变成无限死循环
		sleep().then(() => {
			state.on(StateEvent.ChangeCount, fn);
			state.on(StateEvent.ChangeTest, fn);
		});
		return () => {
			state.off(StateEvent.ChangeCount, fn);
			state.off(StateEvent.ChangeTest, fn);
		};
	}, [changeIndex]);

	return [_state, changeIndex] as [StateModel, number];
}
