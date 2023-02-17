import { fetchSurveys } from 'lib/surveysApi';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';
import { useIfChanged } from './useIfChanged';

export const useAppStorage = (requiredFields) => {
	const { app, forceRender } = useContext(AppContext);

	const fetchFn = async (key) => {
		if (key === 'Surveys') {
			const res = await fetchSurveys();
			if (res) app.Surveys = res;
		}
	};

	useIfChanged(
		requiredFields,
		async () => {
			const promises = requiredFields.map((key) => {
				return fetchFn(key);
			});
			await Promise.all(promises);
			forceRender();
		},
		false
	);
};
