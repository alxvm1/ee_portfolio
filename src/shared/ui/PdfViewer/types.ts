export type TPdfViewerProps = {
	fileUrl: string
	className?: string
	onLoading?: (isLoading: boolean) => void
	onError?: (error: Error) => void
}
