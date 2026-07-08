import { projectModel } from '@entities/Project'
import { Button, Input, Label } from '@shared/ui'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { type FC, useRef } from 'react'
import { adminPageModel } from '../../model'
import './style.css'

export const AddProjectForm: FC = () => {
	const { fields, submit } = useForm(adminPageModel.forms.projectForm)
	const [isSubmitting] = useUnit([projectModel.stores.$isFormSubmitting])

	const thumbnailInputRef = useRef<HTMLInputElement>(null)
	const pdfInputRef = useRef<HTMLInputElement>(null)

	const error =
		fields.thumbnailFile.firstError?.errorText ??
		fields.pdfFile.firstError?.errorText

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				submit()
			}}
			className='add-project-form'
		>
			<div className='add-project-form__field'>
				<Label htmlFor='pdf-title'>Название</Label>
				<Input
					id='pdf-title'
					value={fields.title.value}
					onChange={e => fields.title.onChange(e.target.value)}
					placeholder='Название проекта'
				/>
				{fields.title.firstError && (
					<p className='add-project-form__error'>
						{fields.title.firstError.errorText}
					</p>
				)}
			</div>

			<div className='add-project-form__field'>
				<Label>Обложка</Label>
				<input
					ref={thumbnailInputRef}
					type='file'
					accept='image/*'
					onChange={e =>
						fields.thumbnailFile.onChange(e.target.files?.[0] ?? null)
					}
					className='add-project-form__file-input'
				/>
				<Button
					type='button'
					variant='outline'
					className='font-gothic'
					onClick={() => thumbnailInputRef.current?.click()}
				>
					{fields.thumbnailFile.value
						? fields.thumbnailFile.value.name
						: 'Выбрать изображение'}
				</Button>
				{fields.thumbnailFile.value && (
					<img
						src={URL.createObjectURL(fields.thumbnailFile.value)}
						alt='Предпросмотр загруженной обложки'
						className='add-project-form__preview'
					/>
				)}
			</div>

			<div className='add-project-form__field'>
				<Label>PDF-файл</Label>
				<input
					ref={pdfInputRef}
					type='file'
					accept='application/pdf'
					onChange={e => fields.pdfFile.onChange(e.target.files?.[0] ?? null)}
					className='add-project-form__file-input'
				/>
				<Button
					type='button'
					variant='outline'
					className='font-gothic'
					onClick={() => pdfInputRef.current?.click()}
				>
					{fields.pdfFile.value ? fields.pdfFile.value.name : 'Выбрать PDF'}
				</Button>
			</div>

			{error && <p className='add-project-form__error'>{error}</p>}

			<Button
				type='submit'
				disabled={isSubmitting}
				className='add-project-form__submit-button'
			>
				{isSubmitting ? 'Сохраняем...' : 'Создать проект'}
			</Button>
		</form>
	)
}
