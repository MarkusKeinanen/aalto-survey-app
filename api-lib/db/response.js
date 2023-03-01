import cloneDeep from 'lodash/cloneDeep';
import { ObjectId } from 'mongodb';

export const findResponsesBySurveyId = async (db, survey_id) => {
	const res = await db
		.collection('responses')
		.aggregate([
			{
				$match: {
					survey_id: new ObjectId(survey_id),
				},
			},
			{ $sort: { createdAt: -1 } },
		])
		.toArray();
	return res;
};

export const insertResponse = async (db, { response }) => {
	let responseBody = {
		values: response.values,
		survey_id: new ObjectId(response.survey_id),
		createdAt: new Date().toISOString(),
	};
	for (const key in responseBody.values) {
		for (const item of responseBody.values[key]) {
			if (item._id.length < 10) {
				delete item._id;
				item._id = new ObjectId();
			} else {
				item._id = new ObjectId(q._id);
			}
		}
	}

	const { insertedId } = await db.collection('responses').insertOne(responseBody);
	responseBody._id = insertedId;
	return responseBody;
};
