export interface Movie {
  id: number;
  thumbnail: string;
  rating: number;
  last_review_date: string;
}

export interface MovieList {
  movies: Movie[];
}

export interface MovieDetail {
  id: number;
  tmdb?: number;
  title: string;
  original_title: string;
  image: string;
  language: string;
  release_date: string;
  rating: number;
  reviews: {
    rating: number;
    review_date: string;
    scores: Record<string, number>;
  };
}
