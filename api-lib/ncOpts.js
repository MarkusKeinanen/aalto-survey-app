export const ncOpts = {
	onError(err, req, res) {
		console.error({ err, req, res });
		if (err.status && err.status >= 100 && err.status < 600) {
			res.statusCode = err.status;
		} else {
			res.statusCode = 500;
		}
		res.json({ message: err.message });
	},
};
