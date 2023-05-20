import { mdiCogOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { BackToSurveysBtn } from 'components/General/Buttons';
import Layout from 'components/General/Layout';
import { SwitchToggle } from 'components/General/SwitchToggle';
import { saveSurvey } from 'lib/surveysApi';
import { useRouter } from 'next/router';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';

export default function Settings() {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	const [saving, setSaving] = useState();

	let survey = app.surveys ? app.surveys[surveyid] : null;
	let surveyIsNew = survey?._id.length < 10;

	if (!survey) {
		return (
			<Layout>
				<div className='m-top-30'>A survey with this id ({surveyid}) does not exist.</div>
			</Layout>
		);
	}

	if (surveyIsNew) {
		return (
			<Layout>
				<div className='m-top-30'>This survey must be saved before it can gather responses.</div>
			</Layout>
		);
	}

	const onSaveSurvey = async () => {
		const res = await saveSurvey(survey);
		forceRender();
	};

	return (
		<Layout>
			<BackToSurveysBtn />
			<br></br>
			<div className='d-in-bl margin-auto text-left card m-top-30' style={{ padding: '25px 30px 25px 30px' }}>
				<div className='font-weight-700 font-size-18 m-bottom-3 border-bottom-light p-bottom-10'>
					<Icon className='align-middle m-right-7' path={mdiCogOutline} size={1.2} />
					<div className='d-in-bl align-middle '>Survey settings</div>
				</div>
				<div className='m-top-20'>
					{saving ? (
						<Spinner className='m-top-30 m-bottom-25' text={'Saving settings...'} />
					) : (
						<div className='d-in-bl'>
							<div className='title m-bottom-5 font-weight-500'>Survey is active and accepting responses:</div>
							<SwitchToggle
								id={'accepting-responses-toggle'}
								defaultValue={survey.active}
								onChange={(value) => {
									survey.active = value;
									onSaveSurvey();
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
