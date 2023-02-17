import { MultiChoice } from 'components/Editor/MultiChoice';
import { NumberAnswer } from 'components/Editor/NumberAnswer';
import { RangeAnswer } from 'components/Editor/RangeAnswer';
import { SingleChoice } from 'components/Editor/SingleChoice';
import { StarAnswer } from 'components/Editor/StarAnswer';
import { TextAnswer } from 'components/Editor/TextAnswer';

export const QUESTION_TYPE = {
	SINGLE_CHOICE: 1,
	MULTIPLE_CHOICE: 2,
	TEXT_ANSWER: 3,
	NUMBER_ANSWER: 4,
	STAR_ANSWER: 5,
	RANGE_ANSWER: 6,
};

export const QUESTION_ELEMENT = {
	[QUESTION_TYPE.SINGLE_CHOICE]: SingleChoice,
	[QUESTION_TYPE.MULTIPLE_CHOICE]: MultiChoice,
	[QUESTION_TYPE.TEXT_ANSWER]: TextAnswer,
	[QUESTION_TYPE.NUMBER_ANSWER]: NumberAnswer,
	[QUESTION_TYPE.STAR_ANSWER]: StarAnswer,
	[QUESTION_TYPE.RANGE_ANSWER]: RangeAnswer,
};
