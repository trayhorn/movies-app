import style from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../api';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
		getMovieReviews(movieId).then((res) => setMovieReviews(res.data.results));
	}, [movieId]);

  return <ul>{movieReviews.map(({id, author, content}) => {
    return (
      <li key={id}>
        <p>{author}</p>
        <p>{content}</p>
      </li>
    )
  })}</ul>;
}