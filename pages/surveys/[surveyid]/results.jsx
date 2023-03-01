import { mdiChartBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { BackToSurveysBtn } from 'components/General/Buttons';
import Layout from 'components/General/Layout';
import { Spinner } from 'components/General/Spinner';
import { useOnMount } from 'hooks/useOnMount';
import { QUESTION_TYPE } from 'lib/enums';
import { fetchResponses } from 'lib/responsesApi';
import { formatDateTime } from 'lib/utils';
import { useRouter } from 'next/router';
import { AppContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

export default function Results() {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;

	let survey = app.surveys ? app.surveys[surveyid] : null;

	useEffect(() => {
		const fn = async () => {
			app.responseData = app.responseData || {};
			if (survey && !app.responseData[survey._id]) {
				const res = await fetchResponses(survey._id);
				if (res && res.responses) {
					app.responseData[survey._id] = res.responses;
				} else {
					app.responseData[survey._id] = null;
				}
				forceRender();
			}
		};
		fn();
	});

	const responses = app.responseData ? app.responseData[survey._id] : null;

	return (
		<Layout>
			<BackToSurveysBtn />
			<br></br>
			<div className='text-left'>
				<div className='d-in-bl margin-auto text-left card m-top-30' style={{ padding: '25px 30px 25px 30px', minWidth: '250px', marginBottom: '200px' }}>
					<div className='font-weight-700 font-size-18 m-bottom-3 border-bottom-light p-bottom-10'>
						<Icon className='align-middle m-right-7' path={mdiChartBoxOutline} size={1.2} />
						<div className='d-in-bl align-middle '>Survey results</div>
					</div>
					<div className='m-top-25'>
						{!survey || !app.responseData || !app.responseData[survey._id] ? (
							<Spinner text='Loading responses...' />
						) : responses.length == 0 ? (
							<div>
								This survey doesn't have any responses yet.<br></br>Share the link in "Gather responses" with people to start gathering responses!
							</div>
						) : (
							Object.keys(survey.questions).map((question_id) => {
								const question = survey.questions[question_id];

								return (
									<div key={question_id} className='m-bottom-25'>
										<div className='font-weight-700 m-bottom-7 font-size-15'>
											{question.orderId}. {question.text}
										</div>
										<table className='table-blue'>
											<thead>
												<tr>
													<td>Sender</td>
													<td>Sent at</td>
													{(function () {
														if (question.type == QUESTION_TYPE.SINGLE_CHOICE || question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
															return question.options.map((opt) => {
																return <td key={`header${opt._id}`}>{opt.text}</td>;
															});
														} else if (question.type == QUESTION_TYPE.TEXT_ANSWER) {
															return <td>Text answer</td>;
														} else if (question.type == QUESTION_TYPE.NUMBER_ANSWER) {
															return <td>Number answer</td>;
														} else if (question.type == QUESTION_TYPE.STAR_ANSWER) {
															return <td>Stars (1-5)</td>;
														} else if (question.type == QUESTION_TYPE.RANGE_ANSWER) {
															return <td>Number answer (1-10)</td>;
														}
													})()}
												</tr>
											</thead>
											<tbody>
												{responses.map((response) => {
													const values = response.values[question_id];

													return (
														<tr key={response._id}>
															<td>(Anonymous)</td>
															<td>{formatDateTime(response.createdAt)}</td>
															{(function () {
																if (question.type == QUESTION_TYPE.SINGLE_CHOICE || question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
																	return question.options.map((opt) => {
																		const responseOption = values.find((v) => v.option_id == opt._id);
																		return <td key={`${response._id}${opt._id}`}>{responseOption?.value || ''}</td>;
																	});
																} else if (question.type == QUESTION_TYPE.TEXT_ANSWER) {
																	return <td>{values[0].value}</td>;
																} else if (question.type == QUESTION_TYPE.NUMBER_ANSWER) {
																	return <td>{values[0].value}</td>;
																} else if (question.type == QUESTION_TYPE.STAR_ANSWER) {
																	return <td>{values[0].value}</td>;
																} else if (question.type == QUESTION_TYPE.RANGE_ANSWER) {
																	return <td>{values[0].value}</td>;
																}
															})()}
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								);
								// if (question.type == QUESTION_TYPE.SINGLE_CHOICE) {
								// 	//pass
								// } else if (question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
								// 	//pass
								// } else if (question.type == QUESTION_TYPE.TEXT_ANSWER) {
								// 	//pass
								// } else if (question.type == QUESTION_TYPE.NUMBER_ANSWER) {
								// 	//pass
								// } else if (question.type == QUESTION_TYPE.STAR_ANSWER) {
								// 	//pass
								// } else if (question.type == QUESTION_TYPE.RANGE_ANSWER) {
								// 	//pass
								// }
							})
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
