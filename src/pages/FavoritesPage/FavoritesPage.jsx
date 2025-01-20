import { useEffect, useState } from "react";
import { getFavoriteMovies, removeFromFavorites } from "../../api";
import Loader from "../../components/utils/Loader";
import MoviesList from "../../components/MoviesList/MoviesList";
import { errorToast } from "../../toasts";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const removeMovieFromFavorites = async (movieId) => {
		try {
			await removeFromFavorites(movieId);
			const { data } = await getFavoriteMovies();
			setFavorites(data.results);
		} catch (error) {
			errorToast();
			console.log(error.message);
		}
	};

  useEffect(() => {
		async function fetchFavorites() {
			try {
				setLoading(true);
				const { data } = await getFavoriteMovies();
				setFavorites(data.results);
			} catch (error) {
				console.log(error.message);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchFavorites();
	}, []);

	return (
		<>
			{loading && <Loader />}
			{favorites && (
				<MoviesList
					moviesToRender={favorites}
					handleFavorites={removeMovieFromFavorites}
					icon={"remove"}
				/>
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}