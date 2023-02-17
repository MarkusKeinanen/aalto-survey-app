import toast from 'react-hot-toast';

export const defaultHeaders = {
	headers: { 'Content-Type': 'application/json' },
};

export const request = async ({ url, method, body, noErrorMessage }) => {
	try {
		const response = await fetch(url, {
			method,
			...defaultHeaders,
			body: body ? JSON.stringify(body) : undefined,
		});

		if (response.status == 500) {
			toast.error('An error has occurred.');
			return null;
		}
		const json = await response.json();

		if (json.error) {
			toast.error(json.error.message);
			return null;
		}

		return json;
	} catch (ex) {
		console.log(ex);
		if (noErrorMessage !== true) {
			toast.error('An error occurred during request.');
		}
		return null;
	} finally {
	}
};
