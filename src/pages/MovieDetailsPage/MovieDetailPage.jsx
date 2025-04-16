import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchGenres } from "../../api";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    backdrop_path,
    original_title,
    overview,
    genres = [],
  } = location.state || {};
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleGoBack}>← Go back</button>
      <div>
        <h2>{original_title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="" />
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <Link to="cast" state={location.state}>
          Cast
        </Link>
        <Link to="reviews" state={location.state}>
          Reviews
        </Link>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailPage;
