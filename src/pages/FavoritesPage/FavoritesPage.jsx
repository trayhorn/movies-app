import { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../api";
import Loader from "../../components/utils/Loader";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);


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
				/>
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}