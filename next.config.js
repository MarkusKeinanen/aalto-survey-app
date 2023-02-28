module.exports = {
	async rewrites() {
		return [
			{
				source: '/surveys/:surveyid',
				destination: '/surveys/:surveyid/editor',
			},
		];
	},
};
