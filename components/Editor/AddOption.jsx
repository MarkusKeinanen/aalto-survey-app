import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

export const AddOption = ({ question }) => {
	return (
		<div className='d-in-bl m-top-10' style={{ marginLeft: '33px' }}>
			<button
				className='btn btn-white shadow-xs icon-btn m-right-5'
				onClick={() => {
					question.options.push({
						id: getId(),
						text: 'New option',
						orderId: question.options.length,
					});
					forceRender();
				}}
			>
				Add option <Icon className='align-middle' path={mdiPlus} size={0.9} />
			</button>
		</div>
	);
};
