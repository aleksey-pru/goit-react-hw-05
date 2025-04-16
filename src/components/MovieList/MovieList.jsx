import { Link } from "react-router-dom";

const MovieList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <Link
            to={`/movies/${item.id.toString()}`}
            state={{
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
