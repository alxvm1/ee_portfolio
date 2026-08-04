import { type FC, useEffect, useState } from 'react'
import { Header } from '@widgets/Header'
import { type THeaderSwitchOptions } from '@widgets/Header/ui/HeaderSwitch/types'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { homePageConfig } from './config'
import './style.css'
import { CvSection } from './ui/CvSection'
import { PortfolioSection } from './ui/PortfolioSection'
import { Footer } from '@/widgets/Footer'

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
			</main>
			<Outlet />
			<Footer />
		</>
	)
}
