import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const url = "https://api.themoviedb.org/3/trending/movie/day";

const options = {
  headers: {
    Authorization: `${API_KEY}`,
  },
};

export const fetchMovies = async () => {
  const response = await axios.get(url, options);
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list",
    options
  );
  return response.data.genres;
};
