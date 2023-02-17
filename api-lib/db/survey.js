import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export const findSurveysByUserId = async (db, user_id) => {
	return db
		.collection('surveys')
		.find(
			{ user_id }
		)
		.then((surveys) => surveys);
};
