import { SOCIAL_LINKS } from '@shared/config'
import TelegramIcon from '@shared/assets/svg/telegramIcon.svg?react'
import VkIcon from '@shared/assets/svg/vkIcon.svg?react'
import BehanceIcon from '@shared/assets/svg/behanceIcon.svg?react'

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
		title: 'UI/UX - дизайн',
		description:
			'Интерфейсы: логичный, интуитивно понятный UX и современный UI',
	},
	{
		title: 'Web - дизайн',
		description: 'Дизайн сайтов: как лэндинги, так и многостраничные сайты',
	},
	{
		title: 'Графический дизайн',
		description: 'Печатная, рекламная продукция, брендинг',
	},
	{
		title: 'Иллюстрации',
		description: 'От стрит арта до иллюстрации для состояний интерфейса',
	},
] as const

const education = [
	{
		place: 'ТГАСУ',
		date: '2020–2024',
		description:
			'Томский государственный архитектурно-строительный университет, АФ, направление архитектуры',
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
			'Томский государственный архитектурно-строительный университет, АФ, направление графического дизайна',
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
] as const

const aiTools = {
	title: 'AI Tools',
	items: ['Nano Banana 2', 'Grok Imagine'],
} as const

export const CvSectionConfig = {
	businessCardInfo,
	socialLinks,
	specializations,
	education,
	software,
	aiTools,
}
