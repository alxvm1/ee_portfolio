import { Button } from '@/shared/ui'
import ArrowDownIcon from '@shared/assets/svg/common/arrowDownIcon.svg?react'
import ContactIcon from '@shared/assets/svg/common/contactsIcon.svg?react'
import LogoIcon from '@shared/assets/svg/logoIcon.svg?react'
import { type FC } from 'react'
import './style.css'
import type { IHeaderProps } from './types'
import { HeaderSwitch } from './ui/HeaderSwitch'

export const Header: FC<IHeaderProps> = ({
	activeSection,
	onSectionChange,
}) => {
	return (
		<header className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0c0c0c]'>
			<LogoIcon />
			<HeaderSwitch
				activeSection={activeSection}
				onSectionChange={onSectionChange}
			/>
			<Button variant={'outline'} className='header-contacts-button-desktop'>
				Контакты
				<ArrowDownIcon />
			</Button>
			<button className='header-contacts-button-mobile'>
				<ContactIcon />
			</button>
		</header>
	)
}
