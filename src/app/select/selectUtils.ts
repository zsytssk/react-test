export function getEventPosInDom(dom: HTMLElement, event: TouchEvent): { x: number; y: number } {
	var myLocation = event.changedTouches[0];
	// const br = dom.getBoundingClientRect();
	const pos = {
		x: myLocation.clientX,
		y: myLocation.clientY,
	};
	// const pos = {
	// 	x: myLocation.clientX - br.left,
	// 	y: myLocation.clientY - br.top,
	// };
	return pos;
}
