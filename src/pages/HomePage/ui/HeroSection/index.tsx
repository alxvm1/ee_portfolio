import { type FC } from 'react'
import eeImage from '../../assets/images/eeImage.webp'
import HeroBackgroundIcon from '../../assets/svg/HeroBackground.svg?react'
import HeroTitleIcon from '../../assets/svg/HeroTitle.svg?react'
import './style.css'

export const HeroSection: FC = () => {
	return (
		<section
			id='hero'
			className='flex min-h-screen flex-col items-center justify-center'
		>
			<div className='hero-wrapper'>
				<div className='hero-description hero-description-right'>
					<p className='hero-description-text'>WEB</p>
					<p className='hero-description-text'>UI/UX</p>
					<p className='hero-description-text'>Графический</p>
					<p className='hero-description-text'>Иллюстрации</p>
				</div>
				<div className='hero-title-wrapper'>
					<img src={eeImage} className='hero-ee-image' alt='ee-image' />
					<HeroTitleIcon />
					<HeroBackgroundIcon className='hero-background-icon' />
				</div>
				<div className='hero-description hero-description-left'>
					<p className='hero-description-text'>Ребизова Екатерина</p>
					<p className='hero-description-text'>Дизайнер</p>
				</div>
			</div>
		</section>
	)
}
