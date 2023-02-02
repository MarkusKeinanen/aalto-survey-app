import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AppContext } from 'pages/_app';
import { Spinner } from '../General/Spinner';
import landingBackgroundSVG from 'svgJSX/landingBackground';

export const LandingLayout = ({ children }) => {
	const { app } = useContext(AppContext);

	return (
		<>
			<Head>
				<title>Survey app</title>
				<link rel='icon' href='/favicon.ico' />
				<meta charSet='utf-8' />
				<meta name='author' content='Markus Keinänen' />
				<meta name='description' content='Aalto HSY fullstack survey app project' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<div className='landing-container '>
				<div className='landing-nav-top no-wrap'>
					<div className='top-left d-in-bl align-middle text-right'>
						<Link href='/'>
							<a className='font-size-28 font-weight-700'>SURVEY APP</a>
						</Link>
					</div>
					<div className='top-right align-middle text-left font-weight-600'>
						<Link href='/surveys'>
							<a className='top-right-item'>My surveys</a>
						</Link>
						<Link href='/signup'>
							<button className='btn signup-link shadow-sm btn-blue animate-colors-75-ms top-right-item'>Sign up</button>
						</Link>

						<Link href='/login'>
							<a className='top-right-item'>Login</a>
						</Link>
						<select className='top-right-item language-select'>
							<option>English / EN</option>
							<option>Suomi / FI</option>
						</select>
					</div>
				</div>
				<div className='landing-background-svg'>{landingBackgroundSVG}</div>
				<div>{app.pageLoading ? <Spinner className={`center-center`} /> : children}</div>
			</div>
		</>
	);
};
