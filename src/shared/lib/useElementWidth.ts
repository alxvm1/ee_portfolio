import { useEffect, useRef, useState } from 'react'

export const useElementWidth = <T extends HTMLElement>() => {
	const ref = useRef<T>(null)
	const [width, setWidth] = useState<number>()

	useEffect(() => {
		const node = ref.current
		if (!node) return

		const updateWidth = () => setWidth(node.offsetWidth)
		updateWidth()

		const observer = new ResizeObserver(updateWidth)
		observer.observe(node)

		return () => observer.disconnect()
	}, [])

	return { ref, width }
}
