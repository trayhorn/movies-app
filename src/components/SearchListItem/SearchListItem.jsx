import style from "./SearchListItem.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function SearchListItem({ movie, location, genresList }) {

	const genres = genresList
		.filter((el) => movie.genre_ids.includes(el.id))
		.map(el => el.name)
		.join(', ');



	return (
		<li key={movie.id}>
			<Link
				to={`/movies/${movie.id}`}
				state={{ from: location }}
				className={style.searchedItem}
			>
				<div className={style.posterContainer}>
					<img
						className={style.poster}
						src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
						alt={movie.title}
					/>
				</div>
				<div className={style.infoContainer}>
					<p className={style.movieTitle}>{movie.title}</p>
					<p className={style.overview}>{movie.overview}</p>
					<p>Genres: {genres}</p>
					<p>Release date: {movie.release_date}</p>
					<p className={style.rating}>Rating {movie.vote_average.toFixed(2)}</p>
					<p>Votes {movie.vote_count}</p>
				</div>
			</Link>
		</li>
	);
}

SearchListItem.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number,
		poster_path: PropTypes.string,
		title: PropTypes.string,
		release_date: PropTypes.string,
		overview: PropTypes.string,
		vote_count: PropTypes.number,
		vote_average: PropTypes.number,
		genre_ids: PropTypes.array
	}),
	location: PropTypes.object,
	genresList: PropTypes.arrayOf(PropTypes.shape),
};