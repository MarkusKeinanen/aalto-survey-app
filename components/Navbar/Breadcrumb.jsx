import { stripStartAndEndSlashes } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';

export const Breadcrumb = () => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys ? app.surveys[surveyid] : null;

	let urlArray = stripStartAndEndSlashes(router.pathname).split('/');

	return (
		<div className='breadcrumb'>
			<b className='text-lightgray'>/</b>
			<Link href='/surveys'>
				<a className={`link-blue ${urlArray.length == 1 ? 'current' : ''}`}>My surveys</a>
			</Link>
			{urlArray.length > 1 && (
				<>
					<b className='text-lightgray'>/</b>
					<Link href={`/surveys/editor/${surveyid}`}>
						<a className={`link-blue ${urlArray.length == 3 ? 'current' : ''}`}>{survey.name}</a>
					</Link>
				</>
			)}
		</div>
	);
};
