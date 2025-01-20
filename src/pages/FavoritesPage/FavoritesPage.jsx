import { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { removeFromFavorites } from "../../api";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);

	const fetchFavorites = () => {
		getFavoriteMovies()
			.then((res) => setFavorites(res.data.results))
			.catch((e) => console.log(e));
	}

	const removeMovieFromFavorites = async (movieId) => {
		try {
			await removeFromFavorites(movieId);
			fetchFavorites();
		} catch (error) {
			console.log(error);
		}
	};

  useEffect(() => {
		fetchFavorites();
	}, []);

	return (
		<>
			{favorites && (
				<MoviesList
					moviesToRender={favorites}
					handleFavorites={removeMovieFromFavorites}
					icon={"remove"}
				/>
			)}
		</>
	);
}