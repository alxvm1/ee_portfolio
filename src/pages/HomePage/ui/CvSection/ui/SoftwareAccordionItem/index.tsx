import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/Accordion'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import type { FC } from 'react'
import { CvSectionConfig } from '../../config/data'

export const SoftwareAccordionItem: FC = () => (
	<AccordionItem value='item-3'>
		<AccordionTrigger>
			<p className='cv-section__title-text'>ПРОГРАММЫ</p>
		</AccordionTrigger>
		<AccordionContent className='cv-section__accordion-content'>
			<div className='cv-section__software-wrapper'>
				{CvSectionConfig.software.map(({ value, label }) => (
					<CircularProgress key={label} value={value} label={label} />
				))}
				<div className='cv-section__ai-tools'>
					<p className='cv-section__ai-tools-title'>
						{CvSectionConfig.aiTools.title}
					</p>
					<ul className='cv-section__ai-tools-list'>
						{CvSectionConfig.aiTools.items.map(item => (
							<li key={item} className='cv-section__ai-tools-item'>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</AccordionContent>
	</AccordionItem>
)
