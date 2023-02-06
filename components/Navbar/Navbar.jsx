import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import Link from 'next/link';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
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
			<SearchBar />
			<div className='btn btn-blue profile-circle'>
				<div className='center-center' style={{ marginTop: '-1px' }}>
					MK
				</div>
			</div>
		</div>
	);
};
