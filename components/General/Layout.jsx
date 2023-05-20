import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Spinner } from 'components/General/Spinner';
import { AppContext } from 'pages/_app';
import { Navbar } from 'components/Navbar/Navbar';
import { parseEndpoint, waitingForData } from 'lib/utils';
import { mdiFileDocumentEditOutline, mdiCogOutline, mdiEmailFastOutline, mdiChartBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useAppStorage } from 'hooks/useAppStorage';
import { useOnMount } from 'hooks/useOnMount';
import { request } from 'lib/api';
import toast from 'react-hot-toast';

export default function Layout({ children }) {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;

	const requiredFields = [];
	if (app.isLoggedIn) {
		requiredFields.push('surveys');
	}
	useAppStorage(requiredFields);
	const waiting = waitingForData(app, requiredFields);

	const currentPage = parseEndpoint(router.pathname);

	useOnMount(async () => {
		if (!app.isLoggedIn) {
			const res = await request({
				url: '/api/auth',
				method: 'GET',
				noErrorMessage: true,
			});
			if (res && res.user) {
				app.isLoggedIn = true;
				forceRender();
			} else {
				toast.error('You must be logged in to view this content.');
				router.push('/');
			}
		}
	});

	return (
		<div className='container'>
			{!app.isLoggedIn ? (
				<Spinner className={`center-center`} text='Checking authentication...' />
			) : (
				<>
					<Navbar />
					{surveyid && (
						<div className='navbar-left'>
							<div className='editor-navbar-left-content'>
								<div className='title'>Survey management</div>
								<div className='m-top-10'>
									<Link href={`/surveys/${surveyid}/editor`}>
										<div className={`nav-item animate-colors-75-ms ${currentPage == 'editor' ? 'selected' : ''}`}>
											<Icon className='i align-middle m-right-5' path={mdiFileDocumentEditOutline} size={1.0} />{' '}
											<div className='d-in-bl align-middle'>Edit survey</div>
										</div>
									</Link>

									<Link href={`/surveys/${surveyid}/settings`}>
										<div className={`nav-item animate-colors-75-ms ${currentPage == 'settings' ? 'selected' : ''}`}>
											<Icon className='i align-middle m-right-7' path={mdiCogOutline} size={1.0} />
											<div className='d-in-bl align-middle'>Settings</div>
										</div>
									</Link>

									<Link href={`/surveys/${surveyid}/gather`}>
										<div className={`nav-item animate-colors-75-ms ${currentPage == 'gather' ? 'selected' : ''}`}>
											<Icon className='i align-middle' style={{ marginLeft: '-3px', marginRight: '6px' }} path={mdiEmailFastOutline} size={1.0} />{' '}
											<div className='d-in-bl align-middle'>Gather responses</div>
										</div>
									</Link>

									<Link href={`/surveys/${surveyid}/results`}>
										<div className={`nav-item animate-colors-75-ms ${currentPage == 'results' ? 'selected' : ''}`}>
											<Icon className='i align-middle m-right-7' path={mdiChartBoxOutline} size={1.0} />
											<div className='d-in-bl align-middle'>Results</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
					)}
					<div className={`page ${router.query.surveyid ? 'surveys-page' : ''}`} id='page'>
						<div>{app.pageLoading || waiting ? <Spinner className={`center-center`} /> : children}</div>
					</div>
				</>
			)}
		</div>
	);
}
