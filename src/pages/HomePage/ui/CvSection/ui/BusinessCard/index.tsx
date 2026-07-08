import type { FC } from 'react'
import { CvSectionConfig } from '../../config/data'
import eeImage from '../../../../assets/images/eeImage.webp'
import './style.css'
import type { IInfoItem, ISocialLinks } from './types'

const SocialLinks: FC<ISocialLinks> = ({ isMobile }) => (
	<div
		className={`business-card__links${isMobile ? ' business-card__links--mobile' : ''}`}
	>
		{CvSectionConfig.socialLinks.map(({ href, label, Icon }) => (
			<a
				key={href}
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className='business-card__link'
				aria-label={label}
			>
				<Icon className='business-card__link-icon' />
			</a>
		))}
	</div>
)

const InfoItem: FC<IInfoItem> = ({ title, description, isMobile }) => (
	<div className='business-card__info-item'>
		<p
			className={`business-card__info-item-title${isMobile ? ' business-card__info-item-title--mobile' : ''}`}
		>
			{title}
		</p>
		<p
			className={`business-card__info-item-description${isMobile ? ' business-card__info-item-description--mobile' : ''}`}
		>
			{description}
		</p>
	</div>
)

const splitIntoRows = <T,>(items: readonly T[], perRow: number): T[][] =>
	items.reduce<T[][]>((rows, item, index) => {
		if (index % perRow === 0) rows.push([])
		rows[rows.length - 1].push(item)
		return rows
	}, [])

export const BusinessCard: FC = () => (
	<>
		<div className='business-card business-card--desktop'>
			<img
				src={eeImage}
				className='business-card__image'
				alt='Портрет Екатерины Ребизовой'
			/>
			<div className='business-card__content'>
				<span className='business-card__title'>Ребизова Екатерина</span>
				<div className='business-card__body'>
					<SocialLinks />
					<div className='business-card__info-wrapper'>
						{CvSectionConfig.businessCardInfo.map(item => (
							<InfoItem key={item.title} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>

		<div className='business-card business-card--mobile'>
			<div className='business-card__wrapper--mobile'>
				<img
					src={eeImage}
					className='business-card__image business-card__image--mobile'
					alt='Портрет Екатерины Ребизовой'
				/>
				<div className='business-card__content business-card__content--mobile'>
					<span className='business-card__title business-card__title--mobile'>
						Ребизова Екатерина
					</span>
					<div className='business-card__body'>
						<SocialLinks isMobile />
					</div>
				</div>
			</div>
			<div className='business-card__info-wrapper business-card__info-wrapper--mobile'>
				{splitIntoRows(CvSectionConfig.businessCardInfo, 2).map(
					(row, rowIndex) => (
						<div key={rowIndex} className='business-card__info-row'>
							{row.map(item => (
								<InfoItem key={item.title} {...item} isMobile />
							))}
						</div>
					)
				)}
			</div>
		</div>
	</>
)
