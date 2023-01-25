import passport from 'api-lib/middleware/passport';
import session from 'api-lib/middleware/session';

//session adds session to req.session
//passport.initialize only runs if not initiated
//passport.session() runs serialze/deserialize

export const auths = [session, passport.initialize(), passport.session()];
