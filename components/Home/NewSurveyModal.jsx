import { useContext, useRef } from 'react';
import { Modal } from 'components/General/Modal';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { getId, getRandomPastelColor, isEmpty } from 'lib/utils';
import toast from 'react-hot-toast';

export const NewSurveyModal = ({ onClose }) => {
	const { app, forceRender } = useContext(AppContext);
	const state = app.surveysState;
	const ref = useRef();
	const router = useRouter();

	const createNewSurvey = () => {
		if (isEmpty(state.newSurveyName)) {
			toast.error('The survey name must not be empty');
			return;
		}
		let newId = getId();
		app.surveys[newId] = {
			id: newId,
			isNew: true,
			name: state.newSurveyName,
			questions: {},
			backgroundColor: getRandomPastelColor(),
		};
		onClose();
		state.newSurveyName = '';
		router.push(`/surveys/editor/${newId}`);
	};

	return (
		<Modal
			onClose={onClose}
			style={{ width: '600px' }}
			title='Create new survey'
			body={
				<>
					<div className='m-bottom-3 m-left-2 font-weight-500'>Name of the survey</div>
					<TextInput
						ref={ref}
						defaultValue={state.newSurveyName}
						onChange={(val) => {
							state.newSurveyName = val;
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								createNewSurvey();
							}
						}}
						placeholder='Write name here...'
					/>
				</>
			}
			footer={
				<>
					<button onClick={createNewSurvey} className='btn btn-blue m-left-5'>
						Continue
					</button>
				</>
			}
		/>
	);
};
