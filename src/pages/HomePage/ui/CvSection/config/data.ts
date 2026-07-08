import { SOCIAL_LINKS } from '@shared/config'
import TelegramIcon from '../../../assets/svg/telegramIcon.svg?react'
import VkIcon from '../../../assets/svg/vkIcon.svg?react'
import BehanceIcon from '../../../assets/svg/behanceIcon.svg?react'

const businessCardInfo = [
	{ title: 'Год рождения:', description: '2002' },
	{ title: 'Город проживания:', description: 'Томск' },
	{ title: 'Формат работы:', description: 'Офис / Удалённо' },
	{ title: 'Уровень:', description: 'Junior' },
] as const

const socialLinks = [
	{ href: SOCIAL_LINKS.telegram, label: 'Telegram', Icon: TelegramIcon },
	{ href: SOCIAL_LINKS.vk, label: 'ВКонтакте', Icon: VkIcon },
	{ href: SOCIAL_LINKS.behance, label: 'Behance', Icon: BehanceIcon },
] as const

const specializations = [
	{
		title: 'UI/UX дизайн',
		description:
			'Интерфейсы, приложения — логичный, интуитивно понятный UI и современный UX.',
	},
	{
		title: 'Web-дизайн',
		description:
			'Сайты: лэндинги, многостраничные. (создаю дизайн, для вёрстки необходим разработчик)',
	},
	{
		title: 'Графический дизайн',
		description:
			'Печатная и сувенирная продукция: постеры, листовки, баннеры, упаковка, канцелярия и др. А также брендинг и карточки товара',
	},
	{
		title: 'Иллюстрации',
		description: 'Любого жанра: от иллюстраций для детских книг до стрит-арта',
	},
] as const

const education = [
	{
		place: 'ТГАСУ',
		date: '2020–2024',
		description:
			'Томский государственный архитектурно-строительный университет, Архитектурный факультет, направление архитектуры',
	},
	{
		place: 'Нетология',
		date: '2023–2024',
		description: 'Курс «Графический дизайн и коммуникации»',
	},
	{
		place: 'ТГАСУ',
		date: '2024–2026',
		description:
			'Томский государственный архитектурно-строительный университет, Архитектурный факультет, направление графического дизайна',
	},
	{
		place: 'Skillbox',
		date: '2025–2026',
		description: 'Курс «UI/UX дизайн»',
	},
] as const

const software = [
	{ value: 90, label: 'Figma' },
	{ value: 80, label: 'Photoshop' },
	{ value: 60, label: 'Illustrator' },
	{ value: 60, label: 'CorelDRAW' },
	{ value: 50, label: 'AI Tools' },
	{ value: 40, label: '3ds Max' },
] as const

export const CvSectionConfig = {
	businessCardInfo,
	socialLinks,
	specializations,
	education,
	software,
}
