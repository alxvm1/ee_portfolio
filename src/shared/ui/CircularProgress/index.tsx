import { cn } from '@shared/lib/utils'
import { type FC } from 'react'
import './style.css'
import { type ICircularProgressProps } from './types'

const VIEWBOX_SIZE = 166

export const CircularProgress: FC<ICircularProgressProps> = ({
	value,
	label,
	strokeWidth = 6,
	className,
}) => {
	const radius = (VIEWBOX_SIZE - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (value / 100) * circumference
	const color = value >= 80 ? '#8bb220' : value <= 50 ? '#404040' : '#767676'

	return (
		<div className={cn('circular-progress', className)}>
			<svg
				viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
				className='circular-progress__svg'
			>
				<circle
					cx={VIEWBOX_SIZE / 2}
					cy={VIEWBOX_SIZE / 2}
					r={radius}
					fill='none'
					stroke='#161616'
					strokeWidth={strokeWidth}
				/>
				<circle
					cx={VIEWBOX_SIZE / 2}
					cy={VIEWBOX_SIZE / 2}
					r={radius}
					fill='none'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap='round'
				/>
			</svg>
			<div className='circular-progress__content'>
				<span className='circular-progress__label'>{label}</span>
				<span className='circular-progress__value'>{value}%</span>
			</div>
		</div>
	)
}
