import { type FC } from 'react'
import type { IHeaderSwitchProps } from './types'

export const HeaderSwitch: FC<IHeaderSwitchProps> = ({
	activeSection,
	onSectionChange,
}) => {
	const handleToggle = () => {
		onSectionChange(activeSection === 'portfolio' ? 'cv' : 'portfolio')
	}

	return (
		<button
			type='button'
			className='header-switch-wrapper'
			onClick={handleToggle}
			role='switch'
			aria-checked={activeSection === 'cv'}
			aria-label={
				activeSection === 'portfolio'
					? 'Переключить на раздел Резюме'
					: 'Переключить на раздел Портфолио'
			}
		>
			<div
				className='header-switch-background'
				data-portfolio-active={activeSection === 'portfolio'}
				data-cv-active={activeSection === 'cv'}
			/>
			<span
				className='header-switch-button'
				data-is-active={activeSection === 'portfolio'}
			>
				Портфолио
			</span>
			<span
				className='header-switch-button'
				data-is-active={activeSection === 'cv'}
			>
				Резюме
			</span>
		</button>
	)
}
