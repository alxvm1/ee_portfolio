import { PdfViewer, Spinner } from '@/shared/ui'
import { projectModel } from '@entities/Project'
import ChevronIcon from '@shared/assets/svg/common/chevronIcon.svg?react'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState, type FC } from 'react'
import './style.css'
import type { TDetailStatus, TProjectDetailContentProps } from './types'

const getDetailStatus = (
	isProjectLoading: boolean,
	projectError: string | null,
	isPdfLoading: boolean,
	pdfError: Error | null
): TDetailStatus => {
	if (projectError || pdfError) return 'error'
	if (isProjectLoading || isPdfLoading) return 'loading'
	return 'ready'
}

export const ProjectDetailContent: FC<TProjectDetailContentProps> = ({
	category,
	id,
	onBack,
	isSquareLeftCorner,
	isSquareRightCorner,
}) => {
	const [project, isProjectLoading, projectError, projectDetailRequested] =
		useUnit([
			projectModel.stores.$projectDetail,
			projectModel.stores.$isProjectDetailLoading,
			projectModel.stores.$projectDetailError,
			projectModel.events.projectDetailRequested,
		])

	const [isPdfLoading, setIsPdfLoading] = useState(true)
	const [pdfError, setPdfError] = useState<Error | null>(null)
	const [isReturnBtnVisible, setIsReturnBtnVisible] = useState(true)
	const returnBtnRef = useRef<HTMLButtonElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const status = getDetailStatus(
		isProjectLoading,
		projectError,
		isPdfLoading,
		pdfError
	)

	useEffect(() => {
		projectDetailRequested({ category, id })
	}, [category, id, projectDetailRequested])

	useEffect(() => {
		const node = returnBtnRef.current
		if (!node) return

		const observer = new IntersectionObserver(
			([entry]) => {
				const isScrolledPastBelow =
					!entry.isIntersecting && entry.boundingClientRect.top < 0
				setIsReturnBtnVisible(!isScrolledPastBelow)
			},
			{ threshold: 0 }
		)
		observer.observe(node)

		return () => observer.disconnect()
	}, [status])

	const scrollToTop = () => {
		containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div
			ref={containerRef}
			className='project-detail-content'
			data-square-left-corner={isSquareLeftCorner}
			data-square-right-corner={isSquareRightCorner}
		>
			{status === 'ready' && (
				<button
					ref={returnBtnRef}
					className='project-detail-content__return-btn'
					onClick={onBack}
				>
					<ChevronIcon className='project-detail-content__return-btn__icon' />
				</button>
			)}
			{status === 'ready' && !isReturnBtnVisible && (
				<button
					type='button'
					className='project-detail-content__scroll-top-btn'
					onClick={scrollToTop}
					aria-label='Прокрутить к началу документа'
				>
					<ChevronIcon className='project-detail-content__scroll-top-btn__icon' />
				</button>
			)}

			<div className='project-detail-content__viewer'>
				{status === 'loading' && <Spinner />}
				{status === 'error' && (
					<p className='text-destructive'>
						{projectError
							? `Не удалось загрузить проект: ${projectError}`
							: 'Не удалось загрузить PDF.'}
					</p>
				)}

				{project && (
					<PdfViewer
						className={status !== 'ready' ? 'invisible absolute' : undefined}
						fileUrl={project.pdf_url}
						onLoading={setIsPdfLoading}
						onError={setPdfError}
					/>
				)}
			</div>
		</div>
	)
}
