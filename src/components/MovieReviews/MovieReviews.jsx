import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadReviews();
  }, [movieId]);
  return (
    <div>
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
