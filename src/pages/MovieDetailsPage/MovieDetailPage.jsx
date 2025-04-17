import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import s from "./MovieDetailPage.module.css";
import { v4 as uuidv4 } from "uuid";

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    from,
    backdrop_path,
    original_title,
    overview,
    genres = [],
  } = location.state || {};

  const handleGoBack = () => {
    if (from) {
      navigate(from);
    } else {
      navigate("/movies");
    }
  };

  return (
    <>
      <button onClick={handleGoBack}>← Go back</button>

      <div className={s.container}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w400${backdrop_path}`}
          alt=""
        />
        <div className={s.overviewContainer}>
          <h2>{original_title}</h2>
          <h3>Overview</h3>
          <p>{overview}</p>

          <h3>Genres</h3>
          <ul>
            {genres.length > 0 ? (
              genres.map((genre) => <li key={uuidv4()}>{genre.name}</li>)
            ) : (
              <p>No genres available</p>
            )}
          </ul>
        </div>
      </div>
      <h4>Additional info</h4>
      <div>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default MovieDetailPage;
