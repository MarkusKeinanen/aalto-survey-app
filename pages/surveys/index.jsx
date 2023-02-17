import Layout from 'components/General/Layout';
import { SurveyList } from 'components/Home/SurveyList';
import { useAppStorage } from 'hooks/useAppStorage';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';
import {waitingForData} from "lib/utils";

export const defaultSurveysState = {};

export default function () {
	const { app, forceRender } = useContext(AppContext);

	const requiredFields = ['Surveys']
	useAppStorage(requiredFields);
	const waiting = waitingForData(app, requiredFields)

	return (
		<Layout>
			<div className='page-title m-top-40'>My surveys</div>
			{waiting ? <Spinner /> : null}
			<div className='text-center'>
				<SurveyList data={[]} />
			</div>
		</Layout>
	);
}
