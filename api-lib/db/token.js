import { nanoid } from 'nanoid';

export const findTokenByIdAndType = async (db, id, type) => {
	return db.collection('tokens').findOne({
		_id: id,
		type,
	});
};

export const findAndDeleteTokenByIdAndType = async (db, id, type) => {
	return db
		.collection('tokens')
		.findOneAndDelete({ _id: id, type })
		.then(({ value }) => value);
};

export const createToken = async (db, { creatorId, type, expireAt }) => {
	const generatedTokenId = nanoid(32);
	const token = {
		_id: generatedTokenId,
		creatorId,
		type,
		expireAt,
	};
	await db.collection('tokens').insertOne(token);
	return token;
};
