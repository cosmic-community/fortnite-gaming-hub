'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Category } from '@/types'

interface NavigationProps {
  categories: Category[]
}

export default function Navigation({ categories }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">
              Fortnite Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Posts
            </Link>
            <Link 
              href="/tournaments" 
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Tournaments
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-foreground hover:text-primary font-medium transition-colors flex items-center space-x-1">
                <span>Categories</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.metadata?.color || '#7c3aed' }}
                        />
                        <span>{category.metadata?.name || category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="block text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/posts" 
                className="block text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                href="/tournaments" 
                className="block text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="flex items-center space-x-2 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.metadata?.color || '#7c3aed' }}
                    />
                    <span>{category.metadata?.name || category.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}