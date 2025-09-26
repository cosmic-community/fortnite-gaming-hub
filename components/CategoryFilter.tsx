'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()

  const isActive = (categorySlug: string) => {
    return pathname === `/categories/${categorySlug}`
  }

  const isAllActive = pathname === '/' || pathname === '/posts'

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {/* All Categories */}
      <Link
        href="/posts"
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
          isAllActive
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'bg-white text-foreground hover:bg-muted/50 border border-border'
        }`}
      >
        All Posts
      </Link>

      {/* Individual Categories */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2 ${
            isActive(category.slug)
              ? 'shadow-lg text-white'
              : 'bg-white text-foreground hover:bg-muted/50 border border-border'
          }`}
          style={
            isActive(category.slug)
              ? { backgroundColor: category.metadata?.color || '#7c3aed' }
              : undefined
          }
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.metadata?.color || '#7c3aed' }}
          />
          <span>{category.metadata?.name || category.title}</span>
        </Link>
      ))}
    </div>
  )
}