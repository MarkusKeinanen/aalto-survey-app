import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 5);

export const isEmpty = (value) => {
	if (value === undefined || value === null) return true;
	if (value.toString().trim() === '') return true;
	return false;
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
