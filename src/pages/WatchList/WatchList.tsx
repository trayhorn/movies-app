import { useEffect, useState } from "react";
import { getWatchlistMovies } from "../../api/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/utils/Loader";
import { MovieToRender } from "../../types/types";

export default function WatchList() {
	const [watchListMovies, setWatchListMovies] = useState<MovieToRender[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		async function fetchWatchList() {
			try {
				setLoading(true);
				const { data } = await getWatchlistMovies();
				setWatchListMovies(data.results);
			} catch (e) {
				console.log(e);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchWatchList();
	}, []);

	return (
		<>
			{loading && <Loader />}
			{watchListMovies && <MoviesList moviesToRender={watchListMovies} />}
			{error && <div>Something went wrong</div>}
		</>
	);
}
