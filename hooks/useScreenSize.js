import { measureWindow } from 'lib/utils';
import { useEffect, useRef } from 'react';
import { useOnMount } from 'hooks/useOnMount';

export const useScreenSize = ({ app, forceRender }) => {
	const resizeRef = useRef();

	useEffect(() => {
		if (!app.screen) {
			app.screen = measureWindow();
		}
		if (!app.contentDimensions) {
			const contentMeasures = measureContent();
			app.contentDimensions = {
				width: contentMeasures[0],
				height: contentMeasures[1],
			};
		}
	});

	useOnMount(() => {
		window.addEventListener('resize', function () {
			if (resizeRef.current) {
				clearTimeout(resizeRef.current);
			}
			resizeRef.current = setTimeout(() => {
				app.screen = measureWindow();
				const contentMeasures = measureContent();
				app.contentDimensions = {
					width: contentMeasures[0],
					height: contentMeasures[1],
				};
				forceRender();
			}, 100);
		});
	});
};

const measureContent = () => {
	let elem = document.getElementById('page');
	if (elem) {
		return [elem.offsetWidth, elem.offsetHeight];
	}
	return [null, null];
};
