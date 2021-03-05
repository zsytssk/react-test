import React, { useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { Locale } from 'dayjs/locale/*';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs.extend(weekday);

import style from './DatePicker.less';
import { MonthView } from './MonthView';

type Props = {
	locale?: Locale;
	className?: string;
	onChange?: (value: number) => void;
	disabledDate?: (current: number) => boolean;
};
export const dayInstance = dayjs();
export function DatePicker({ className, disabledDate, onChange, locale }: Props) {
	const [month, setMonth] = useState<dayjs.Dayjs>();
	const [selectDay, setSelectDay] = useState<dayjs.Dayjs>();

	useEffect(() => {
		setMonth(dayjs());
	}, []);

	const preMonth = () => {
		setMonth(month.subtract(1, 'month'));
	};
	const nextMonth = () => {
		setMonth(month.add(1, 'month'));
	};
	const preYear = () => {
		setMonth(month.subtract(1, 'year'));
	};
	const nextYear = () => {
		setMonth(month.add(1, 'year'));
	};
	const onSelect = (date: dayjs.Dayjs) => {
		setSelectDay(date);
		onChange?.(date.valueOf());
	};
	return (
		<div className={classnames(style.datePicker, className)}>
			<div className="header">
				<div className="supperPreBox" onClick={preYear}>
					<span className="icon"></span>
				</div>
				<div className="preBox" onClick={preMonth}>
					<span className="icon"></span>
				</div>
				<div className="inner">{month?.format('YYYY/MM')}</div>
				<div className="nextBox" onClick={nextMonth}>
					<span className="icon"></span>
				</div>
				<div className="supperNextBox" onClick={nextYear}>
					<span className="icon"></span>
				</div>
			</div>
			<div className="body">
				<MonthView
					locale={locale}
					disabledDate={disabledDate}
					month={month}
					onSelect={onSelect}
					selectDay={selectDay}
				/>
			</div>
			<div className="footer">
				<div className="today" onClick={() => onSelect(dayInstance)}>
					{dayInstance.format(`YYYY/MM/DD`)}
				</div>
			</div>
		</div>
	);
}
