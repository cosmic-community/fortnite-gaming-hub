import { createBucketClient } from '@cosmicjs/sdk'
import type { GamePost, Tournament, Category, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all game posts with categories
export async function getGamePosts(): Promise<GamePost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as GamePost[];
    
    // Sort by created date, newest first
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching game posts:', error);
    throw new Error('Failed to fetch game posts');
  }
}

// Get featured posts only
export async function getFeaturedPosts(): Promise<GamePost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'game-posts',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as GamePost[];
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured posts:', error);
    throw new Error('Failed to fetch featured posts');
  }
}

// Get single game post by slug
export async function getGamePost(slug: string): Promise<GamePost | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'game-posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    if (!response.object) {
      return null;
    }
    
    return response.object as GamePost;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching game post:', error);
    throw new Error('Failed to fetch game post');
  }
}

// Get all tournaments
export async function getTournaments(): Promise<Tournament[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tournaments' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const tournaments = response.objects as Tournament[];
    
    // Sort by start date, upcoming first
    return tournaments.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateA - dateB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching tournaments:', error);
    throw new Error('Failed to fetch tournaments');
  }
}

// Get single tournament by slug
export async function getTournament(slug: string): Promise<Tournament | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'tournaments',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    if (!response.object) {
      return null;
    }
    
    return response.object as Tournament;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching tournament:', error);
    throw new Error('Failed to fetch tournament');
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Get posts by category
export async function getPostsByCategory(categoryId: string): Promise<GamePost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'game-posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as GamePost[];
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
}

// Get posts by type
export async function getPostsByType(postType: string): Promise<GamePost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'game-posts',
        'metadata.post_type.key': postType
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as GamePost[];
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts by type:', error);
    throw new Error('Failed to fetch posts by type');
  }
}