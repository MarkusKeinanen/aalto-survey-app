import Layout from 'components/General/Layout';
import { SurveyList } from 'components/Home/SurveyList';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';

export const defaultSurveysState = {};

export default function () {
	const { app, forceRender } = useContext(AppContext);

	return (
		<Layout>
			<div className='page-title m-top-40'>My surveys</div>
			<div className='text-center'>
				<SurveyList data={[]} />
			</div>
		</Layout>
	);
}
