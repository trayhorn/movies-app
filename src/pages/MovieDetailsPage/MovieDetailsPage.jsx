import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useParams,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api";
import Loader from "../../components/utils/Loader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import style from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
	const [movieDetails, setMovieDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	const { movieId } = useParams();
	const location = useLocation();

	const backLinkRef = useRef(location.state?.from ?? "/movies");

	useEffect(() => {
		setLoading(true);
		getMovieDetails(movieId)
			.then((res) => {
				setMovieDetails(res.data);
			})
			.catch((e) => console.log(e))
			.finally(() => setLoading(false));
	}, [movieId]);

	return (
		<>
			<Link className={style.goBackButton} to={backLinkRef.current}>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : movieDetails ? (
				<MovieDetails detailsToRender={movieDetails} />
			) : (
				<div>Error</div>
			)}
			{location.pathname.includes("cast") ? (
				<NavLink
					className={style.link}
					to={"/".concat(
						location.pathname.slice(1, location.pathname.indexOf("cast") - 1)
					)}
				>
					Cast
				</NavLink>
			) : (
				<NavLink className={style.link} to="cast">
					Cast
				</NavLink>
			)}
			{location.pathname.includes("reviews") ? (
				<NavLink
					className={style.link}
					to={"/".concat(
						location.pathname.slice(1, location.pathname.indexOf("reviews") - 1)
					)}
				>
					Reviews
				</NavLink>
			) : (
				<NavLink className={style.link} to="reviews">
					Reviews
				</NavLink>
			)}
			{/* <NavLink className={style.link} to="cast">
				Cast
			</NavLink>
			<NavLink className={style.link} to="reviews">
				Reviews
			</NavLink> */}
			<Outlet />
		</>
	);
}
