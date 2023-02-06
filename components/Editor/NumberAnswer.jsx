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
import { NumberInput } from 'components/General/NumberInput';

export const NumberAnswer = ({ id, index }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];
	let question = survey?.questions[id];
	const isEditor = pageIsEditor(router);

	return (
		<QuestionLayout survey={survey} index={index} question={question}>
			<div className='flex-row no-wrap m-bottom-5 m-top-10'>
				<NumberInput className='align-middle' defaultValue={null} onChange={(val) => null} />
			</div>
		</QuestionLayout>
	);
};
