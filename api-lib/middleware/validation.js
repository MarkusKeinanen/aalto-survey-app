import { isEmpty } from 'lib/utils';

export const isEmail = (str) => {
	if (isEmpty(str)) return false;
	return /\S+@\S+\.\S+/.test(str);
};

export const validateNewUser = async (req, res, next) => {
	let { email, password } = req.body;
	let errors = [];
	if (!isEmail(email)) {
		errors.push('The email must be in format name@domain.xxx.');
	}
	if (isEmpty(password) || password.length < 8) {
		errors.push('The password must be 8 characters or longer.');
	}
	if (errors.length > 0) {
		return res.status(422).json({
			error: {
				message: errors.map((msg) => msg).join(' '),
			},
		});
	}
	return next();
};
