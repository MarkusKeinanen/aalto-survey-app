import { useContext, useRef } from 'react';
import { Modal } from 'components/General/Modal';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { getId, getRandomPastelColor, isEmpty, validateMinLength } from 'lib/utils';
import toast from 'react-hot-toast';
import { useOnMount } from 'hooks/useOnMount';

export const NewSurveyModal = ({ onClose }) => {
	const { app, forceRender } = useContext(AppContext);
	const state = app.surveysState;
	const ref = useRef();
	const router = useRouter();
	const allowValidation = useRef(false);

	const createNewSurvey = () => {
		allowValidation.current = true;
		if (
			!validateMinLength({
				value: state.newSurveyName,
				minLength: 3,
			})
		) {
			forceRender();
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
		state.newSurveyName = null;
		router.push(`/surveys/editor/${newId}`);
	};

	useOnMount(() => {
		ref.current?.focus();
	});

	return (
		<Modal
			onClose={onClose}
			style={{ width: '600px' }}
			title='Create new survey'
			body={
				<>
					<div className='m-bottom-3 m-left-2 font-weight-500'>
						Name of the survey <span className='req-star'>*</span>
					</div>
					<TextInput
						ref={ref}
						defaultValue={state.newSurveyName}
						validate={(val) =>
							validateMinLength({
								value: val,
								minLength: 3,
								allowValidation: allowValidation.current,
							})
						}
						validationMsg={(bool) => {
							return bool === true ? 'This value is OK' : 'The name must be 3 or more characters long';
						}}
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
