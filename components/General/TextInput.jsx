import { mdiAlertCircleOutline, mdiCheck, mdiCheckBold } from '@mdi/js';
import Icon from '@mdi/react';
import { altIfUndefined, getValidationClass } from 'lib/utils';
import React, { useState } from 'react';

export const TextInput = React.forwardRef((props, ref) => {
	let { defaultValue, name, placeholder, type, readOnly, onKeyDown, className, onChange, title, style, validate, validationMsg } = props;
	const [innerValue, setInnerValue] = useState(defaultValue);

	if (readOnly === undefined) readOnly = false;

	const validationRes = validate ? validate(innerValue) : null;
	const validationClass = validate ? getValidationClass(validationRes) : '';

	return (
		<>
			<input
				ref={ref}
				onKeyDown={onKeyDown}
				type={altIfUndefined(type, 'text')}
				className={`${className ? className : ''} ${validationClass}`}
				readOnly={readOnly}
				defaultValue={defaultValue}
				name={name}
				style={{ ...(style ? style : {}) }}
				placeholder={altIfUndefined(placeholder, 'Text')}
				autoComplete='nope'
				spellCheck='false'
				title={title || 'Write text'}
				onChange={(e) => {
					setInnerValue(e.target.value);
					if (onChange) {
						onChange(e.target.value);
					}
				}}
			/>
			{validate && validationClass && validationMsg && (
				<span className={`${validationRes ? 'text-green' : 'text-red'} font-size-13 p-left-2 m-top-4`}>
					<Icon className='align-middle m-right-3' path={validationRes ? mdiCheck : mdiAlertCircleOutline} size={0.8} />
					<span className='align-middle'>{validationMsg(validationRes)}</span>
				</span>
			)}
		</>
	);
});
