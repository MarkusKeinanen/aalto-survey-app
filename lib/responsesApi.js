import { request } from './api';

export const fetchResponses = async (survey_id) => {
	return await request({
		method: 'GET',
		url: '/api/responses/' + survey_id,
	});
};

export const createResponse = async (response) => {
	return await request({
		method: 'POST',
		url: '/api/responses',
		body: {
			response,
		},
	});
};
