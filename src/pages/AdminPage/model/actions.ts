import { projectModel } from '@entities/Project'
import { sample } from 'effector'
import { projectForm } from './forms'
import {
	$activeCategory,
	adminPageMounted,
	categoryTabClicked,
	createFormClosed,
} from './ui'

sample({
	clock: adminPageMounted,
	source: $activeCategory,
	fn: category => ({ category }),
	target: projectModel.events.adminProjectsRequested,
})

sample({
	clock: categoryTabClicked,
	fn: category => ({ category }),
	target: [projectModel.events.adminProjectsRequested, createFormClosed],
})
sample({ clock: categoryTabClicked, target: projectForm.reset })

sample({
	clock: projectForm.formValidated,
	source: $activeCategory,
	fn: (category, { title, thumbnailFile, pdfFile }) => ({
		category,
		title,
		thumbnailFile: thumbnailFile as File,
		pdfFile: pdfFile as File,
	}),
	target: projectModel.events.projectSubmitted,
})
sample({
	clock: projectModel.events.projectCreated,
	target: [projectForm.reset, createFormClosed],
})
sample({
	clock: projectModel.events.projectCreateFailed,
	fn: errorText => ({ rule: 'server', errorText }),
	target: projectForm.fields.thumbnailFile.addError,
})
