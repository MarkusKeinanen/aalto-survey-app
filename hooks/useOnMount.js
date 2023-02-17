import { useEffect, useRef } from 'react';

export const useOnMount = (fn) => {
	const counter = useRef(0);
	useEffect(() => {
		if (counter.current === 0) {
			fn();
			counter.current++;
		}
	});
};
