import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

export const useIfChanged = (value, func, skipFirstRun = true, cleanup) => {
	const previous = useRef(skipFirstRun ? value : null);

	useEffect(() => {
		if (!isEqual(value, previous.current)) {
			func(previous.current);
		}
		return () => {
			if (cleanup) cleanup();
		};
	});

	useEffect(() => {
		previous.current = value;
	});
};
