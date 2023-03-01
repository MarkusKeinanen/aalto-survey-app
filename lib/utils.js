import isArray from 'lodash/isArray';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import { QUESTION_TYPE } from './enums';
import format from 'date-fns/format';
const nanoid = customAlphabet('1234567890abcdef', 5);

export const isEmpty = (value) => {
	if (value === undefined || value === null) return true;
	if (value.toString().trim() === '') return true;
	return false;
};
export const isNullOrUndefined = (value) => {
	return value === null || value === undefined;
};
export const altIfUndefined = (value, alt) => {
	if (value === undefined) return alt;
	return value;
};
export function pad(str, length, char) {
	str = str.toString();
	while (str.length < length) str = str + char;
	return str;
}
export const getId = () => {
	return nanoid();
};

export const getRandomPastelColor = () => {
	let hue = Math.floor(Math.random() * 360);
	return 'hsl(' + hue + ', 100%, 93%)';
};

export const pageIsPreview = (router) => {
	return router.pathname.toLowerCase().includes('/surveys/[surveyid]/preview');
};
export const pageIsEditor = (router) => {
	return router.pathname.toLowerCase().includes('/surveys/[surveyid]/editor');
};

export const validateMinLength = (props) => {
	let { value, minLength, allowValidation } = props;
	if (minLength === undefined) minLength = 3;
	if (allowValidation === undefined) allowValidation = true;
	if (isNullOrUndefined(value)) {
		return null;
	}
	if (!allowValidation) return null;
	if (!value || value.toString().length < minLength) {
		return false;
	}
	return true;
};

export const getValidationClass = (booleanValue) => {
	if (isNullOrUndefined(booleanValue)) return '';
	return booleanValue ? 'validation-success' : 'validation-error';
};

export const stripStartAndEndSlashes = (str) => {
	let stripped = str;
	if (stripped.startsWith('/')) {
		stripped = stripped.slice(1);
	}
	if (stripped.endsWith('/')) {
		stripped = stripped.slice(0, -1);
	}
	return stripped;
};

export const waitingForData = (obj, required) => {
	let waiting = false;
	if (obj && required) {
		for (const req of required) {
			if (isNullOrUndefined(obj[req])) {
				waiting = true;
				break;
			}
		}
	}
	return waiting;
};

export const measureWindow = () => {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return {
		height,
		width,
	};
};

export const getLatestOrderId = (data) => {
	let max = 0;
	if (isArray(data)) {
		for (const elem of data) {
			if (parseInt(elem.orderId) > max) {
				max = parseInt(elem.orderId);
			}
		}
	} else {
		for (const key in data) {
			const elem = data[key];
			if (parseInt(elem.orderId) > max) {
				max = parseInt(elem.orderId);
			}
		}
	}
	return max;
};

export const sleep = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};

export const isNew = (obj) => {
	return obj._id?.toString().length < 10;
};

export const parseEndpoint = (url) => {
	if (!url) return '';
	url = stripStartAndEndSlashes(url);
	let arr = url.split('/');
	return arr[arr.length - 1];
};

function fallbackCopyTextToClipboard(text) {
	try {
		var textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand('copy');
		} catch (err) {}
		document.body.removeChild(textArea);
	} catch (ex) {}
}
export const copyTextToClipboard = (text) => {
	if (isEmpty(text)) text = '';
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text);
	toast.success('Text copied to clipboard');
};

export const addResponseValue = ({
	survey, value, question, option
}) => {
	survey.responses = survey.responses || {}
	survey.responses[question._id] = survey?.responses[question._id] || []
	const isMultiChoice = question.type == QUESTION_TYPE.MULTIPLE_CHOICE
	let responses = survey?.responses[question._id]
	let existingResponse = null
	if (isMultiChoice && responses.length > 0) {
		existingResponse = responses.find((r) => r.option_id == option._id) || null
	} else {
		existingResponse = responses.length > 0 ? responses[0] : null
	} 
	if (existingResponse) {
		existingResponse.value = value
	} else {
		let responseBody = {
			_id: getId(),
			question_id: question._id,
			option_id: option?._id || null,
			option_text: option?.text || null,
			text: question.text,
			orderId: question.orderId,
			type: question.type,
			value: value
		}
		if (isMultiChoice) {
			survey?.responses[question._id] = survey?.responses[question._id] || []
			survey?.responses[question._id].push(responseBody)
		} else {
			survey?.responses[question._id] = [responseBody]
		}
	}
}

export const formatDateTime = (date, dashIfEmpty = true) => {
	return isEmpty(date)
		? `${dashIfEmpty ? '-' : ''}`
		: format(new Date(date), 'dd.LL.yyyy') + ', ' + new Date(date).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
};
