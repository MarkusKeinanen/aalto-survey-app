import cloneDeep from 'lodash/cloneDeep';
import { ObjectId } from 'mongodb';

const surveyFields = ['name', 'questions', 'backgroundColor', 'active'];

export const findSurveyById = async (db, _id) => {
	const res = await db.collection('surveys').findOne({ _id: ObjectId(_id) });
	return res;
};

export const findSurveysByUserId = async (db, user_id) => {
	const res = await db
		.collection('surveys')
		.aggregate([
			{
				$match: {
					user_id: new ObjectId(user_id),
				},
			},
			{ $sort: { createdAt: -1 } },
		])
		.toArray();
	return res;
};

export const insertSurvey = async (db, user_id, { survey }) => {
	let surveyBody = {};
	for (const key of surveyFields) {
		surveyBody[key] = survey[key];
	}
	surveyBody.user_id = new ObjectId(user_id);
	surveyBody.createdAt = new Date().toISOString();
	surveyBody = ensureProperQuestionIds(surveyBody);

	const { insertedId } = await db.collection('surveys').insertOne(surveyBody);
	surveyBody._id = insertedId;
	return surveyBody;
};

export const updateSurvey = async (db, { survey }) => {
	let updateBody = {};
	for (const key of surveyFields) {
		updateBody[key] = survey[key];
	}
	updateBody = ensureProperQuestionIds(updateBody);
	updateBody.updatedAt = new Date().toISOString();

	const { upsertedId } = await db.collection('surveys').updateOne(
		{ _id: ObjectId(survey._id) },
		{
			$set: updateBody,
		}
	);
	const result = {
		_id: upsertedId,
		...survey,
		...updateBody,
	};
	return result;
};

export const deleteSurveyById = async (db, id) => {
	const deletedSurvey = await db.collection('surveys').findOneAndDelete({ _id: ObjectId(id) });
	return deletedSurvey?.value || null;
};

export const ensureProperQuestionIds = (obj) => {
	const currentQuestions = cloneDeep(obj.questions);
	for (const qid in currentQuestions) {
		const q = currentQuestions[qid];
		if (q._id.length < 10) {
			delete q._id;
			q._id = new ObjectId();
		} else {
			q._id = new ObjectId(q._id);
		}
		if (q.options) {
			for (const o of q.options) {
				if (o._id.length < 10) {
					delete o._id;
					o._id = new ObjectId();
				} else {
					o._id = new ObjectId(o._id);
				}
			}
		}
		delete obj.questions[qid];
		obj.questions[q._id] = q;
	}
	return obj;
};
