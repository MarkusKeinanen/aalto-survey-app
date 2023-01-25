export const isEmpty = (value) => {
	if (value === undefined || value === null) return true;
	if (value.toString().trim() === '') return true;
	return false;
};
export const altIfUndefined = (value, alt) => {
	if (value === undefined) return alt;
	return value;
};
