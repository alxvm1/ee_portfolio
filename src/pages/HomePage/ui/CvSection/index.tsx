import { Accordion } from '@/shared/ui'
import type { FC } from 'react'
import CvTitle from '../../assets/svg/cvTitle.svg?react'
import { AboutAccordionItem } from './ui/AboutAccordionItem'
import { BusinessCard } from './ui/BusinessCard'
import { EducationAccordionItem } from './ui/EducationAccordionItem'
import { SoftwareAccordionItem } from './ui/SoftwareAccordionItem'
import { SpecializationsAccordionItem } from './ui/SpecializationsAccordionItem'
import './style.css'

export const CvSection: FC = () => (
	<section id='cv' className='cv-section'>
		<div className='cv-section__title-wrapper'>
			<CvTitle className='cv-section__title' />
		</div>

		<BusinessCard />

		<div className='cv-section__main'>
			<Accordion type='multiple' className='cv-section__accordion'>
				<AboutAccordionItem />
				<SpecializationsAccordionItem />
				<SoftwareAccordionItem />
				<EducationAccordionItem />
			</Accordion>
		</div>
	</section>
)
