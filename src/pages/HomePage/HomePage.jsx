import { useEffect, useState } from "react";
import { fetchGenres, fetchMovies } from "../../api";

import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          fetchMovies(),
          fetchGenres(),
        ]);

        const genreMap = {};
        genresData.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });

        const moviesWithGenres = moviesData.map((movie) => ({
          ...movie,
          genres: movie.genre_ids.map((id) => ({
            id,
            name: genreMap[id],
          })),
        }));

        setMovies(moviesWithGenres);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);
  return (
    <div>
      <h2>Trending today</h2>
      <MovieList data={movies} />
    </div>
  );
};

export default HomePage;
