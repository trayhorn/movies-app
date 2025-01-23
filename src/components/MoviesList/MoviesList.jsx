import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import style from './MoviesList.module.css';
import { GoHeartFill } from "react-icons/go";
import { FaHeartBroken } from "react-icons/fa";
import { getFavoriteMovies } from "../../api";
import { alreadyInFavoritesToast } from "../../toasts";

export default function MoviesList({
	moviesToRender,
	handleFavorites,
	icon = "add",
}) {
	const location = useLocation();

	const onIconClick = async (e, movieId) => {
		e.preventDefault();
		try {
			const { data } = await getFavoriteMovies();
			const existingFavorite = data.results.find(el => el.id === movieId);
			if (existingFavorite && icon === 'add') {
				alreadyInFavoritesToast();
				return;
			}
			handleFavorites(movieId);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<ul className={style.gallery}>
			{moviesToRender.map((movie) => {
				return (
					<li className={style.galleryItem} key={movie.id}>
						<Link
							to={`/movies/${movie.id}`}
							state={{ from: location }}
							className={style.link}
						>
							<div className={style.posterContainer}>
								<img
									className={style.poster}
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>
								<button
									className={style.favoritesButton}
									onClick={(e) => onIconClick(e, movie.id)}
								>
									{icon === "add" ? (
										<GoHeartFill size={30} className={style.favoritesIcon} />
									) : (
										<FaHeartBroken size={30} className={style.favoritesIcon} />
									)}
								</button>
							</div>
							<p className={style.movieTitle}>{movie.title}</p>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

MoviesList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	handleFavorites: PropTypes.func,
	icon: PropTypes.string
};