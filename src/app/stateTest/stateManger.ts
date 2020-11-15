import { EventCom } from '../eventCom';
import { useState, useEffect, useRef } from 'react';
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

export const getState = createUseModal(state, [StateEvent.ChangeCount, StateEvent.ChangeTest]);

export function useModel<T extends EventCom>(model: T, eventList: string[]) {
	const ref = useRef<() => void>();
	const [changeIndex, setChangeIndex] = useState(0);

	useEffect(() => {
		ref.current = () => {
			setChangeIndex(changeIndex + 1);
		};
		return () => {
			ref.current = undefined;
		};
	}, [changeIndex]);

	useEffect(() => {
		const fn = () => {
			ref.current?.();
		};
		for (const event of eventList) {
			model.on(event, fn);
		}
		return () => {
			for (const event of eventList) {
				model.off(event, fn);
			}
		};
	}, [model, eventList]);

	return [model, changeIndex] as [T, number];
}

export function createUseModal<T extends EventCom>(model: T, eventList: string[]) {
	return () => {
		const ref = useRef<() => void>();
		const [changeIndex, setChangeIndex] = useState(0);

		useEffect(() => {
			ref.current = () => {
				setChangeIndex(changeIndex + 1);
			};
			return () => {
				ref.current = undefined;
			};
		}, [changeIndex]);

		useEffect(() => {
			const fn = () => {
				ref.current?.();
			};
			for (const event of eventList) {
				model.on(event, fn);
			}
			return () => {
				for (const event of eventList) {
					model.off(event, fn);
				}
			};
		}, [model, eventList]);

		return [model, changeIndex] as [T, number];
	};
}
