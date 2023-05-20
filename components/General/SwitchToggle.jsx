import { useState } from 'react';

export const SwitchToggle = (props) => {
	const { id, defaultValue, onChange } = props;
	const [selected, setSelected] = useState(!!defaultValue);

	return (
		<div className='no-wrap'>
			<input
				className='toggle'
				checked={selected}
				onChange={(e) => {
					setSelected(e.target.checked);
					onChange(e.target.checked);
				}}
				id={id}
				type='checkbox'
			/>
			<label className='toggle-btn' htmlFor={id}></label>
			<div className={`d-in-bl align-middle m-left-10 font-size-16 ${selected ? 'text-blue font-weight-700' : 'text-red font-weight-600'}`}>
				{selected ? 'YES' : 'NO'}
			</div>
		</div>
	);
};
