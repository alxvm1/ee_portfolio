import { useElementWidth } from '@shared/lib/useElementWidth'
import { cn } from '@shared/lib/utils'
import { type FC, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import type { TPdfViewerProps } from './types'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString()

export const PdfViewer: FC<TPdfViewerProps> = ({
	fileUrl,
	className,
	onLoading,
	onError,
}) => {
	const { ref: containerRef, width: containerWidth } =
		useElementWidth<HTMLDivElement>()
	const [numPages, setNumPages] = useState<number | null>(null)
	const renderedCountRef = useRef(0)

	const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		onLoading?.(true)
		renderedCountRef.current = 0
		setNumPages(numPages)
	}

	const handlePageRendered = (total: number) => {
		renderedCountRef.current += 1
		if (renderedCountRef.current >= total) {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					onLoading?.(false)
				})
			})
		}
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				'mx-auto flex w-full flex-col items-center gap-4',
				className
			)}
		>
			<Document
				file={fileUrl}
				onLoadSuccess={handleDocumentLoadSuccess}
				onLoadError={error => {
					onLoading?.(false)
					onError?.(error)
				}}
				loading={<p className='text-muted-foreground'>Загрузка PDF...</p>}
				error={<p className='text-destructive'>Не удалось загрузить PDF.</p>}
			>
				{Array.from({ length: numPages ?? 0 }, (_, index) => (
					<Page
						key={index}
						pageNumber={index + 1}
						width={containerWidth}
						devicePixelRatio={Math.min(2, window.devicePixelRatio || 1)}
						canvasBackground='#efefef'
						className='overflow-hidden rounded-xl [&:not(:last-child)]:mb-4'
						renderTextLayer={false}
						renderAnnotationLayer={false}
						onRenderSuccess={() => handlePageRendered(numPages ?? 0)}
						onRenderError={() => handlePageRendered(numPages ?? 0)}
					/>
				))}
			</Document>
		</div>
	)
}
