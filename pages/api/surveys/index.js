import { validateNewUser } from 'api-lib/middleware/validation';
import { findUserByEmail, insertUser } from 'api-lib/db/user';
import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { findSurveysByUserId } from 'api-lib/db/survey';

const app = nextConnect(ncOpts);

app.use(database);

app.get(...auths, async (req, res) => {
	const surveys = await findSurveysByUserId(req.db, req.user._id);
	return res.status(200).json({ surveys });
});

app.post(...auths, async (req, res) => {
	let { email, password } = req.body;
	email = req.body.email = normalizeEmail(req.body.email);
	const existingEmail = await findUserByEmail(req.db, email);
	if (existingEmail) {
		res.status(422).json({ error: { message: 'There is already an account with this email address.' } });
		return;
	}
	const user = await insertUser(req.db, {
		email,
		originalPassword: password,
	});
	res.status(201).json({ user });
});

export default app;
