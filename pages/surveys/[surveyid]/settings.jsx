import { mdiCogOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { BackToSurveysBtn } from 'components/General/Buttons';
import Layout from 'components/General/Layout';
import { SwitchToggle } from 'components/General/SwitchToggle';

export default function Settings() {
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
					<div className='d-in-bl'>
						<div className='title m-bottom-5 font-weight-500'>Survey is active and accepting responses:</div>
						<SwitchToggle id={'accepting-responses-toggle'} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
