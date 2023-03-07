import { findUserById } from 'api-lib/db/user';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';

const app = nextConnect(ncOpts);

app.use(database);

app.get(async (req, res) => {
	const user = await findUserById(req.db, req.query.userId);
	res.json({ user });
});

export default app;
