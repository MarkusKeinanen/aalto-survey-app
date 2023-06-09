import passport from 'api-lib/middleware/passport';
import { auths } from 'api-lib/middleware/auths';
import { database } from 'api-lib/middleware/database';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnect from 'next-connect';

const app = nextConnect(ncOpts);

app.use(database, ...auths);

app.get(...auths, async (req, res) => {
	return res.status(200).json({ user: req.user });
});

app.post(passport.authenticate('local'), (req, res) => {
	if (!req.user) {
		res.status(401).end();
		return;
	}
	res.json({ user: req.user });
});

app.delete(async (req, res) => {
	await req.session.destroy();
	res.status(200).json({ text: 'Successfully logged out', user: req.user });
});

export default app;
