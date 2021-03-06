import React, { useRef, useState } from 'react';
import PcDatePicker from './PcDatePicker';
import MobileDatePicker from './MobileDatePicker';
import { useTouchStartOutside } from '../utils';
import Dropdown from '../Dropdown';
import { Locale } from 'dayjs/locale/*';

export type Props = {
	tz?: string;
	locale?: Locale;
	value?: number;
	isMobile: boolean;
	onChange: (value: number) => void;
	disabledDate?: (current: number) => boolean;
	dropClassName?: string;
	className?: string;
	title: string;
};

export default function DatePicker({
	locale,
	tz,
	className,
	dropClassName,
	isMobile,
	disabledDate,
	onChange,
	value,
	title,
}: Props) {
	return (
		<>
			{isMobile ? (
				<MobileDatePicker
					tz={tz}
					value={value}
					title={title}
					dropClassName={dropClassName}
					className={className}
					disabledDate={disabledDate}
					onChange={(val: number) => {
						onChange?.(val);
					}}
				/>
			) : (
				<PcDatePicker
					locale={locale}
					tz={tz}
					value={value}
					dropClassName={dropClassName}
					className={className}
					disabledDate={disabledDate}
					onChange={(val: number) => {
						onChange?.(val);
					}}
				/>
			)}
		</>
	);
}
