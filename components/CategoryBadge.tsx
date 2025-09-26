import type { CategoryBadgeProps } from '@/types'

export default function CategoryBadge({ category, size = 'md', className = '' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const color = category.metadata?.color || '#7c3aed'
  const name = category.metadata?.name || category.title

  return (
    <span 
      className={`badge font-semibold rounded-full inline-flex items-center ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundColor: color, 
        color: '#ffffff'
      }}
    >
      {name}
    </span>
  )
}