import Icon from '@mdi/react';
import { mdiHome, mdiLogout } from '@mdi/js';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { useRouter } from 'next/router';
import { Breadcrumb } from './Breadcrumb';
import { stripStartAndEndSlashes } from 'lib/utils';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { request } from 'lib/api';

export const Navbar = () => {
	const router = useRouter();
	const { surveyid } = router.query;
	const profileOptionsRef = useRef();
	const [showProfileOptions, setShowProfileOptions] = useState(false);

	useOnClickOutside(profileOptionsRef, () => {
		setShowProfileOptions(false);
	});

	const onLogout = async () => {
		request({
			url: '/api/auth',
			method: 'DELETE',
		});
		window.location.href = '/';
	};

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
				className='btn btn-blue profile-circle p-rel'
				onClick={() => {
					setShowProfileOptions(true);
				}}
			>
				<div className='center-center' style={{ marginTop: '-1px' }}>
					A
				</div>
				{showProfileOptions && (
					<div className='profile-options' ref={profileOptionsRef}>
						<div className='profile-option' onClick={onLogout}>
							<Icon className='d-in-bl align-middle m-right-5' path={mdiLogout} size={0.9} />
							<div className='d-in-bl align-middle'>Log out</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
