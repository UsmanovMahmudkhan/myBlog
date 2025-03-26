"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function CampusLifePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new My Life at Sejong page after a short delay
    const timer = setTimeout(() => {
      router.push('/my-life-at-sejong')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container px-4 mx-auto py-40 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">My Life at Sejong</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Redirecting to the new and improved My Life at Sejong page...
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-sejong-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-sejong-accent animate-[loading_1.5s_ease-in-out]"></div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </main>
  )
}
