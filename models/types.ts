export interface Film {
  id: number;
  thumbnail: string;
  rating: number;
  last_review_date: string;
}

export interface FilmList {
  films: Film[];
}

export interface Review {
  rating: number;
  review_date: string;
  scores: Record<string, number>;
}
export interface FilmDetail {
  id: number;
  tmdb?: number;
  title: string;
  original_title: string;
  image: string;
  language: string;
  release_date: string;
  rating: number;
  reviews: Review[];
}
