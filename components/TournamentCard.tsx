import Link from 'next/link'
import type { TournamentCardProps } from '@/types'

export default function TournamentCard({ tournament, className = '' }: TournamentCardProps) {
  const tournamentImage = tournament.metadata?.tournament_image
  const status = tournament.metadata?.status
  const startDate = tournament.metadata?.start_date
  const endDate = tournament.metadata?.end_date
  const prizePool = tournament.metadata?.prize_pool

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Status styling
  const getStatusStyles = (statusKey: string) => {
    switch (statusKey) {
      case 'live':
        return 'bg-red-500 text-white animate-pulse'
      case 'upcoming':
        return 'bg-blue-500 text-white'
      case 'completed':
        return 'bg-gray-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <article className={`card p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <Link href={`/tournaments/${tournament.slug}`} className="block">
        {/* Tournament Image */}
        {tournamentImage && (
          <div className="relative overflow-hidden h-48 bg-muted">
            <img
              src={`${tournamentImage.imgix_url}?w=600&h=384&fit=crop&auto=format,compress`}
              alt={tournament.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {/* Status Badge */}
            {status && (
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusStyles(status.key)}`}>
                  {status.value}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
            {tournament.metadata?.tournament_name || tournament.title}
          </h3>

          {/* Description */}
          {tournament.metadata?.description && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {tournament.metadata.description}
            </p>
          )}

          {/* Tournament Details */}
          <div className="space-y-2 mb-4">
            {/* Date Range */}
            {startDate && (
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {formatDate(startDate)}
                  {endDate && ` - ${formatDate(endDate)}`}
                </span>
              </div>
            )}

            {/* Prize Pool */}
            {prizePool && (
              <div className="flex items-center text-sm text-accent font-semibold">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>{prizePool}</span>
              </div>
            )}
          </div>

          {/* Learn More */}
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold text-sm hover:underline">
              Learn More
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