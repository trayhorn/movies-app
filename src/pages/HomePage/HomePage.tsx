import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/utils/Loader";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { MovieToRender } from "../../types/types";
import "./HomePage.scss";

export default function HomePage() {
	const [movies, setMovies] = useState<MovieToRender[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		async function fetchMovies() {
			try {
				setError(false);
				setLoading(true);
				const { data } = await getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);
	return (
		<>
			<h1 className="HomePage_heading">Now trending</h1>
			{loading && <Loader />}
			{movies.length > 0 && (
				<MoviesList moviesToRender={movies} />)}
			{error && <ErrorComponent />}
		</>
	);
}