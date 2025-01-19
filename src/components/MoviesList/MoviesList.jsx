import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import style from './MoviesList.module.css';
import { GoHeartFill } from "react-icons/go";
import { addToFavorites } from "../../api";

export default function MoviesList({ moviesToRender }) {
  const location = useLocation();

  const handleIconClick = async (e, movieId) => {
    e.preventDefault();
    await addToFavorites(16758631, movieId);
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
									alt=""
								/>
								<button
									className={style.favoritesButton}
									onClick={(e) => handleIconClick(e, movie.id)}
								>
									<GoHeartFill size={30} className={style.favoritesIcon} />
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
	moviesToRender: PropTypes.arrayOf(PropTypes.shape)
};