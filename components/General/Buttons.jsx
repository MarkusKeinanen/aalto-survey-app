import { mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import Link from 'next/link';

export const BackToSurveysBtn = () => {
	return (
		<Link href='/surveys'>
			<button className='btn btn-white' style={{ paddingLeft: '4px' }}>
				<Icon className='align-middle' path={mdiChevronLeft} size={1} />{' '}
				<span className='align-middle' style={{ marginLeft: '-3px' }}>
					Back to surveys
				</span>
			</button>
		</Link>
	);
};
