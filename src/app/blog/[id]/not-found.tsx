import Link from 'next/link'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen pt-20 pb-20 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Blog Post Not Found</h1>
      <p className="text-xl text-gray-400 mb-8 max-w-lg text-center">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/blog" className="button-3d">
        View All Blog Posts
      </Link>
    </div>
  )
}
