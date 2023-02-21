import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { TextInput } from 'components/General/TextInput';
import { pageIsEditor } from 'lib/utils';
import { useRouter } from 'next/router';
import { AppContext } from 'pages/_app';
import { useContext } from 'react';

export const QuestionLayout = ({ survey, index, question, children }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const isEditor = pageIsEditor(router);

	return (
		<div>
			<div className='flex-row no-wrap'>
				<b className='d-bl align-middle font-size-22 m-top-3 m-right-10'>
					{index}. {isEditor ? '' : question.text}
				</b>
				{isEditor && (
					<TextInput
						className='align-middle font-weight-600 font-size-16'
						placeholder='Enter question'
						defaultValue={question.text}
						onChange={(val) => (question.text = val)}
					/>
				)}

				{isEditor && Object.keys(survey.questions).length > 1 && (
					<Icon
						className='icon-gray m-top-5 m-left-5'
						path={mdiTrashCanOutline}
						size={1.0}
						onClick={() => {
							delete survey.questions[question._id.toString()];
							forceRender();
						}}
					/>
				)}
			</div>
			{children}
		</div>
	);
};
