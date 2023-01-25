import MongoStore from 'connect-mongo';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';
import { getMongoClient } from './database';

const mongoStore = MongoStore.create({
	clientPromise: getMongoClient(),
	collectionName: 'sessions',
	stringify: false,
});

const getNextSession = nextSession({
	cookie: {
		path: '/',
		sameSite: 'strict',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks in milliseconds,
	},
	touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
	store: promisifyStore(mongoStore),
});

export default async function session(req, res, next) {
	await getNextSession(req, res);
	next();
}
