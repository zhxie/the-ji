import MovieListData from "../data/movie-list.json";
import MovieData from "../data/movie.json";
import { MovieList, MovieDetail } from "../models/types";

export const fetchMovieList = async () => {
  const json = MovieListData;
  return json as MovieList;
};

export const fetchMovie = async (id: number) => {
  const json = MovieData[id];
  return json as MovieDetail;
};
