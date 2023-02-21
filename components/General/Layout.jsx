import { LandingLayout } from 'components/Landing/LandingLayout.jsx';
import { useState, useCallback, useContext } from 'react';
import { request } from 'lib/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Spinner } from 'components/General/Spinner';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { Navbar } from 'components/Navbar/Navbar';

export default function Layout({ children }) {
	const { app } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	return (
		<div className='container'>
			<Navbar />
			<div className='page' id='page'>
				<div>{app.pageLoading || !app.surveys ? <Spinner className={`center-center`} /> : children}</div>
			</div>
		</div>
	);
}
