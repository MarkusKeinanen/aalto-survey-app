import { mdiPlus, mdiStar, mdiStarOutline, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { CheckboxInput } from 'components/General/CheckboxInput';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AddOption } from './AddOption';
import { QuestionLayout } from './QuestionLayout';

export const StarAnswer = ({ id, index }) => {
	const { app, forceRender } = useContext(AppContext);
	const router = useRouter();
	const { surveyid } = router.query;
	let survey = app.surveys[surveyid];
	let question = survey?.questions[id];
	const stars = [1, 2, 3, 4, 5];
	const [currentStar, setCurrentStar] = useState(0);
	const [selectedStar, setSelectedStar] = useState(0);

	return (
		<QuestionLayout survey={survey} index={index} question={question}>
			<div className='m-top-10 font-size-12'>Choose 1 to 5 stars</div>
			<div className='flex-row no-wrap m-top-10 star-inputs'>
				{stars.map((num) => {
					return (
						<div
							className={`d-in-bl align-middle star-input ${num <= currentStar || num <= selectedStar ? 'has-color' : ''}`}
							onMouseEnter={() => {
								setCurrentStar(num);
							}}
							onMouseLeave={() => {
								setCurrentStar(0);
							}}
							onClick={() => {
								setSelectedStar(num);
							}}
							key={'star' + num}
						>
							<Icon path={mdiStar} size={1.5} />
						</div>
					);
				})}
			</div>
		</QuestionLayout>
	);
};
