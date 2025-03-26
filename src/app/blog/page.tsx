"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-black to-futuristic-dark">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights and tutorials on backend development, Java, Spring Boot, and more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="glass-card border-white/5 p-6 hover:shadow-lg hover:shadow-sejong-primary/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">{post.title}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-sejong-primary/20 text-sejong-accent">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-400">{post.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <motion.span
                      className="flex items-center text-sejong-accent hover:underline"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
