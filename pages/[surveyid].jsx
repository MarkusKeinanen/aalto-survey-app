import { mdiClose, mdiEmailFastOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { QUESTION_ELEMENT } from 'lib/enums';
import { Spinner } from 'components/General/Spinner';
import { useContext, useState } from 'react';
import { useOnMount } from 'hooks/useOnMount';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { fetchSurvey } from 'lib/surveysApi';
import landingBackgroundSVG from 'svgJSX/landingBackground';

export default function ResponseForm() {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;

	useOnMount(async () => {
		const surveyRes = await fetchSurvey(surveyid);
		if (surveyRes && surveyRes.survey) {
			app.surveys = {
				[surveyRes.survey._id]: surveyRes.survey,
			};
			forceRender();
		}
	});

	let survey = app.surveys ? app.surveys[surveyid] : null;

	//const

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
							<div className='landing-background-svg'>{landingBackgroundSVG}</div>
							<div className='text-center'>
								<div className='survey-form respond-form m-top-20 shadow-sm'>
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
											className='btn btn-blue shadow-xs icon-btn m-right-5'
											onClick={() => {
												window.close();
											}}
										>
											Send response <Icon className='align-middle' style={{ marginLeft: '5px' }} path={mdiEmailFastOutline} size={0.9} />
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
