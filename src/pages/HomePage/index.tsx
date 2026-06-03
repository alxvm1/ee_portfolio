import { type FC, useState } from 'react'

import { Header } from '@widgets/Header'
import { type THeaderSwitchOptions } from '@widgets/Header/ui/HeaderSwitch/types'
import { ContactSection } from './ui/ContactSection'
import { CvSection } from './ui/CvSection'
import { HeroSection } from './ui/HeroSection'
import { ProjectsSection } from './ui/ProjectsSection'

export const HomePage: FC = () => {
	const [activeSection, setActiveSection] = useState<THeaderSwitchOptions>('cv')

	return (
		<>
			<Header
				activeSection={activeSection}
				onSectionChange={setActiveSection}
			/>
			<main className='pt-[52px]'>
				{activeSection === 'portfolio' ? (
					<>
						<HeroSection />
						<ProjectsSection />
						<ContactSection />
					</>
				) : (
					<CvSection />
				)}
			</main>
		</>
	)
}
