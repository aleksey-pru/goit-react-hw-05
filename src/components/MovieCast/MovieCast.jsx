import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const loadCast = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error("Failed to load cast:", error);
      }
    };
    loadCast();
  }, [movieId]);
  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt=""
          />
          {actor.name} <br />
          Character: {actor.character}
        </li>
      ))}
    </ul>
  );
};
export default MovieCast;
