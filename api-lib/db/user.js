import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export const findUserByEmail = async (db, email) => {
	email = normalizeEmail(email);
	return db
		.collection('users')
		.findOne(
			{ email },
			{
				projection: {
					password: 0,
				},
			}
		)
		.then((user) => user || null);
};

export const findUserByEmailAndPassword = async (db, email, password) => {
	email = normalizeEmail(email);
	const user = await db.collection('users').findOne({ email });
	if (!user) {
		return null;
	}
	//compare crypto hash
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (user && passwordMatch) {
		return {
			...user,
			password: undefined,
		}; //remove password from user obj
	}
	return null;
};

export const findUserNoPassword = async (db, userId) => {
	return db
		.collection('users')
		.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
		.then((user) => user || null);
};

export const findUserById = async (db, userId) => {
	return db
		.collection('users')
		.findOne(
			{ _id: new ObjectId(userId) },
			{
				projection: {
					password: 0,
				},
			}
		)
		.then((user) => user || null);
};

export const updateUserById = async (db, id, data) => {
	return db
		.collection('users')
		.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data }, { returnDocument: 'after', projection: { password: 0 } })
		.then(({ value }) => value);
};

export const insertUser = async (db, { email, originalPassword }) => {
	const user = {
		email,
	};
	const password = await bcrypt.hash(originalPassword, 10);
	const { insertedId } = await db.collection('users').insertOne({ ...user, password });
	user._id = insertedId;
	return user;
};

export const updateUserPassword = async (db, id, oldPassword, newPassword) => {
	const user = await db.collection('users').findOne(new ObjectId(id));
	if (!user) return false;
	const matched = await bcrypt.compare(oldPassword, user.password);
	if (!matched) return false;
	const password = await bcrypt.hash(newPassword, 10);
	await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { password } });
	return true;
};

export const forceUpdatePassword = async (db, id, newPassword) => {
	const password = await bcrypt.hash(newPassword, 10);
	await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { password } });
};
