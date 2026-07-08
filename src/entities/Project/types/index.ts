export interface IBaseProject {
	id: string
	thumbnail_url: string
	sort_order: number
	is_published: boolean
	created_at: string
	updated_at: string
}

export interface IProject extends IBaseProject {
	title: string
	pdf_url: string
}

export type TAnyProject = IProject

export type TProjectCategory = 'uiDesign' | 'graphicDesign' | 'illustrations'
