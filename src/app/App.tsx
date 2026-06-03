import { Loader } from '@/shared/ui'
import { type FC } from 'react'
import { Router } from './router'

const App: FC = () => (
	<>
		<Loader />
		<Router />
	</>
)

export default App
