import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/Accordion'
import type { FC } from 'react'
import { CvSectionConfig } from '../../config/data'

export const SpecializationsAccordionItem: FC = () => (
	<AccordionItem value='item-2'>
		<AccordionTrigger>
			<p className='cv-section__title-text'>НАПРАВЛЕНИЯ</p>
		</AccordionTrigger>
		<AccordionContent className='cv-section__accordion-content'>
			<div className='cv-section__specializations'>
				{CvSectionConfig.specializations.map(({ title, description }) => (
					<div
						key={title}
						className='cv-section__item-background cv-section__specialization-item'
					>
						<div className='cv-section__specialization-content'>
							<p className='cv-section__title-text'>{title}</p>
							<p className='cv-section__description-text'>{description}</p>
						</div>
					</div>
				))}
			</div>
		</AccordionContent>
	</AccordionItem>
)
