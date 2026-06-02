import { type FC } from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="text-muted-foreground">Страница не найдена</p>
      <Link to="/" className="text-primary underline-offset-4 hover:underline">
        На главную
      </Link>
    </main>
  )
}
