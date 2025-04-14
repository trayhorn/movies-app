import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useParams,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api/api";
import Loader from "../../components/utils/Loader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import "./MovieDetailsPage.scss";
import { MovieDetailsType } from "../../types/types";

export default function MovieDetailsPage() {
	const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const { movieId } = useParams();
	const location = useLocation();

	const backLinkRef = useRef(location.state?.from ?? "/movies");

	const calculateLinkPath = (keyword: string): string => {
		if (location.pathname.includes(keyword)) {
			return "/".concat(
				location.pathname.slice(1, location.pathname.indexOf(keyword) - 1)
			);
		} else {
			return keyword;
		}
	};

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
			<Link
				className="MovieDetailsPage_go-back-button"
				to={backLinkRef.current}
				state={{ movieIdfrom: movieId }}
			>
				Go back
			</Link>

			{loading ? (
				<Loader />
			) : movieDetails ? (
				<MovieDetails detailsToRender={movieDetails} />
			) : (
				<div>Error</div>
			)}

			<NavLink className="MovieDetailsPage_link" to={calculateLinkPath("cast")}>
				Cast
			</NavLink>
			<NavLink
				className="MovieDetailsPage_link"
				to={calculateLinkPath("reviews")}
			>
				Reviews
			</NavLink>
			<Outlet />
		</>
	);
}
