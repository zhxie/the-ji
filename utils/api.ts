import { FilmList, FilmDetail } from "../models/types";

export const fetchFilmList = async () => {
  const res = await fetch("https://raw.fastgit.org/zhxie/the-ji/data/data/movie-list.json");
  if (res.status != 200 && res.status != 304) {
    return;
  }
  const json = await res.json();
  return json as FilmList;
};

export const fetchFilm = async (id: number) => {
  const res = await fetch(`https://raw.fastgit.org/zhxie/the-ji/data/data/films/${id}.json`);
  if (res.status != 200 && res.status != 304) {
    return;
  }
  const json = await res.json();
  return json as FilmDetail;
};
