import { getGamePosts, getFeaturedPosts, getTournaments, getCategories } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import PostCard from '@/components/PostCard'
import TournamentCard from '@/components/TournamentCard'
import CategoryFilter from '@/components/CategoryFilter'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, featuredPosts, tournaments, categories] = await Promise.all([
    getGamePosts(),
    getFeaturedPosts(),
    getTournaments(),
    getCategories(),
  ])

  const featuredPost = featuredPosts[0]
  const recentPosts = posts.slice(0, 6)
  const upcomingTournaments = tournaments.filter(t => t.metadata?.status?.key === 'upcoming').slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && (
        <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <HeroSection featuredPost={featuredPost} />
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <CategoryFilter categories={categories} />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Posts</h2>
              <p className="text-muted-foreground">Stay up to date with the latest Fortnite news and guides</p>
            </div>
            <Link 
              href="/posts" 
              className="btn-primary hidden sm:inline-flex hover:scale-105 transition-transform"
            >
              View All Posts
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {recentPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  showCategory={true}
                  className="animate-fade-in"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No posts available at the moment.</p>
            </div>
          )}

          <div className="text-center sm:hidden">
            <Link href="/posts" className="btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      {upcomingTournaments.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Upcoming Tournaments</h2>
                <p className="text-muted-foreground">Don't miss these exciting competitive events</p>
              </div>
              <Link 
                href="/tournaments" 
                className="btn-secondary hidden sm:inline-flex hover:scale-105 transition-transform"
              >
                View All Tournaments
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
              {upcomingTournaments.map((tournament) => (
                <TournamentCard 
                  key={tournament.id} 
                  tournament={tournament}
                  className="animate-slide-up"
                />
              ))}
            </div>

            <div className="text-center sm:hidden">
              <Link href="/tournaments" className="btn-secondary">
                View All Tournaments
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}