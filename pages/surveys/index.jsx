import Layout from 'components/General/Layout';
import { useAppStorage } from 'hooks/useAppStorage';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';
import { waitingForData } from 'lib/utils';
import { Spinner } from 'components/General/Spinner';
import { useRouter } from 'next/router';
import { NewSurveyModal } from 'components/Home/NewSurveyModal';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

export const defaultSurveysState = {};

export default function () {
	const { app, forceRender } = useContext(AppContext);
	const [showNameModal, setShowNameModal] = useState(false);
	const router = useRouter();

	return (
		<Layout>
			<div className='text-center'>
				<div className='page-title m-top-40'>My surveys</div>
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
					{app.surveys && (
						<>
							{Object.keys(app.surveys).length == 0 ? (
								<div className='no-surveys-msg d-in-bl m-left-40 align-middle'>
									You do not have any surveys yet.<br></br>Created surveys will show up here.<br></br>Press "new survey" to get started!
								</div>
							) : (
								Object.keys(app.surveys).map((_id) => {
									const survey = app.surveys[_id];
									return (
										<div
											key={survey._id}
											style={{ backgroundColor: survey.backgroundColor }}
											className='survey-btn animate-colors-75-ms align-middle shadow-xs'
											onClick={() => {
												router.push(`/surveys/${survey._id}/editor`);
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
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}
