import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './style.module.less';
import { useWindowResize, getPlacementPos, useClickInside, useTouchStartOutside } from '../utils';

type DropdownProps = {
	onVisibleChange?: (visible: boolean) => void;
	visible: boolean;
	children: React.ReactElement<any>;
} & DropdownConProps;

let wrap: HTMLDivElement;
export default function Dropdown(props: DropdownProps) {
	const { children, visible, onVisibleChange, ...otherProps } = props;
	const ref = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const child = React.cloneElement(children, { ref });

	if (!wrap) {
		wrap = document.createElement('div');
		document.body.appendChild(wrap);
	}

	useClickInside(
		ref,
		(e: any) => {
			onVisibleChange?.(!visible);
		},
		true,
	);

	useTouchStartOutside([ref, dropdownRef], (e: any) => {
		onVisibleChange?.(false);
	});

	return (
		<>
			{visible &&
				ReactDOM.createPortal(
					<DropdownCon domRef={ref} dropdownRef={dropdownRef} {...otherProps} />,
					wrap,
				)}
			{child}
		</>
	);
}

type DropdownConProps = {
	overlay: (ref: React.MutableRefObject<HTMLDivElement | null>) => React.ReactElement<any>;
	placement?: 'bottom' | 'right' | 'left' | 'top';
	placementDom?: HTMLDivElement;
	offset?: number;
	overlayClassName?: string;
	style?: React.CSSProperties;
};
type Style = {
	left: number;
	top: number;
};
type DropdownConP = DropdownConProps & {
	domRef: React.MutableRefObject<HTMLDivElement | null>;
	dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
};
function DropdownCon(props: DropdownConP) {
	const {
		domRef,
		overlay,
		placementDom,
		placement,
		offset,
		overlayClassName,
		style: propsStyle,
		dropdownRef,
	} = props;
	const [style, setStyle] = useState({} as Style);

	const { innerWidth } = useWindowResize();
	const stateIdRef = useRef(0);
	const [stateId, setStateId] = useState(0);

	useEffect(() => {
		const dom = placementDom || domRef.current;
		const place = placement || 'bottom';
		const localDom = dropdownRef.current;
		const localOffset = offset || 10;
		if (!dom || !localDom) {
			return;
		}
		const pos = getPlacementPos(place, dom, localDom, localOffset);

		setStyle({
			...pos,
		});
	}, [stateId, innerWidth]);

	useEffect(() => {
		if (!dropdownRef.current) {
			return;
		}
		const observer = new MutationObserver((mutations) => {
			setStateId(++stateIdRef.current);
		});
		observer.observe(dropdownRef.current, {
			attributes: true,
			childList: true,
		});
	}, [dropdownRef.current]);

	return (
		<div
			ref={dropdownRef}
			className={classnames('bit-dropdown', overlayClassName)}
			style={{ ...style, ...(propsStyle || {}) }}
		>
			{overlay(domRef)}
		</div>
	);
}
