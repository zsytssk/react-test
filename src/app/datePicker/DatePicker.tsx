import React, { useEffect, useState } from 'react';

import weekday from 'dayjs/plugin/weekday';
import dayjs from 'dayjs';
import style from './DatePicker.less';
import { daysToWeeksDays } from './datePickerUtils';
import { MonthView } from './MonthView';

dayjs.extend(weekday);

type Item = {
	day: dayjs.Dayjs;
	inMonth: boolean;
};

export function DatePicker() {
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
		console.log(`test:>`, date.format('YYYY/MM/DD'));
	};
	return (
		<div className={style.datePicker}>
			<div className="header">
				<div className="supperPreBox" onClick={preYear}>
					<span className="icon"></span>
				</div>
				<div className="preBox" onClick={preMonth}>
					<span className="icon"></span>
				</div>
				<div className="inner">{month?.format('YYYY年 MM月')}</div>
				<div className="nextBox" onClick={nextMonth}>
					<span className="icon"></span>
				</div>
				<div className="supperNextBox" onClick={nextYear}>
					<span className="icon"></span>
				</div>
			</div>
			<div className="body">
				<MonthView month={month} onSelect={onSelect} selectDay={selectDay} />
			</div>
			<div className="footer">
				<div className="today" onClick={() => onSelect(dayjs())}>
					今天
				</div>
			</div>
		</div>
	);
}
