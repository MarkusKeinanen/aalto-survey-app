import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';
import { findResponsesBySurveyId } from 'api-lib/db/response';

const app = nextConnect(ncOpts);

app.use(database);

app.get(...auths, async (req, res) => {
	const responses = await findResponsesBySurveyId(req.db, req.query.surveyId);
	return res.status(200).json({ responses });
});

export default app;
