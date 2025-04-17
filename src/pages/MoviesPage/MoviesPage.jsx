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
  // const [genresMap, setGenresMap] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    from,
    backdrop_path,
    original_title,
    overview,
    // genres = [],
  } = location.state || {};
  const query = searchParams.get("query") || "";
  // useEffect(() => {
  //   const loadGenres = async () => {
  //     try {
  //       const genres = await fetchGenres();
  //       const genreMap = genres.reduce((acc, genre) => {
  //         acc[genre.id] = genre.name;
  //         return acc;
  //       }, {});
  //       setGenresMap(genreMap);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadGenres();
  // }, [genres]);
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
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
        setMovies(response);
      } catch (error) {
        console.log(error);
      }
    };
    loadSearch();
  }, [query]);
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
