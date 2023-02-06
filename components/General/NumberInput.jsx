import { altIfUndefined } from 'lib/utils';
import React from 'react';

export const NumberInput = React.forwardRef((props, ref) => {
	let { defaultValue, name, placeholder, type, readOnly, onKeyDown, className, onChange, title, style } = props;

	if (readOnly === undefined) readOnly = false;

	return (
		<input
			ref={ref}
			onKeyDown={onKeyDown}
			type={altIfUndefined(type, 'number')}
			className={`${className ? className : ''}`}
			readOnly={readOnly}
			defaultValue={defaultValue}
			name={name}
			style={{ ...(style ? style : {}) }}
			placeholder={altIfUndefined(placeholder, '0')}
			autoComplete='nope'
			title={title || 'Enter number'}
			onChange={(e) => {
				if (onChange) {
					onChange(e.target.value);
				}
			}}
		/>
	);
});
