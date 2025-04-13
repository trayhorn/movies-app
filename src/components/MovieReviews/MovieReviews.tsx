import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../api';

type ReviewType = {
  id: string;
  author: string;
  content: string;
}

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState<ReviewType[] | []>([]);

  const { movieId } = useParams();

  useEffect(() => {
		getMovieReviews(movieId).then((res) => setMovieReviews(res.data.results));
	}, [movieId]);

  return <ul>{movieReviews.map(({id, author, content}: ReviewType) => {
    return (
      <li key={id}>
        <p>{author}</p>
        <p>{content}</p>
      </li>
    )
  })}</ul>;
}