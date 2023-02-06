import { NewQuestion } from 'components/Editor/NewQuestion';
import Layout from 'components/General/Layout';
import { mdiEyeOutline, mdiPlus, mdiContentSaveOutline, mdiTrashCanOutline, mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiApplicationExport } from '@mdi/js';
import { mdiArchiveOutline } from '@mdi/js';
import { TextInput } from 'components/General/TextInput';
import { QUESTION_ELEMENT, QUESTION_TYPE } from 'lib/enums';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { DeleteSurveyModal } from './DeleteSurveyModal';

export default function Editor() {
	const { app, forceRender } = useContext(AppContext);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys ? app.surveys[surveyid] : null;

	if (!survey) {
		return (
			<Layout>
				<div className='m-top-30'>A survey with this id ({surveyid}) does not exist.</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{showDeleteModal && <DeleteSurveyModal onClose={() => setShowDeleteModal(false)} />}

			<div className='page-title m-top-20'>
				{survey?.isNew ? 'Create new survey' : 'Edit survey'} <Icon className='align-middle m-bottom-3' path={mdiPencilOutline} size={1.5} />
			</div>
			<div className='text-center'>
				<div className='new-survey m-top-20 shadow-sm'>
					<TextInput
						className='new-survey-name'
						placeholder='Name of survey'
						defaultValue={survey?.name}
						onChange={(val) => {
							survey.name = val;
						}}
					/>

					{!survey || Object.keys(survey.questions).length == 0
						? null
						: (function () {
								let questions = Object.keys(survey.questions).map((id) => survey.questions[id]);
								questions.sort((a, b) => {
									return a.orderId - b.orderId;
								});

								return questions.map((question, i) => {
									let Element = QUESTION_ELEMENT[question.type];
									return (
										<div key={question.id} className='m-top-20 m-bottom-30'>
											<Element id={question.id} index={i + 1} />
										</div>
									);
								});
						  })()}

					<NewQuestion />

					<div className='text-right m-top-25'>
						<button
							className='btn btn-red shadow-xs icon-btn m-right-5'
							onClick={() => {
								setShowDeleteModal(true);
							}}
						>
							Delete <Icon className='align-middle' path={mdiTrashCanOutline} size={0.9} />
						</button>
						<button
							className='btn btn-white shadow-xs icon-btn m-right-5'
							onClick={() => {
								window.open(`${window.location.origin}/surveys/preview/${surveyid}`);
							}}
						>
							Preview <Icon className='align-middle' path={mdiApplicationExport} size={0.9} />
						</button>
						<button
							className='btn btn-blue shadow-xs icon-btn'
							onClick={() => {
								let surveys = window.localStorage.getItem('surveys');
								surveys = surveys ? JSON.parse(surveys) : {};
								surveys[surveyid] = {
									...survey,
									isNew: false,
								};
								window.localStorage.setItem('surveys', JSON.stringify(surveys));
								toast.success('This survey has been saved');
							}}
						>
							Save <Icon className='align-middle' path={mdiArchiveOutline} size={0.9} />
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
