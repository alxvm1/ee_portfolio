import type { FC, SVGProps } from 'react'

export interface ISocialsLinkProps {
	icon: FC<SVGProps<SVGSVGElement>>
	name: string
	href: string
}
