import { EventCom } from '../eventCom';
import { useState, useEffect } from 'react';
import { sleep } from '@app/utils/utils';
import { ItemModal } from './itemModal';

const StateEvent = {
	ChangeCount: 'change_count',
	ChangeTest: 'change_test',
};

class StateModel extends EventCom {
	public count = 0;
	public list: Set<ItemModal> = new Set();
	public setCount = () => {
		this.count++;
		this.emit(StateEvent.ChangeCount);
	};
	public setTest = () => {};
}

let state = new StateModel();

export function createUseState<T extends EventCom>(state: T, eventList: string[]) {
	return () => {
		const [changeIndex, setChangeIndex] = useState(0);

		useEffect(() => {
			const fn = () => {
				setChangeIndex(changeIndex + 1);
			};
			for (const event of eventList) {
				state.on(event, fn);
			}
			return () => {
				for (const event of eventList) {
					state.off(event, fn);
				}
			};
		}, [changeIndex]);

		return [state, changeIndex] as [T, number];
	};
}

export const getState = createUseState(state, [StateEvent.ChangeCount, StateEvent.ChangeTest]);
