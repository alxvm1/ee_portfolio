import { type FC } from 'react'

import { Header } from '@widgets/Header'
import { HeroSection } from './ui/HeroSection'
import { ProjectsSection } from './ui/ProjectsSection'
import { ContactSection } from './ui/ContactSection'

export const HomePage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
