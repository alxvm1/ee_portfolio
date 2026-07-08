import { createForm } from 'effector-forms'

export const projectForm = createForm({
	fields: {
		thumbnailFile: {
			init: null as File | null,
			rules: [
				{
					name: 'required',
					validator: (v: File | null) => v !== null,
					errorText: 'Загрузите обложку и PDF-файл',
				},
			],
		},
		title: {
			init: '',
			rules: [
				{
					name: 'required',
					validator: (v: string) => Boolean(v),
					errorText: 'Название не может быть пустым',
				},
			],
		},
		pdfFile: {
			init: null as File | null,
			rules: [
				{
					name: 'required',
					validator: (v: File | null) => v !== null,
					errorText: 'Загрузите обложку и PDF-файл',
				},
			],
		},
	},
	validateOn: ['submit'],
})
