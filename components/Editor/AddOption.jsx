import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { getId, getLatestOrderId } from 'lib/utils';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';

export const AddOption = ({ question }) => {
	const { app, forceRender } = useContext(AppContext);

	return (
		<div className='d-in-bl m-top-10' style={{ marginLeft: '33px' }}>
			<button
				className='btn btn-white shadow-xs icon-btn m-right-5'
				onClick={() => {
					question.options.push({
						_id: getId(),
						text: '',
						orderId: getLatestOrderId(question.options) + 1,
					});
					forceRender();
				}}
			>
				Add option <Icon className='align-middle' path={mdiPlus} size={0.9} />
			</button>
		</div>
	);
};
