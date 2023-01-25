import passport from 'passport';
import { findUserNoPassword, findUserByEmailAndPassword } from 'api-lib/db/user';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
	findUserNoPassword(req.db, id).then(
		(user) => done(null, user),
		(err) => done(err)
	);
});

passport.use(
	new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
		const user = await findUserByEmailAndPassword(req.db, email, password);
		if (user) done(null, user);
		//401 has no body, this message is only placeholder
		else done(null, false, { message: 'Wrong email or password' });
	})
);

export default passport;
