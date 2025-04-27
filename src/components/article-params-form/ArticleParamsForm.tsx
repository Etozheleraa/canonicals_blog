import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState,setArticleState,}: ArticleParamsFormProps) => {
	const [isFormOpen, setFormIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontsize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		setArticleState(defaultArticleState),
			setFontFamily(defaultArticleState.fontFamilyOption),
			setFontsize(defaultArticleState.fontSizeOption),
			setFontColor(defaultArticleState.fontColor),
			setBackgroundColor(defaultArticleState.backgroundColor),
			setContentWidth(defaultArticleState.contentWidth);
	};

	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: ref,
		onClose: () => setFormIsOpen(false),
	});

	return (
		<div ref={ref}>
			<ArrowButton
				onClick={() => setFormIsOpen(!isFormOpen)}
				isOpen={isFormOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						onChange={setFontsize}
						options={fontSizeOptions}
						name='fontSize'
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};