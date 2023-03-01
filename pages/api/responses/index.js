import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';
import { insertResponse } from 'api-lib/db/response';

const app = nextConnect(ncOpts);

app.use(database);

app.post(...auths, async (req, res) => {
	let { response } = req.body;
	const insertedResponse = await insertResponse(req.db, {
		response,
	});
	res.status(201).json({ response: insertedResponse });
});

export default app;
