import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api";
import style from './MovieDetailsPage.module.css';


export default function MovieDetailsPage() {
	const [movieDetails, setMovieDetails] = useState(null);
	const { movieId } = useParams();
	const location = useLocation();

	const backLinkRef = useRef(location.state?.from ?? "/movies");

	useEffect(() => {
		getMovieDetails(movieId)
			.then((res) => {
				setMovieDetails(res.data);
			})
			.catch((e) => console.log(e))
	}, [movieId]);

	const key = movieDetails?.videos.results.find(el => el.name === 'Official Trailer').key;

  return (
		<>
			<Link className={style.goBackButton} to={backLinkRef.current}>
				Go back
			</Link>
			{movieDetails && (
				<div className={style.detailsContainer}>
					<div>
						<img
							src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`}
							alt="poster"
						/>
					</div>
					<div className={style.overviewContainer}>
						<h1>{movieDetails.original_title}</h1>
						<p>{movieDetails.overview}</p>
						<p>Budget: {movieDetails.budget / 100}</p>
						<p>
							Genres: {movieDetails.genres?.map((el) => el.name).join(", ")}
						</p>
						<p>Release date: {movieDetails.release_date}</p>

						<iframe
							className={style.player}
							title="movie trailer"
							allow="fullscreen"
							src={`https://www.youtube.com/embed/${key}`}
						></iframe>
					</div>
				</div>
			)}
			<NavLink className={style.link} to="cast">
				Cast
			</NavLink>
			<NavLink className={style.link} to="reviews">
				Reviews
			</NavLink>
			<Outlet />
		</>
	);
}
