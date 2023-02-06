import { useContext, useRef } from 'react';
import { Modal } from 'components/General/Modal';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { customAlphabet } from 'nanoid';
import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
const nanoid = customAlphabet('1234567890abcdef', 5);
import toast from 'react-hot-toast';

export const DeleteSurveyModal = ({ onClose }) => {
	const { app, forceRender } = useContext(AppContext);
	const state = app.surveysState;
	const ref = useRef();
	const router = useRouter();
	const { surveyid } = router.query;

	const deleteSurvey = () => {
		let surveys = window.localStorage.getItem('surveys');
		surveys = surveys ? JSON.parse(surveys) : {};
		delete surveys[surveyid];
		delete app.surveys[surveyid];
		window.localStorage.setItem('surveys', JSON.stringify(surveys));
		onClose();
		toast.success('The survey has been deleted');
		forceRender();
		router.push('/surveys');
	};

	return (
		<Modal
			onClose={onClose}
			style={{ width: '600px' }}
			title='Delete survey'
			body={
				<>
					<div className='m-bottom-3 m-left-2 font-weight-500'>Are you sure you want to delete this survey? This action is irreversible.</div>
				</>
			}
			footer={
				<>
					<button onClick={deleteSurvey} className='btn btn-red icon-btn m-left-5'>
						Yes, delete <Icon className='align-middle' path={mdiTrashCanOutline} size={0.9} />
					</button>
				</>
			}
		/>
	);
};
