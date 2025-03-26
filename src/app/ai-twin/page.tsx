import React from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function AiTwinPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container px-4 mx-auto py-40 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">AI Twin Vision</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          This page is coming soon. Check back later for more details about the AI Twin concept and how it can revolutionize software development.
        </p>
      </div>
      <Footer />
    </main>
  )
}
