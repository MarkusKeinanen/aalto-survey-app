import { useContext, useRef, useState } from 'react';
import { Modal } from 'components/General/Modal';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { customAlphabet } from 'nanoid';
import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
const nanoid = customAlphabet('1234567890abcdef', 5);
import toast from 'react-hot-toast';
import { deleteSurvey } from 'lib/surveysApi';
import { Spinner } from 'components/General/Spinner';
import { isNew, sleep } from 'lib/utils';

export const DeleteSurveyModal = ({ onClose }) => {
	const { app, forceRender } = useContext(AppContext);
	const [deleting, setDeleting] = useState(false);
	const state = app.surveysState;
	const ref = useRef();
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys ? app.surveys[surveyid] : null;

	const onDeleteSurvey = async () => {
		const surveyName = survey.name;
		if (isNew(survey)) {
			setDeleting(true);
			delete app.surveys[surveyid];
			await sleep(200);
			forceRender();
			toast.success(`Survey "${surveyName}" was deleted.`);
			router.push('/surveys');
		} else {
			let res = await deleteSurvey(survey);
			if (res) {
				delete app.surveys[surveyid];
				forceRender();
				toast.success(`Survey "${surveyName}" was deleted.`);
				router.push('/surveys');
			}
		}
		setDeleting(false);
	};

	return (
		<Modal
			onClose={onClose}
			style={{ width: '600px' }}
			title='Delete survey'
			body={
				<>
					{deleting ? (
						<Spinner text='Deleting survey...' />
					) : (
						<div className='m-bottom-3 m-left-2 font-weight-500'>Are you sure you want to delete this survey? This action is irreversible.</div>
					)}
				</>
			}
			footer={
				<>
					<button onClick={onDeleteSurvey} className='btn btn-red icon-btn m-left-5'>
						Yes, delete <Icon className='align-middle' path={mdiTrashCanOutline} size={0.9} />
					</button>
				</>
			}
		/>
	);
};
