import { Link, useLocation } from "react-router-dom";

const MovieList = ({ data }) => {
  const location = useLocation();
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <Link
            to={`/movies/${item.id.toString()}`}
            state={{
              from: location,
              backdrop_path: item.backdrop_path,
              original_title: item.original_title,
              overview: item.overview,
              genres: item.genres,
            }}
          >
            {item.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
