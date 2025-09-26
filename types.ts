// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  bucket?: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
  created_by?: string;
  modified_by?: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Tournament interface
export interface Tournament extends CosmicObject {
  type: 'tournaments';
  metadata: {
    tournament_name: string;
    description?: string;
    start_date: string;
    end_date?: string;
    prize_pool?: string;
    tournament_image?: {
      url: string;
      imgix_url: string;
    };
    status: {
      key: TournamentStatus;
      value: string;
    };
  };
}

// Game Post interface
export interface GamePost extends CosmicObject {
  type: 'game-posts';
  metadata: {
    title: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
    post_type: {
      key: PostType;
      value: string;
    };
    featured: boolean;
  };
}

// Type literals for select-dropdown values
export type TournamentStatus = 'upcoming' | 'live' | 'completed';
export type PostType = 'news' | 'guide' | 'review' | 'update';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Component prop types
export interface PostCardProps {
  post: GamePost;
  showCategory?: boolean;
  className?: string;
}

export interface TournamentCardProps {
  tournament: Tournament;
  className?: string;
}

export interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface HeroSectionProps {
  featuredPost?: GamePost;
  className?: string;
}

export interface NavigationProps {
  categories: Category[];
}

// Utility types
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreateGamePostData = Omit<GamePost, 'id' | 'created_at' | 'modified_at'>;

// Type guards
export function isGamePost(obj: CosmicObject): obj is GamePost {
  return obj.type === 'game-posts';
}

export function isTournament(obj: CosmicObject): obj is Tournament {
  return obj.type === 'tournaments';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Helper types for safe property access
export type SafeGamePost = GamePost & {
  metadata: Required<Pick<GamePost['metadata'], 'title' | 'content' | 'post_type' | 'featured'>> &
    Partial<Pick<GamePost['metadata'], 'featured_image' | 'category'>>;
};

export type SafeTournament = Tournament & {
  metadata: Required<Pick<Tournament['metadata'], 'tournament_name' | 'start_date' | 'status'>> &
    Partial<Pick<Tournament['metadata'], 'description' | 'end_date' | 'prize_pool' | 'tournament_image'>>;
};

export type SafeCategory = Category & {
  metadata: Required<Pick<Category['metadata'], 'name'>> &
    Partial<Pick<Category['metadata'], 'description' | 'color'>>;
};