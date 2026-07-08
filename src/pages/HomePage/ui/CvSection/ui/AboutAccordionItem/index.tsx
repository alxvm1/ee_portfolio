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
					</p>
					<p className='cv-section__description-text'>
						Я многозадачный специалист, работаю в разных сферах. Создаю
						современный и запоминающийся дизайн: от эффектных постеров до
						интуитивно понятных интерфейсов.
					</p>
					<p className='cv-section__description-text'>
						На данный момент я являюсь студенткой 4 курса по направлению
						«Графический дизайн», и в приоритете рассматриваю предложения
						IT-компаний — на должности UI/UX- и веб-дизайнера.
					</p>
				</div>
				<div className='cv-section__info-list'>
					<div className='cv-section__item-background cv-section__info-item cv-section__info-item--fio'>
						<span className='cv-section__description-text'>ФИО:</span>
						<span className='cv-section__title-text cv-section__title-text--center'>
							Ребизова Екатерина Евгеньевна
						</span>
					</div>
					<div className='cv-section__item-background cv-section__info-item'>
						<span className='cv-section__description-text'>Год рождения:</span>
						<span className='cv-section__title-text'>2002</span>
					</div>
					<div className='cv-section__item-background cv-section__info-item'>
						<span className='cv-section__description-text'>Условия труда:</span>
						<span className='cv-section__title-text'>
							Офис (Томск) / Удалённо
						</span>
					</div>
				</div>
			</div>
		</AccordionContent>
	</AccordionItem>
)
