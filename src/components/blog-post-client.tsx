"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/data/blog-posts'

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-black to-futuristic-dark">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sejong-accent hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <div className="glass-card border-white/5 p-8 mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-sejong-primary/20 text-sejong-accent">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">{post.excerpt}</p>

              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}

              {!post.content && (
                <>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
                  <p className="mb-4">
                    This is a placeholder for the full content of the blog post. In a real application,
                    each post would have its complete content stored in a database or CMS.
                  </p>

                  <p className="mb-4">
                    For this {post.category} article, we would typically cover various aspects of the topic,
                    including code examples, best practices, and real-world applications.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Key Concepts</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor,
                    nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                    nisl nisl eget nisl.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Implementation Example</h2>
                  <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
                    <code>
                      {`// Example code for ${post.title}
public class Example {
    public static void main(String[] args) {
        System.out.println("This is a code example for ${post.title}");
        // More code would go here in a real blog post
    }
}`}
                    </code>
                  </pre>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                  <p className="mb-4">
                    In conclusion, {post.title.toLowerCase()} is an important topic for backend developers.
                    By understanding these concepts and implementing best practices, you can create more
                    robust and maintainable applications.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/blog" className="button-3d">
              View All Blog Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
