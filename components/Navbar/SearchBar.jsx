import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

export const SearchBar = () => {
	return (
		<div className='search-bar p-rel d-in-bl align-top m-top-4'>
			<Icon className='p-abs' path={mdiMagnify} style={{ left: '10px', top: '16px' }} size={1.0} />
			<input style={{ width: '500px', marginTop: '8px', paddingLeft: '37px' }} type='text' autoComplete='nope' placeholder='Search in app...' />
		</div>
	);
};
