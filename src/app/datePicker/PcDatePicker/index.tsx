import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { DatePickerPanel, Props as PcDatePickerProps } from './DatePickerPanel';
import { useTouchStartOutside } from '../../utils';
import Dropdown from '../../Dropdown';

import { Props } from '../';

export default function PcDatePicker({
	tz,
	locale,
	dropClassName,
	className,
	disabledDate,
	onChange,
	value,
}: Omit<Props, 'isMobile' | 'title'>) {
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useTouchStartOutside([dropdownRef, inputRef], (e: any) => {
		setVisible?.(false);
		inputRef.current?.blur();
	});

	return (
		<Dropdown
			visible={visible}
			overlay={() => {
				return (
					<div ref={dropdownRef} className={classnames(dropClassName)}>
						<DatePickerPanel
							tz={tz}
							locale={locale}
							value={value}
							disabledDate={disabledDate}
							onChange={(val: number) => {
								onChange?.(val);
								setVisible(false);
							}}
						/>
					</div>
				);
			}}
		>
			<div className={classnames(className)}>
				<input
					ref={inputRef}
					type="text"
					value={value ? dayjs(value).format('YYYY/MM/DD') : ''}
					onFocus={() => setVisible(true)}
					onBlur={() => {
						if (visible) {
							inputRef.current?.focus();
						}
					}}
				/>
			</div>
		</Dropdown>
	);
}
