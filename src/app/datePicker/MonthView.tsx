import React, { useEffect, useState } from 'react';

import weekday from 'dayjs/plugin/weekday';
import dayjs from 'dayjs';
import classnames from 'classnames';
import style from './DatePicker.less';
import { daysToWeeksDays } from './datePickerUtils';

dayjs.extend(weekday);

type Item = {
	day: dayjs.Dayjs;
	inMonth: boolean;
};

type Props = {
	month: dayjs.Dayjs;
	onSelect: (date: dayjs.Dayjs) => void;
	selectDay: dayjs.Dayjs;
};
export function MonthView({ month, onSelect, selectDay }: Props) {
	const [days, setDays] = useState<Item[]>([]);

	useEffect(() => {
		if (!month) {
			return;
		}
		const all = 42;
		const mStart = month.startOf('month');
		const mEnd = month.endOf('month');
		const mStartWeekDay = mStart.weekday();
		const start = mStart.subtract(mStartWeekDay, 'day');
		const dayArr: Item[] = [];
		for (let i = 0; i < all; i++) {
			const dayItem = start.add(i, 'day');
			const inMonth = dayItem.valueOf() >= mStart.valueOf() && dayItem.valueOf() <= mEnd.valueOf();
			dayArr.push({
				day: dayItem,
				inMonth,
			});
		}
		setDays(dayArr);
	}, [month]);

	const weeksDays = daysToWeeksDays(days);
	return (
		<div className="inner">
			<div className="top">
				<div>日</div>
				<div>一</div>
				<div>二</div>
				<div>三</div>
				<div>四</div>
				<div>五</div>
				<div>六</div>
			</div>
			<div className="con">
				{weeksDays.map((weekDays, index) => {
					return (
						<div className="line" key={index}>
							{weekDays.map(({ day, inMonth }, index) => {
								let cur = false;
								if (selectDay) {
									if (selectDay.valueOf() - day.valueOf() < 24 * 60 * 60 * 1000) {
										cur = selectDay.format('YYMMDD') === day.format('YYMMDD');
									}
								}
								return (
									<div
										className={classnames({
											cell: true,
											inView: inMonth,
											cur,
										})}
										key={index}
										title={day.format('YYYY/MM/DD')}
										onClick={() => onSelect(day)}
									>
										<div className="in">{day.date()}</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
