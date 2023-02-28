import { findSurveyById } from 'api-lib/db/survey';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';
import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';

const app = nextConnect(ncOpts);

app.use(database);

app.get(async (req, res) => {
	const survey = await findSurveyById(req.db, req.query.surveyId);
	res.json({ survey });
});

export default app;
