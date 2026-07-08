import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/Accordion'
import type { FC } from 'react'
import { CvSectionConfig } from '../../config/data'

export const EducationAccordionItem: FC = () => (
	<AccordionItem value='item-4'>
		<AccordionTrigger>
			<p className='cv-section__title-text'>ОБРАЗОВАНИЕ</p>
		</AccordionTrigger>
		<AccordionContent className='cv-section__accordion-content'>
			<div className='cv-section__education-list'>
				{CvSectionConfig.education.map(({ place, date, description }) => (
					<div
						key={`${place}-${date}`}
						className='cv-section__item-background cv-section__education-item'
					>
						<span className='cv-section__title-text'>{place}</span>
						<span className='cv-section__description-text cv-section__description-text--date'>
							{date}
						</span>
						<span className='cv-section__description-text'>{description}</span>
					</div>
				))}
			</div>
		</AccordionContent>
	</AccordionItem>
)
