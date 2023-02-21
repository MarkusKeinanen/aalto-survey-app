import { useState, useContext } from 'react';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import Link from 'next/link';
import { Modal } from 'components/General/Modal';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { NewSurveyModal } from './NewSurveyModal';

export const SurveyList = () => {
	const { app, forceRender } = useContext(AppContext);
	const [showNameModal, setShowNameModal] = useState(false);
	const router = useRouter();

	return (
		<div className='m-top-40 text-center d-in-bl' style={{ maxWidth: '900px' }}>
			{showNameModal && <NewSurveyModal onClose={() => setShowNameModal(false)} />}
			<div className='new-survey-btn animate-colors-75-ms align-middle shadow-xs' onClick={() => setShowNameModal(true)}>
				<div className='center-center'>
					<div className='text-center'>
						<Icon className='align-middle' style={{ marginTop: '-3px' }} path={mdiPlus} size={1.3} />
					</div>
					<div className='font-size-16 text-center' style={{ width: '140px' }}>
						New survey
					</div>
				</div>
			</div>
			{Object.keys(app.surveys).length == 0 ? (
				<div className='no-surveys-msg d-in-bl m-left-40 align-middle'>
					You do not have any surveys yet.<br></br>Created surveys will show up here.<br></br>Press "new survey" to get started!
				</div>
			) : (
				Object.keys(app.surveys).map((_id) => {
					const survey = app.surveys[_id];
					console.log(survey);
					return (
						<div
							key={survey._id}
							style={{ backgroundColor: survey.backgroundColor }}
							className='survey-btn animate-colors-75-ms align-middle shadow-xs'
							onClick={() => {
								router.push(`/surveys/editor/${survey._id}`);
							}}
						>
							<div className='center-center'>
								<div className='font-size-18 text-center' style={{ width: '140px' }}>
									{survey.name}
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};
