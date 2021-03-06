import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import dayjs from 'dayjs';
import PcDatePicker, { Props as PcDatePickerProps } from './PcDatePicker';
import MobileDatePicker from './MobileDatePicker';
import { useTouchStartOutside } from '../utils';
import Dropdown from '../Dropdown';

type Props = {
	value?: number;
	isMobile: boolean;
	onChange: PcDatePickerProps['onChange'];
	disabledDate?: PcDatePickerProps['disabledDate'];
	dropClassName?: string;
	className?: string;
};

export default function DatePicker({
	dropClassName,
	className,
	isMobile,
	disabledDate,
	onChange,
	value,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useTouchStartOutside([dropdownRef, inputRef], (e: any) => {
		setVisible?.(false);
		inputRef.current?.blur();
	});

	return (
		<>
			{isMobile ? (
				<MobileDatePicker
					value={value}
					disabledDate={disabledDate}
					onChange={(val: number) => {
						onChange?.(val);
						setVisible(false);
					}}
				/>
			) : (
				<Dropdown
					visible={visible}
					overlay={() => {
						return (
							<div ref={dropdownRef} className={classnames(dropClassName)}>
								<PcDatePicker
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
							value={dayjs(value).format('YYYY/MM/DD')}
							onFocus={() => setVisible(true)}
							onBlur={() => {
								if (visible) {
									inputRef.current?.focus();
								}
							}}
						/>
					</div>
				</Dropdown>
			)}
		</>
	);
}
