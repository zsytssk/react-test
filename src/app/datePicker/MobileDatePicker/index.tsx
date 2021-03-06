import React, { useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { Locale } from 'dayjs/locale/*';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(utc);

import SelectMobile from '@app/app/SelectMobile';

export type Props = {
	tz?: string;
	locale?: Locale;
	dropClassName?: string;
	className?: string;
	onChange?: (value: number) => void;
	disabledDate?: (current: number) => boolean;
	value?: number;
	title: string;
};

type Item = {
	label: string | number;
	value: dayjs.Dayjs;
};

export let dayNow = dayjs();
export default function DatePicker({
	value,
	className,
	dropClassName,
	disabledDate,
	onChange,
	tz,
	title,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [visible, setVisible] = useState(true);
	const [years, setYears] = useState<Item[]>([]);
	const [months, setMonths] = useState<Item[]>([]);
	const [days, setDays] = useState<Item[]>([]);
	const [year, setYear] = useState<dayjs.Dayjs>();
	const [month, setMonth] = useState<dayjs.Dayjs>();
	const [day, setDay] = useState<dayjs.Dayjs>();

	console.log(`test:>`, tz);
	useEffect(() => {
		if (!visible) {
			return;
		}
		dayNow = dayjs.tz(dayNow, tz);
		setYear(dayNow.startOf('year'));
		setMonth(dayNow.startOf('month'));
		setDay(dayNow.startOf('day'));
	}, [value, tz, visible]);

	useEffect(() => {
		const yearStart = dayNow.startOf('year');
		const years: Item[] = [];
		years.push({
			label: yearStart.year(),
			value: yearStart,
		});
		for (let i = 1; i <= 10; i++) {
			const item = yearStart.subtract(i, 'year');
			years.unshift({
				label: item.year(),
				value: item,
			});
		}
		for (let i = 1; i <= 10; i++) {
			const item = yearStart.add(i, 'year');
			years.push({
				label: item.year(),
				value: item,
			});
		}
		const months: Item[] = [];
		for (let i = 0; i < 12; i++) {
			const item = yearStart.add(i, 'month');
			months.push({
				label: item.month() + 1,
				value: item,
			});
		}

		setYears(years);
		setMonths(months);
	}, []);

	useEffect(() => {
		if (!month) {
			return;
		}
		const daysInMonth = month.daysInMonth();
		const mStart = month.startOf('month');
		const dayArr: Item[] = [];
		for (let i = 0; i < daysInMonth; i++) {
			const dayItem = mStart.add(i, 'day');
			if (disabledDate) {
				if (disabledDate?.(dayItem.valueOf())) {
					continue;
				}
			}
			dayArr.push({
				label: dayItem.date(),
				value: dayItem,
			});
		}
		setDays(dayArr);
	}, [month]);

	return (
		<>
			<SelectMobile<dayjs.Dayjs>
				className={classnames(dropClassName)}
				visible={visible}
				onClose={() => setVisible(false)}
				title={title || 'Select Date'}
				mulData={[years, months, days]}
				mulValue={[year, month, day]}
				isEqual={(item, value) => {
					return item.isSame(value);
				}}
				onMultiUpdate={(val: dayjs.Dayjs, index: number) => {
					if (index === 0) {
						setYear(val);
					} else if (index === 1) {
						setMonth(val);
					} else if (index === 2) {
						setDay(val);
					}
				}}
				onMultiChange={(val: dayjs.Dayjs[]) => {
					onChange(val[2].valueOf());
				}}
			/>
			<div className={classnames(className)}>
				<input
					ref={inputRef}
					type="text"
					value={value ? dayjs.tz(value, tz).format('YYYY/MM/DD') : ''}
					onFocus={() => setVisible(true)}
				/>
			</div>
		</>
	);
}
