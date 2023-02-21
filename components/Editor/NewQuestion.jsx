import { useContext, useState } from 'react';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCheckboxOutline, mdiCheckboxMultipleOutline, mdiCommentTextMultipleOutline, mdiStarOutline } from '@mdi/js';
import { mdiNumeric, mdiArrowLeftRight } from '@mdi/js';
import { QUESTION_TYPE } from 'lib/enums';
import { AppContext } from 'pages/_app';
import { useRouter } from 'next/router';
import { getId, getLatestOrderId } from 'lib/utils';

const questionTypes = [
	{
		name: 'Single choice',
		type: QUESTION_TYPE.SINGLE_CHOICE,
		iconPath: mdiCheckboxOutline,
	},
	{
		name: 'Multiple choice',
		type: QUESTION_TYPE.MULTIPLE_CHOICE,
		iconPath: mdiCheckboxMultipleOutline,
	},
	{
		name: 'Text answer',
		type: QUESTION_TYPE.TEXT_ANSWER,
		iconPath: mdiCommentTextMultipleOutline,
	},
	{
		name: 'Number answer',
		type: QUESTION_TYPE.NUMBER_ANSWER,
		iconPath: mdiNumeric,
	},
	{
		name: 'Star rating',
		type: QUESTION_TYPE.STAR_ANSWER,
		iconPath: mdiStarOutline,
	},
	{
		name: 'Number range',
		type: QUESTION_TYPE.RANGE_ANSWER,
		iconPath: mdiArrowLeftRight,
	},
];

export const NewQuestion = (props) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];

	const [showOptions, setShowOptions] = useState(false);

	return (
		<div
			className={`new-question-placeholder animate-colors-75-ms m-top-10 ${showOptions ? 'with-options' : ''}`}
			onClick={() => {
				setShowOptions(true);
			}}
		>
			{showOptions ? (
				<>
					{questionTypes.map((question) => {
						return (
							<div
								key={question.name}
								className='p-rel new-question-option btn btn-white'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									let newQuestionId = getId();
									let newQuestion = {
										_id: newQuestionId,
										text: '',
										type: question.type,
										orderId: getLatestOrderId(survey.questions) + 1,
									};
									if (question.type == QUESTION_TYPE.SINGLE_CHOICE) {
										newQuestion.options = [
											{
												_id: getId(),
												text: '',
												orderId: 1,
											},
											{
												_id: getId(),
												text: '',
												orderId: 2,
											},
											{
												_id: getId(),
												text: '',
												orderId: 3,
											},
										];
									} else if (question.type == QUESTION_TYPE.MULTIPLE_CHOICE) {
										newQuestion.options = [
											{
												_id: getId(),
												text: '',
												orderId: 1,
											},
											{
												_id: getId(),
												text: '',
												orderId: 2,
											},
											{
												_id: getId(),
												text: '',
												orderId: 3,
											},
											{
												_id: getId(),
												text: '',
												orderId: 4,
											},
										];
									} else if (question.type == QUESTION_TYPE.TEXT_ANSWER) {
										//pass
									} else if (question.type == QUESTION_TYPE.NUMBER_ANSWER) {
										//pass
									} else if (question.type == QUESTION_TYPE.STAR_ANSWER) {
										//pass
									} else if (question.type == QUESTION_TYPE.RANGE_ANSWER) {
										//pass
									}
									app.surveys[surveyid].questions[newQuestionId] = newQuestion;
									setShowOptions(false);
									forceRender();
								}}
							>
								<div className='center-center'>
									<Icon className='m-bottom-3' path={question.iconPath} size={1.3} />
									<div className='new-question-name'>{question.name}</div>
								</div>
							</div>
						);
					})}
				</>
			) : (
				<div className='center-center'>
					<div className='text-center'>
						<Icon className='align-middle' style={{ marginTop: '-3px' }} path={mdiPlus} size={1.3} />
					</div>
					<div className='font-size-16 text-center' style={{ width: '140px' }}>
						New question
					</div>
				</div>
			)}
		</div>
	);
};
