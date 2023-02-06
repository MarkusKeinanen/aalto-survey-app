import { mdiPlus, mdiStar, mdiStarOutline, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CheckboxInput } from 'components/General/CheckboxInput';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AddOption } from './AddOption';
import { QuestionLayout } from './QuestionLayout';

export const RangeAnswer = ({ id, index }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];
	let question = survey?.questions[id];
	const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [selected, setSelected] = useState(0);

	return (
		<QuestionLayout survey={survey} index={index} question={question}>
			<div className='m-top-10 font-size-12'>Choose 1 to 10</div>
			<div className='flex-row no-wrap m-bottom-5 m-top-10 star-inputs'>
				{stars.map((num) => {
					return (
						<div
							className={`d-in-bl align-middle range-input-option p-rel ${num == selected ? 'has-color' : ''}`}
							onClick={() => {
								setSelected(num);
							}}
							key={'option' + num}
						>
							<div className='center-center'>{num}</div>
						</div>
					);
				})}
			</div>
		</QuestionLayout>
	);
};
