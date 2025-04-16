import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/movie/day";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmNjNDQ5ZTU0OGQ3ZGE5OTE1ZWNiMGRiYmRlZDNiMCIsIm5iZiI6MTc0NDgxNzc3OS4xMzkwMDAyLCJzdWIiOiI2N2ZmY2U3M2VmNWFlNjg3Y2JkOWFiZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EjsuCvUuL6jvPzmt86kgtBBQyhbCzDn3iuxQNerUerw",
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
