import { createEffect, createEvent, createStore, sample } from 'effector'
import { createProject } from '../api/projectsApi'
import { uploadProjectAsset } from '../api/storageApi'
import type { TProjectCategory } from '../types'

export type TProjectSubmitPayload = {
	category: TProjectCategory
	title: string
	thumbnailFile: File
	pdfFile: File
}

const submitProjectFx = createEffect<TProjectSubmitPayload, void, string>(
	async ({ category, title, thumbnailFile, pdfFile }) => {
		const [thumbResult, pdfResult] = await Promise.all([
			uploadProjectAsset(thumbnailFile, category),
			uploadProjectAsset(pdfFile, category),
		])
		const failed = [thumbResult, pdfResult].find(r => r.error || !r.url)
		if (failed) throw failed.error ?? 'Error while loading PDF file'
		const { error } = await createProject(category, {
			title,
			thumbnail_url: thumbResult.url,
			pdf_url: pdfResult.url,
		})
		if (error) throw error
	}
)

export const projectSubmitted = createEvent<TProjectSubmitPayload>()
export const projectCreated = createEvent<{ category: TProjectCategory }>()
export const projectCreateFailed = createEvent<string>()

export const $isFormSubmitting = createStore(false)
	.on(submitProjectFx, () => true)
	.on(submitProjectFx.finally, () => false)

sample({ clock: projectSubmitted, target: submitProjectFx })
sample({
	clock: submitProjectFx.done,
	fn: ({ params }) => ({ category: params.category }),
	target: projectCreated,
})
sample({ clock: submitProjectFx.failData, target: projectCreateFailed })
