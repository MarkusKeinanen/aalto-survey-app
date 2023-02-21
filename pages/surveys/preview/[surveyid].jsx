import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { QUESTION_ELEMENT } from 'lib/enums';
import { Spinner } from 'components/General/Spinner';
import { useContext, useState } from 'react';
import { useOnMount } from 'hooks/useOnMount';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';

export default function Preview() {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;

	useOnMount(() => {
		let storedSurvey = localStorage.getItem('preview-survey');
		if (storedSurvey) {
			storedSurvey = JSON.parse(storedSurvey);
			app.surveys = {
				[storedSurvey._id]: storedSurvey,
			};
			forceRender();
		}
	});

	let survey = app.surveys ? app.surveys[surveyid] : null;

	return (
		<div className='container survey-answer-container'>
			<>
				<div className='survey-answer-form-top-bar'>
					<div className='survey-title'>{survey?.name}</div>
				</div>
				{!survey ? (
					<Spinner className={`center-center`} />
				) : (
					<>
						<div className='page'>
							<div className='text-center'>
								<div className='survey-form m-top-20 shadow-sm'>
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
														<div key={question._id} className={`${i == 0 ? 'm-top-0' : 'm-top-20'} m-bottom-30`}>
															<Element id={question._id} index={i + 1} />
														</div>
													);
												});
										  })()}

									<div className='text-right m-top-15'>
										<button
											className='btn btn-red shadow-xs icon-btn m-right-5'
											onClick={() => {
												window.close();
											}}
										>
											Close preview <Icon className='align-middle' path={mdiClose} size={0.9} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</>
		</div>
	);
}
