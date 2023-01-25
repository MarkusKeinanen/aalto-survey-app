import { ValidateProps } from 'api-lib/constants';
import { updateUserPasswordByOldPassword } from 'api-lib/db';
import { auths, database, validateBody } from 'api-lib/middlewares';
import { ncOpts } from 'api-lib/ncOpts';
import nextConnext from 'next-connect';

const app = nextConnext(ncOpts);

app.use(database, ...auths);

app.put(
	validateBody({
		type: 'object',
		properties: {
			oldPassword: ValidateProps.user.password,
			newPassword: ValidateProps.user.password,
		},
		required: ['oldPassword', 'newPassword'],
		additionalProperties: false,
	}),
	async (req, res) => {
		if (!req.user) {
			res.json(401).end();
			return;
		}
		const { oldPassword, newPassword } = req.body;

		const success = await updateUserPasswordByOldPassword(req.db, req.user._id, oldPassword, newPassword);

		if (!success) {
			res.status(401).json({
				error: { message: 'The old password you entered is incorrect.' },
			});
			return;
		}

		res.status(204).end();
	}
);

export default app;
