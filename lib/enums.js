import { MultiChoice } from 'components/Editor/MultiChoice';
import { NumberAnswer } from 'components/Editor/NumberAnswer';
import { RangeAnswer } from 'components/Editor/RangeAnswer';
import { SingleChoice } from 'components/Editor/SingleChoice';
import { StarAnswer } from 'components/Editor/StarAnswer';
import { TextAnswer } from 'components/Editor/TextAnswer';

export const QUESTION_TYPE = {
	SINGLE_CHOICE: 'SINGLE_CHOICE',
	MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
	TEXT_ANSWER: 'TEXT_ANSWER',
	NUMBER_ANSWER: 'NUMBER_ANSWER',
	STAR_ANSWER: 'STAR_ANSWER',
	RANGE_ANSWER: 'RANGE_ANSWER',
};

export const QUESTION_ELEMENT = {
	SINGLE_CHOICE: SingleChoice,
	MULTIPLE_CHOICE: MultiChoice,
	TEXT_ANSWER: TextAnswer,
	NUMBER_ANSWER: NumberAnswer,
	STAR_ANSWER: StarAnswer,
	RANGE_ANSWER: RangeAnswer,
};
