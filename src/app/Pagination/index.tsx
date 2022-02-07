import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';

import './style.module.less';

type Range = [number, number];
export type Props = {
	current?: number;
	pageSize?: number;
	total: number;
	onChange: (page: number, pageSize: number) => void;
};

export type PaginationItem = 'prev' | 'next' | 'jumpPrev' | 'jumpNext' | number;
const showPageNum = 4;
export function Pagination({ total, pageSize = 10, current = 0 }: Props) {
	const [localCurrent, setLocalCurrent] = useState(current);

	const [pageTotal, pages] = useMemo(() => {
		const pageTotal = Math.ceil(total / pageSize);
		const startSpace = Math.ceil((showPageNum - 1) / 2);
		let paginationRangeStart = localCurrent - startSpace;
		if (paginationRangeStart < 0) {
			paginationRangeStart = 0;
		}

		let paginationRangeEnd = paginationRangeStart + showPageNum;
		if (paginationRangeEnd > pageTotal) {
			paginationRangeEnd = pageTotal;
			paginationRangeStart = paginationRangeEnd - showPageNum;
			if (paginationRangeStart < 0) {
				paginationRangeStart = 0;
			}
		}
		const paginationRange: Range = [paginationRangeStart, paginationRangeEnd];
		const hasLeftSpread = paginationRangeStart > 1;
		const hasRightSpread = paginationRangeEnd < pageTotal - 1;

		const paginationArr: PaginationItem[] = [];
		if (paginationRange[0] > 0) {
			paginationArr.push(0);
		}
		if (hasLeftSpread) {
			paginationArr.push('jumpPrev');
		}
		if (paginationRange) {
			for (let i = paginationRange[0]; i < paginationRange[1]; i++) {
				paginationArr.push(i);
			}
		}
		if (hasRightSpread) {
			paginationArr.push('jumpNext');
		}
		if (paginationRange[1] < pageTotal) {
			paginationArr.push(pageTotal - 1);
		}
		if (paginationArr.length > 0) {
			paginationArr.unshift('prev');
			paginationArr.push('next');
		}
		return [pageTotal, paginationArr];
	}, [total, pageSize, localCurrent]);

	const jumpTo = useCallback((next: number) => {
		setLocalCurrent(next);
	}, []);

	const jumpChange = useCallback(
		(change: number) => {
			let next = localCurrent + change;
			if (next < 0) {
				next = 0;
			} else if (next > pageTotal - 1) {
				next = pageTotal - 1;
			}
			setLocalCurrent(next);
		},
		[localCurrent],
	);

	const renderItem = (item: PaginationItem) => {
		switch (item) {
			case 'prev':
				return 'prev';
			case 'jumpPrev':
				return '...';
			case 'next':
				return 'next';
			case 'jumpNext':
				return '...';
			default:
				return item + 1;
		}
	};

	return (
		<div className="btPagination">
			{pages.map((item) => {
				return (
					<div
						className={classnames({ item: true, cur: item === localCurrent })}
						key={item}
						onClick={() => {
							switch (item) {
								case 'prev':
									jumpChange(-1);
									break;
								case 'jumpPrev':
									jumpChange(-showPageNum);
									break;
								case 'next':
									jumpChange(1);
									break;
								case 'jumpNext':
									jumpChange(showPageNum);
									break;
								default:
									jumpTo(item);
									break;
							}
						}}
					>
						{renderItem(item)}
					</div>
				);
			})}
		</div>
	);
}
