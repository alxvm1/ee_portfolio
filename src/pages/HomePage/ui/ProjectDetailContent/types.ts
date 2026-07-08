import type { TProjectCategory } from '@/entities/Project'

export type TProjectDetailContentProps = {
	category: TProjectCategory
	id: string
	onBack: () => void
	isSquareLeftCorner?: boolean
	isSquareRightCorner?: boolean
}

export type TDetailStatus = 'loading' | 'error' | 'ready'
