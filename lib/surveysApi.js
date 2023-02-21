import { request } from './api';

export const fetchSurveys = async () => {
	return await request({
		method: 'GET',
		url: '/api/surveys',
	});
};

export const createSurvey = async (survey) => {
	return await request({
		method: 'POST',
		url: '/api/surveys',
		body: {
			survey,
		},
	});
};

export const saveSurvey = async (survey) => {
	return await request({
		method: 'PUT',
		url: '/api/surveys',
		body: {
			survey,
		},
	});
};

export const deleteSurvey = async (survey) => {
	return await request({
		method: 'DELETE',
		url: '/api/surveys',
		body: {
			survey,
		},
	});
};
