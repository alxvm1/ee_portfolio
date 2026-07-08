import { Analytics } from '@vercel/analytics/react'
import { type FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AdminPage } from '@pages/AdminPage'
import { HomePage } from '@pages/HomePage'
import { NotFoundPage } from '@pages/NotFoundPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		children: [{ path: 'project/:category/:id' }],
	},
	{ path: '/admin', element: <AdminPage /> },
	{ path: '*', element: <NotFoundPage /> },
])

export const Router: FC = () => (
	<>
		<RouterProvider router={router} />
		<Analytics />
	</>
)
