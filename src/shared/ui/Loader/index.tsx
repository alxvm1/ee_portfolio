import { type FC, useEffect } from 'react'

export const Loader: FC = () => {
	useEffect(() => {
		const MIN_DURATION = 1000
		const loaderEl = document.getElementById('loader')
		if (!loaderEl) return

		const hide = () => {
			loaderEl.style.opacity = '0'
			const root = document.getElementById('root')
			if (root) root.style.opacity = '1'
			setTimeout(() => loaderEl.remove(), 500)
		}

		const minDelay = new Promise<void>(resolve => setTimeout(resolve, MIN_DURATION))
		const pageLoad = new Promise<void>(resolve => {
			if (document.readyState === 'complete') resolve()
			else window.addEventListener('load', () => resolve(), { once: true })
		})

		Promise.all([minDelay, pageLoad]).then(hide)
	}, [])

	return null
}
