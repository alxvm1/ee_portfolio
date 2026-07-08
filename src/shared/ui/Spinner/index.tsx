import { cn } from '@shared/lib/utils'
import { type FC } from 'react'
import './style.css'
import type { TSpinnerProps } from './types'

export const Spinner: FC<TSpinnerProps> = ({ size = 72, className }) => (
	<svg
		viewBox='25 25 50 50'
		style={{ width: size, height: size }}
		className={cn('spinner', className)}
	>
		<circle
			r='20'
			cy='50'
			cx='50'
			fill='none'
			stroke='#8bb220'
			strokeWidth='2'
			strokeLinecap='round'
			className='spinner__circle'
		/>
	</svg>
)
