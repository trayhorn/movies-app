import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api";


export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId)
			.then((res) => setMovieDetails(res.data))
			.catch((e) => console.log(e));
  }, [movieId]);

  return (
		<main>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
					alt="poster"
				/>
			</div>
			<h1>{movieDetails.original_title}</h1>
			<p>{movieDetails.overview}</p>
			<Link to="cast">Cast</Link>
			<Link to="reviews">Reviews</Link>
			<Outlet />
		</main>
	);
}