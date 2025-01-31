import style from './MovieDetails.module.css';
import PropTypes from 'prop-types';
import { addToFavorites, addToWatchList, getFavoriteMovies, getWatchlistMovies, removeFromFavorites, removeFromWatchList } from "../../api";
import { useEffect, useState } from 'react';
import {
	addedToFavoritesToast,
	removedFromFavoritesToast,
	removedFromWishListToast,
	addedToWishListToast,
	errorToast,
} from "../../toasts";

export default function MovieDetails({ detailsToRender }) {
	const {
		id,
		poster_path,
		original_title,
		overview,
		budget,
		genres,
		release_date,
		videos,
	} = detailsToRender;

	const [isInFavorites, setIsInFavorites] = useState(false);
	const [inWatchList, setInWatchList] = useState(false);

  const trailer =
		videos.results.find((el) => el.name === "Official Trailer") ||
		videos.results.filter((el) => el.type === "Trailer")[0] ||
		videos.results[0];

	const handleFavorite = async (movieId) => {
		if (isInFavorites) {
			try {
				await removeFromFavorites(movieId);
				removedFromFavoritesToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		} else {
			try {
				await addToFavorites(movieId);
				addedToFavoritesToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		}
		setIsInFavorites((prevState) => !prevState);
	}

	const handleWatchList = async (movieId) => {
		if (inWatchList) {
			try {
				await removeFromWatchList(movieId);
				removedFromWishListToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		} else {
			try {
				await addToWatchList(movieId);
				addedToWishListToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		}
		setInWatchList((prevState) => !prevState);
	};

	useEffect(() => {
		async function checkFavorites() {
			try {
				const { data } = await getFavoriteMovies();
				if (data.results.find((el) => el.id === id)) {
					setInWatchList(true);
				}
			} catch (error) {
				console.log(error);
			}
		}
		async function checkWishList() {
			try {
				const { data } = await getWatchlistMovies();
				if (data.results.find((el) => el.id === id)) {
					setInWatchList(true);
				}
			} catch (error) {
				console.log(error);
			}
		}

		checkFavorites();
		checkWishList();
	}, [id]);

	return (
		<div className={style.detailsContainer}>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/w400${poster_path}`}
					alt="poster"
				/>
				<button onClick={() => handleFavorite(id)}>
					{isInFavorites ? "Remove from" : "Add to"} favorites
				</button>
				<button onClick={() => handleWatchList(id)}>
					{inWatchList ? "Remove from" : "Add to"} watchlist
				</button>
			</div>
			<div className={style.overviewContainer}>
				<h1>{original_title}</h1>
				<p>{overview}</p>
				<p>Budget: {budget / 100}</p>
				<p>Genres: {genres?.map((el) => el.name).join(", ")}</p>
				<p>Release date: {release_date}</p>

				<iframe
					className={style.player}
					title="movie trailer"
					allow="fullscreen"
					src={`https://www.youtube.com/embed/${trailer.key}`}
				></iframe>
			</div>
		</div>
	);
}

MovieDetails.propTypes = {
	detailsToRender: PropTypes.shape({
		id: PropTypes.number,
		poster_path: PropTypes.string,
		original_title: PropTypes.string,
		budget: PropTypes.number,
		genres: PropTypes.array,
		release_date: PropTypes.string,
		overview: PropTypes.string,
		videos: PropTypes.object,
	}),
};