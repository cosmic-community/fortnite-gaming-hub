import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import type { PostCardProps } from '@/types'

export default function PostCard({ post, showCategory = true, className = '' }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const postType = post.metadata?.post_type

  // Extract plain text from HTML content for excerpt
  const getExcerpt = (html: string, maxLength: number = 150): string => {
    const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <article className={`card p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative overflow-hidden h-48 bg-muted">
            <img
              src={`${featuredImage.imgix_url}?w=600&h=384&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {/* Featured Badge */}
            {post.metadata?.featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category and Post Type */}
          <div className="flex items-center justify-between mb-3">
            {showCategory && category && (
              <CategoryBadge category={category} size="sm" />
            )}
            {postType && (
              <span className="text-muted-foreground text-sm font-medium">
                {postType.value}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {getExcerpt(post.metadata?.content || '')}
          </p>

          {/* Read More */}
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold text-sm hover:underline">
              Read More
            </span>
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}