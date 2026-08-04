import type { FC } from 'react'
import type { ISocialsLinkProps } from './types'
import './style.css'

export const SocialsLink: FC<ISocialsLinkProps> = ({
	icon: Icon,
	name,
	href,
}) => {
	return (
		<a
			className='socials-link'
			href={href}
			target='_blank'
			rel='noopener noreferrer'
		>
			<Icon className='socials-link__icon' />
			<span className='socials-link__title'>{name}</span>
		</a>
	)
}
