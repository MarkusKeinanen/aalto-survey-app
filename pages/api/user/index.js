import { Validation } from 'api-lib/validation';
import { findUserByUsername, updateUserById } from 'api-lib/db/user';
import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnext from 'next-connect';

const app = nextConnext(ncOpts);

app.use(database, ...auths);

app.get(async (req, res) => {
	if (!req.user) return res.json({ user: null });
	return res.json({ user: req.user });
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default app;
