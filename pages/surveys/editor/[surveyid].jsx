import { NewQuestion } from 'components/Editor/NewQuestion';
import Layout from 'components/General/Layout';
import { mdiEyeOutline, mdiPlus, mdiContentSaveOutline, mdiTrashCanOutline, mdiPencilOutline, mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiApplicationExport } from '@mdi/js';
import { mdiArchiveOutline } from '@mdi/js';
import { TextInput } from 'components/General/TextInput';
import { QUESTION_ELEMENT, QUESTION_TYPE } from 'lib/enums';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { DeleteSurveyModal } from 'components/Editor/DeleteSurveyModal';
import { createSurvey, deleteSurvey, saveSurvey } from 'lib/surveysApi';
import { Spinner } from 'components/General/Spinner';
import { isNew, waitingForData } from 'lib/utils';
import { useAppStorage } from 'hooks/useAppStorage';
import cloneDeep from 'lodash/cloneDeep';

export default function Editor() {
	const { app, forceRender } = useContext(AppContext);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [saving, setSaving] = useState();
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys ? app.surveys[surveyid] : null;

	const requiredFields = ['surveys'];
	useAppStorage(requiredFields);
	const waiting = waitingForData(app, requiredFields);

	if (!survey) {
		return (
			<Layout>
				<div className='m-top-30'>A survey with this id ({surveyid}) does not exist.</div>
			</Layout>
		);
	}

	const onSaveSurvey = async () => {
		setSaving(true);
		let res = null;
		let isNewSurvey = isNew(survey);
		let oldSurveyId = survey._id;
		if (isNewSurvey) {
			res = await createSurvey(survey);
		} else {
			res = await saveSurvey(survey);
		}
		if (res && res.survey) {
			let newSurvey = res.survey;
			app.surveys[newSurvey._id] = cloneDeep(newSurvey);
			if (isNewSurvey) {
				delete app.surveys[oldSurveyId];
				router.replace(`/surveys/editor/${newSurvey._id}`);
			}
			forceRender();
			toast.success('This survey has been saved');
		}
		setSaving(false);
	};

	return (
		<Layout>
			{showDeleteModal && <DeleteSurveyModal onClose={() => setShowDeleteModal(false)} />}
			<div className='margin-auto text-left' style={{ width: '750px', maxWidth: '100%' }}>
				<button
					className='btn btn-white'
					style={{ paddingLeft: '4px' }}
					onClick={() => {
						router.push(`/surveys`);
					}}
				>
					<Icon className='align-middle' path={mdiChevronLeft} size={1} />{' '}
					<span className='align-middle' style={{ marginLeft: '-3px' }}>
						Back to surveys
					</span>
				</button>
			</div>

			<div className='page-title m-top-20'>
				{isNew(survey) ? 'Create new survey' : 'Edit survey'} <Icon className='align-middle m-bottom-3' path={mdiPencilOutline} size={1.5} />
			</div>
			<div className='text-center'>
				<div className='new-survey m-top-20 shadow-sm'>
					{waiting || saving ? (
						<Spinner className='m-top-30 m-bottom-25' text={waiting ? 'Loading...' : 'Saving survey...'} />
					) : (
						<>
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
												<div key={question._id} className='m-top-20 m-bottom-30'>
													<Element id={question._id} index={i + 1} />
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
										localStorage.setItem('preview-survey', JSON.stringify(survey));
										window.open(`${window.location.origin}/surveys/preview/${surveyid}`);
									}}
								>
									Preview <Icon className='align-middle' path={mdiApplicationExport} size={0.9} />
								</button>
								<button className='btn btn-blue shadow-xs icon-btn' onClick={onSaveSurvey}>
									Save <Icon className='align-middle' path={mdiArchiveOutline} size={0.9} />
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}
