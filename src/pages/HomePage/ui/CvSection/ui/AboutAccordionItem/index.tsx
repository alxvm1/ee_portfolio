import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/Accordion'
import type { FC } from 'react'

export const AboutAccordionItem: FC = () => (
	<AccordionItem value='item-1'>
		<AccordionTrigger>
			<p className='cv-section__title-text'>ОБО МНЕ</p>
		</AccordionTrigger>
		<AccordionContent className='cv-section__accordion-content'>
			<div className='cv-section__about'>
				<div className='cv-section__about-text'>
					<p className='cv-section__description-text'>
						Добрый день, меня зовут Екатерина, я дизайнер!
						<br />
						Работаю в разных сферах: Web, UI/UX, графический дизайн и создаю
						иллюстрации.
					</p>
					<p className='cv-section__description-text'>
						Мне нравится простраивать логику в проектах, делая информацию в них
						более простой для восприятия пользователем.
					</p>
					<p className='cv-section__description-text'>
						На данный момент я студентка 4 курса по направлению «Графический
						дизайн». Мне интересно развиваться в дизайне, поэтому в свободное
						время я изучаю новое на курсах и в интернете.
					</p>
				</div>
			</div>
		</AccordionContent>
	</AccordionItem>
)
