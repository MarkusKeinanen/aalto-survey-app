import React from 'react';

export const CheckboxInput = React.forwardRef((props, ref) => {
	let { type, defaultValue, name, readOnly, onKeyDown, className, onChange, title, style } = props;

	if (readOnly === undefined) readOnly = false;

	return (
		<input
			ref={ref}
			onKeyDown={onKeyDown}
			type={type || 'checkbox'}
			className={`${className ? className : ''}`}
			readOnly={readOnly}
			defaultChecked={!!defaultValue}
			name={name}
			style={{ ...(style ? style : {}) }}
			autoComplete='nope'
			title={title || 'Select option'}
			onChange={(e) => {
				if (onChange) {
					onChange(e.target.value);
				}
			}}
		/>
	);
});
