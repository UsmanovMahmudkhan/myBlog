import React from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background dark">
      <Navigation />
        {children}
      <Footer />
    </main>
  )
}
