import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/utils/Loader";
import "./HomePage.scss";
import { MovieToRender } from "../../types/types";

export default function HomePage() {
	const [movies, setMovies] = useState<MovieToRender[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchMovies() {
			try {
				setLoading(true);
				const { data } = await getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);
	return (
		<>
			<h1 className="HomePage_heading">Now trending</h1>
			{loading ? (
				<Loader />
			) : movies ? (
				<MoviesList moviesToRender={movies} />
			) : (
				<div>Error</div>
			)}
		</>
	);
}
