import type { FC } from 'react'
import { PortfolioTitle } from '../PortfolioTitle'
import { ProjectsViewer } from '../ProjectsViewer'
import './style.css'

export const PortfolioSection: FC = () => {
	return (
		<section className='portfolio-section'>
			<PortfolioTitle />
			<ProjectsViewer />
		</section>
	)
}
