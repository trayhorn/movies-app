import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api";
import style from './MovieDetailsPage.module.css';


export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
	const { movieId } = useParams();
	const location = useLocation();

	const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    getMovieDetails(movieId)
			.then((res) => setMovieDetails(res.data))
			.catch((e) => console.log(e));
  }, [movieId]);

  return (
		<main>
			<Link className={style.goBackButton} to={backLinkRef.current}>Go back</Link>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
					alt="poster"
				/>
			</div>
			<h1>{movieDetails.original_title}</h1>
			<p>{movieDetails.overview}</p>
			<NavLink className={style.link} to="cast">
				Cast
			</NavLink>
			<NavLink className={style.link} to="reviews">
				Reviews
			</NavLink>
			<Outlet />
		</main>
	);
}