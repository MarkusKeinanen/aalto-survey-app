import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { useRouter } from 'next/router';
import { Breadcrumb } from './Breadcrumb';
import { stripStartAndEndSlashes } from 'lib/utils';
import { useState } from 'react';

export const Navbar = () => {
	const router = useRouter();
	const { surveyid } = router.query;
	const [showProfileOptions, setShowProfileOptions] = useState(false);

	let urlArray = stripStartAndEndSlashes(router.pathname).split('/');

	return (
		<div className='navbar-top shadow-xs'>
			<Link href='/surveys'>
				<div className='home-btn'>
					<div className='center-center'>S</div>
				</div>
			</Link>
			<Link href='/surveys'>
				<a className='brand'>SURVEY APP</a>
			</Link>
			<Breadcrumb />
			{urlArray.length == 1 && <SearchBar />}

			<div
				className='btn btn-blue profile-circle'
				onClick={() => {
					setShowProfileOptions;
				}}
			>
				<div className='center-center' style={{ marginTop: '-1px' }}>
					A
				</div>
			</div>
		</div>
	);
};
