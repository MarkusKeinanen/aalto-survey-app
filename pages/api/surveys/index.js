import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';
import { deleteSurveyById, findSurveysByUserId, insertSurvey, updateSurvey } from 'api-lib/db/survey';

const app = nextConnect(ncOpts);

app.use(database);

app.get(...auths, async (req, res) => {
	const surveys = await findSurveysByUserId(req.db, req.user._id);
	return res.status(200).json({ surveys });
});

app.put(...auths, async (req, res) => {
	let { survey } = req.body;
	const updatedSurvey = await updateSurvey(req.db, {
		survey,
	});
	res.status(200).json({ survey: updatedSurvey });
});

app.post(...auths, async (req, res) => {
	let { survey } = req.body;
	const insertedSurvey = await insertSurvey(req.db, req.user._id, {
		survey,
	});
	res.status(201).json({ survey: insertedSurvey });
});

app.delete(...auths, async (req, res) => {
	let { survey } = req.body;
	const deletedSurvey = await deleteSurveyById(req.db, survey._id);
	res.status(200).json({ survey: deletedSurvey });
});

export default app;
