import { MongoClient } from 'mongodb';

global.mongo = global.mongo || {};

let indexesCreated = false;
const createIndexes = async (db) => {
	await Promise.all([
		db.collection('tokens').createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
		db.collection('users').createIndexes([
			{ key: { email: 1 }, unique: true },
			{ key: { username: 1 }, unique: true },
		]),
	]);
	indexesCreated = true;
};

export const getMongoClient = async () => {
	if (!global.mongo.client) {
		global.mongo.client = new MongoClient(process.env.MONGODB_URI);
	}
	await global.mongo.client.connect();
	return global.mongo.client;
};

export const database = async (req, res, next) => {
	if (!global.mongo.client) {
		global.mongo.client = new MongoClient(process.env.MONGODB_URI);
	}
	req.dbClient = await getMongoClient();
	//initialized here
	req.db = req.dbClient.db();
	if (!indexesCreated) {
		await createIndexes(req.db);
		console.log('DB initialized');
	}
	return next();
};
