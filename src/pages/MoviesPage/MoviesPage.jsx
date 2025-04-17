import { Field, Formik, Form } from "formik";
import { searchMovies, fetchGenres, fetchMovies } from "../../api";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genresMap, setGenresMap] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, backdrop_path, original_title, overview } =
    location.state || {};
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        const genreMap = {};
        genresData.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenresMap(genreMap);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (!query) return;
    const loadSearch = async () => {
      try {
        const response = await searchMovies(query);

        const enrichedMovies = response.map((movie) => ({
          ...movie,
          genres:
            movie.genre_ids?.map((id) => ({
              id,
              name: genresMap[id] || "Unknown",
            })) || [],
        }));

        setMovies(enrichedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    loadSearch();
  }, [query, genresMap]);
  const handleSubmit = (values, action) => {
    setSearchParams({ query: values.query });
    action.resetForm();
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <button onClick={handleGoBack}>← Go back</button>
      <Formik onSubmit={handleSubmit} initialValues={{ query: "" }}>
        <Form>
          <Field type="text" name="query" placeholder="Search movie..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      <MovieList data={movies} />
    </div>
  );
};

export default MoviesPage;
