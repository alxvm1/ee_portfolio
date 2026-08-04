import { type FC } from 'react'
import LogoIcon from '@shared/assets/svg/logoIcon.svg?react'
import TelegramIcon from '@shared/assets/svg/telegramIcon.svg?react'
import VkIcon from '@shared/assets/svg/vkIcon.svg?react'
import EmailIcon from '@shared/assets/svg/emailIcon.svg?react'
import BehanceIcon from '@shared/assets/svg/behanceIcon.svg?react'
import DribbbleIcon from '@shared/assets/svg/dribbbleIcon.svg?react'
import './style.css'
import { scrollToTop } from '@/shared/lib/scroll'
import { SocialsLink } from './ui/SocialsLink'
import { SOCIAL_LINKS } from '@/shared/config'

export const Footer: FC = () => {
	return (
		<footer className='footer'>
			<div className='footer__wrapper'>
				<div className='footer__section'>
					<LogoIcon className='header-logo' onClick={scrollToTop} />
				</div>
				<div className='footer__section'>
					<div className='footer__section__links'>
						<span className='footer__title'>КОНТАКТЫ</span>
						<div className='footer__links'>
							<SocialsLink
								icon={EmailIcon}
								name='Почта'
								href={SOCIAL_LINKS.email}
							/>
							<SocialsLink
								icon={TelegramIcon}
								name='Telegram'
								href={SOCIAL_LINKS.telegram}
							/>
							<SocialsLink
								icon={VkIcon}
								name='ВКонтакте'
								href={SOCIAL_LINKS.vk}
							/>
						</div>
					</div>
					<div className='footer__section__links'>
						<span className='footer__title'>ПОРТФОЛИО</span>
						<div className='footer__links'>
							<SocialsLink
								icon={BehanceIcon}
								name='Behance'
								href={SOCIAL_LINKS.behance}
							/>
							<SocialsLink
								icon={DribbbleIcon}
								name='Dribbble'
								href={SOCIAL_LINKS.dribbble}
							/>
						</div>
					</div>
				</div>
			</div>
			<span className='footer__copyright'>© 2026 Rebizova Ekaterina</span>
		</footer>
	)
}
