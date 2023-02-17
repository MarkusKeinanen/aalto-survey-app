import { customAlphabet } from 'nanoid';
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
	return router.pathname.toLowerCase().includes('/surveys/preview');
};
export const pageIsEditor = (router) => {
	return router.pathname.toLowerCase().includes('/surveys/editor');
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
			if (obj[req] === undefined) {
				waiting = true;
				break;
			}
		}
	}
	return waiting;
};
