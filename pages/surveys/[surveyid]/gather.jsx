import { mdiChevronLeft, mdiContentCopy } from '@mdi/js';
import Icon from '@mdi/react';
import { BackToSurveysBtn } from 'components/General/Buttons';
import Layout from 'components/General/Layout';
import { useOnMount } from 'hooks/useOnMount';
import { copyTextToClipboard } from 'lib/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Gather() {
	const [link, setLink] = useState('');

	useOnMount(() => {
		setLink(`${window.location.origin}/6405063dd94e3e076ca6c8cc`);
	});

	return (
		<Layout>
			<BackToSurveysBtn />
			<br></br>
			<div className='d-in-bl margin-auto text-left card m-top-30' style={{ padding: '25px 30px 25px 30px' }}>
				<div className='font-weight-700 font-size-18 m-bottom-3'>The URL-address of your survey</div>
				<div className='font-weight-500 font-size-14 m-bottom-15'>Share this link with people who you want to respond to this survey:</div>
				<div className='survey-link-container'>
					<a
						className='link-blue font-size-20'
						href={link}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							copyTextToClipboard(link);
						}}
					>
						{link}
					</a>
					<button
						className='btn btn-blue shadow-xs icon-btn m-left-30'
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							copyTextToClipboard(link);
						}}
					>
						Copy link <Icon className='align-middle' style={{ marginLeft: '3px' }} path={mdiContentCopy} size={0.9} />
					</button>
				</div>
			</div>
		</Layout>
	);
}
