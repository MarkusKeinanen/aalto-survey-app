import { mdiPlus, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CheckboxInput } from 'components/General/CheckboxInput';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { getId, pageIsEditor, pageIsPreview } from 'lib/utils';
import { TextArea } from 'components/General/TextArea';
import { AddOption } from './AddOption';
import { QuestionLayout } from './QuestionLayout';

export const TextAnswer = ({ id, index }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];
	let question = survey?.questions[id];
	const isEditor = pageIsEditor(router);

	return (
		<QuestionLayout survey={survey} index={index} question={question}>
			<div className='flex-row no-wrap m-bottom-5 m-top-10'>
				<TextArea
					className={`align-middle`}
					style={{ cursor: isEditor ? 'default' : null, opacity: isEditor ? 0.8 : 1 }}
					readOnly={isEditor}
					placeholder={isEditor ? '(Answer is written here by respondee)' : 'Write your answer here'}
					defaultValue={null}
					noResize={isEditor}
					onChange={(val) => null}
				/>
			</div>
		</QuestionLayout>
	);
};
