import React from 'react'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectSection } from '@/components/project-section'
import { BlogSection } from '@/components/blog-section'
import { LifeSection } from '@/components/life-section'
import { AiTwinSection } from '@/components/ai-twin-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProjectSection />
      <BlogSection />
      <LifeSection />
      <AiTwinSection />
      <Footer />
    </main>
  )
}
