import React from 'react';
import loadingJson from '../../assets/ani/rocket1.json';
import loadingPng1 from '../../assets/ani/rocket1.png';
// import loadingPng2 from '../../assets/ani/exploding21.png';
import { FrameAni } from './frameAni';

export function FrameAniDemo() {
	return <FrameAni png={[loadingPng1]} json={loadingJson} interval={40} anchorX={0} anchorY={0} />;
}
