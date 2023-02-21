import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CheckboxInput } from 'components/General/CheckboxInput';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AddOption } from './AddOption';
import { QuestionLayout } from './QuestionLayout';
import { pageIsEditor } from 'lib/utils';

export const SingleChoice = ({ id, index }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];
	let question = survey?.questions[id];
	const isEditor = pageIsEditor(router);

	question.options.sort((a, b) => {
		return a.orderId - b.orderId;
	});

	return (
		<QuestionLayout survey={survey} index={index} question={question}>
			<div className='m-top-10 font-size-12'>Choose one answer</div>
			{question.options.map((opt, i) => {
				return (
					<div key={i + '' + opt.orderId} className='flex-row no-wrap m-bottom-5 m-top-10'>
						<CheckboxInput name={question._id.toString()} type='radio' className='align-middle m-right-7 m-top-6' />
						<TextInput
							readOnly={!isEditor}
							className={`align-middle ${isEditor ? '' : 'text-mode'}`}
							placeholder={`Answer option ${i + 1}`}
							defaultValue={opt.text}
							onChange={(val) => (opt.text = val)}
						/>
						{isEditor && question.options.length > 1 && (
							<Icon
								className='icon-gray m-top-6 m-left-5'
								path={mdiTrashCanOutline}
								size={1.0}
								onClick={() => {
									question.options = question.options.filter((o) => {
										return o._id != opt._id;
									});
									forceRender();
								}}
							/>
						)}
					</div>
				);
			})}
			{isEditor && <AddOption question={question} />}
		</QuestionLayout>
	);
};
