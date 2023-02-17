import { useEffect, useState } from 'react';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

export const Modal = ({ title, body, footer, style, onClose }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<div className={`modal-container center-center-container ${visible ? 'opacity-1' : 'opacity-0'}`}>
			<div className='modal shadow-sm' style={{ ...(style ? style : {}) }}>
				<div className='close-btn animate-colors-75-ms' onClick={onClose}>
					<Icon path={mdiClose} size={1.4} />
				</div>
				<div className='modal-title'>{title}</div>
				<div className='modal-body'>{body}</div>
				<div className='modal-footer'>
					<button className='btn btn-white' onClick={onClose}>
						Close
					</button>
					{footer}
				</div>
			</div>
		</div>
	);
};
