import { request } from './api';

export const fetchSurveys = async () => {
	return await request({
		method: 'GET',
		url: '/api/surveys/',
	});
};
