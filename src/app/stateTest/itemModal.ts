import { EventCom } from '../eventCom';
import { useState, useEffect } from 'react';
import { sleep } from '@app/utils/utils';

const ItemModalEvent = {
	ChangeX: 'change_count',
};

export class ItemModal extends EventCom {
	public x = 0;
	public updateX = () => {
		this.x++;
		this.emit(ItemModalEvent.ChangeX);
	};
}

export function getState(itemModal: ItemModal) {
	const [_state, setState] = useState(itemModal);
	const [changeIndex, setChangeIndex] = useState(0);

	useEffect(() => {
		const fn = () => {
			setState(itemModal);
			setChangeIndex(changeIndex + 1);
		};
	}, [changeIndex]);

	return [_state, changeIndex] as [StateModel, number];
}
