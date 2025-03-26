"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

export function BlogSection() {
  // Take only the first 3 blog posts for the homepage
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <section className="py-20 bg-futuristic-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-48 h-48 rounded-full border-2 border-sejong-accent blur-sm"></div>
        <div className="absolute bottom-10 right-[5%] w-64 h-64 rounded-full border-4 border-sejong-primary opacity-40 blur-sm"></div>
        <div className="absolute top-[35%] right-[20%] w-32 h-32 rounded border border-sejong-secondary transform rotate-45"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Latest Blog Posts</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Thoughts, tutorials, and insights on backend development, Java, and microservices architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`}>
                <Card className="glass-card overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sejong-accent/10">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-sejong-primary/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="flex-grow flex flex-col p-5">
                    <div className="mb-2 text-sm text-sejong-accent">
                      {post.date}
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={post.authorImage}
                            alt={post.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-400">{post.author}</span>
                      </div>

                      <span className="text-sejong-accent flex items-center text-sm">
                        Read more
                        <ChevronRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sejong-accent hover:text-sejong-accent/80 transition-colors py-2 px-4 rounded-md border border-sejong-accent/20 hover:border-sejong-accent/50 bg-sejong-primary/5 hover:bg-sejong-primary/10"
          >
            View all posts
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
