import { type FC, useEffect, useState } from 'react'

import { SOCIAL_LINKS } from '@shared/config'
import { Button } from '@/shared/ui'
import { Header } from '@widgets/Header'
import { type THeaderSwitchOptions } from '@widgets/Header/ui/HeaderSwitch/types'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { homePageConfig } from './config'
import './style.css'
import { CvSection } from './ui/CvSection'
import { PortfolioSection } from './ui/PortfolioSection'

export const HomePage: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const isProjectRoute = location.pathname.startsWith('/project')

	const [manualSection, setManualSection] =
		useState<THeaderSwitchOptions>('portfolio')
	const activeSection = isProjectRoute ? 'portfolio' : manualSection

	useEffect(() => {
		document.title = homePageConfig.SECTION_TITLES[activeSection]
	}, [activeSection])

	const handleSectionChange = (section: THeaderSwitchOptions) => {
		setManualSection(section)
		if (isProjectRoute) {
			navigate('/')
		}
	}

	return (
		<>
			<Header
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
			/>
			<main className='pt-[52px]'>
				{activeSection === 'portfolio' ? <PortfolioSection /> : <CvSection />}
				<div className='home-page__contacts'>
					<p className='home-page__contacts-title-text'>КОНТАКТЫ</p>
					<div className='home-page__contacts-buttons'>
						<a
							href={SOCIAL_LINKS.telegram}
							target='_blank'
							rel='noopener noreferrer'
						>
							<Button className='home-page__contacts-button'>Telegram</Button>
						</a>
						<a href={SOCIAL_LINKS.vk} target='_blank' rel='noopener noreferrer'>
							<Button className='home-page__contacts-button'>ВКонтакте</Button>
						</a>
					</div>
				</div>
			</main>
			<Outlet />
		</>
	)
}
