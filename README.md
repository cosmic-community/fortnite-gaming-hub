# Fortnite Gaming Hub

![App Preview](https://imgix.cosmicjs.com/88ab7900-a045-11ed-81f2-f50e185dd248-78A265wPiO4.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive gaming hub for Fortnite enthusiasts featuring the latest news, guides, tournament coverage, and community content. Built with Next.js 15, TypeScript, and Tailwind CSS, powered by Cosmic CMS.

## Features

- 🎮 **Game Posts** - Latest news, guides, reviews, and updates
- 🏆 **Tournament Tracking** - Live tournament coverage with status updates and prize pools
- 📂 **Category Organization** - Content organized by Battle Royale, Creative Mode, and Esports
- 🎨 **Modern Design** - Gaming-inspired UI with vibrant colors and smooth animations
- 📱 **Responsive Layout** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Fast loading with image optimization
- 🔍 **SEO Ready** - Dynamic metadata and structured content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d6dd88e4b13704227fb975&clone_repository=68d6df0ae4b13704227fb994)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "game website with fortnite"

### Code Generation Prompt

> Based on the content model I created for "game website with fortnite", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the gaming content model

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Game Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all game posts with categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'game-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured posts only
const { objects: featuredPosts } = await cosmic.objects
  .find({ 
    type: 'game-posts',
    'metadata.featured': true 
  })
  .depth(1)
```

### Fetching Tournaments
```typescript
// Get upcoming tournaments
const { objects: tournaments } = await cosmic.objects
  .find({ 
    type: 'tournaments',
    'metadata.status.key': 'upcoming'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Categories
```typescript
// Get all categories with metadata
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with three main content types in your Cosmic bucket:

### Game Posts
- **Title** - Post title and slug generation
- **Content** - Rich HTML content for articles and guides  
- **Featured Image** - Hero images with imgix optimization
- **Category** - Connected to Categories object type
- **Post Type** - Select dropdown: News, Guide, Review, Update
- **Featured** - Boolean switch for highlighting important posts

### Categories
- **Name** - Category display name
- **Description** - Category description text
- **Color** - Hex color for category badges and theming

### Tournaments  
- **Tournament Name** - Event title
- **Description** - Tournament details and information
- **Start/End Date** - Event scheduling
- **Prize Pool** - Tournament prize information
- **Tournament Image** - Event promotional images
- **Status** - Select dropdown: Upcoming, Live, Completed

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic builds on push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->