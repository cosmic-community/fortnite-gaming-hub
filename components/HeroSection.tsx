import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import type { HeroSectionProps } from '@/types'

export default function HeroSection({ featuredPost, className = '' }: HeroSectionProps) {
  if (!featuredPost) {
    return null
  }

  const featuredImage = featuredPost.metadata?.featured_image
  const category = featuredPost.metadata?.category

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=1400&h=800&fit=crop&auto=format,compress`}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl">
          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <CategoryBadge category={category} size="lg" />
            </div>
          )}

          {/* Post Type Badge */}
          <div className="mb-4">
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {featuredPost.metadata?.post_type?.value || 'Featured'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {featuredPost.title}
          </h1>

          {/* Excerpt */}
          <div 
            className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 max-w-2xl"
            dangerouslySetInnerHTML={{ 
              __html: featuredPost.metadata?.content?.substring(0, 200) + '...' || '' 
            }}
          />

          {/* CTA Button */}
          <Link 
            href={`/posts/${featuredPost.slug}`}
            className="inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Read Full Article
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}