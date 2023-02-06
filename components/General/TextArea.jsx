import { altIfUndefined } from 'lib/utils';
import React from 'react';

export const TextArea = React.forwardRef((props, ref) => {
	let { defaultValue, name, placeholder, readOnly, onKeyDown, className, onChange, title, style } = props;

	if (readOnly === undefined) readOnly = false;

	return (
		<textarea
			ref={ref}
			onKeyDown={onKeyDown}
			className={`${className ? className : ''}`}
			readOnly={readOnly}
			defaultValue={defaultValue}
			name={name}
			style={{ ...(style ? style : {}) }}
			placeholder={altIfUndefined(placeholder, 'Text')}
			autoComplete='nope'
			title={title || 'Write text'}
			onChange={(e) => {
				if (onChange) {
					onChange(e.target.value);
				}
			}}
		/>
	);
});
