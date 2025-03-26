import React from 'react'
import { blogPosts } from '@/data/blog-posts'
import { BlogPostClient } from '@/components/blog-post-client'
import { notFound } from 'next/navigation'

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map(post => ({
    id: post.id.toString()
  }))
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id)
  const post = blogPosts.find(post => post.id === postId)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
