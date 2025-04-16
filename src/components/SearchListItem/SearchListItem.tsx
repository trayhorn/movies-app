import style from "./SearchListItem.module.css";
import { Link, Location } from "react-router-dom";
import RatingStars from "../utils/RatingStars";
import { MovieToRender, Genre } from "../../types/types";

type SearchListItemType = {
	movie: MovieToRender;
	location: Location;
	genresList: Genre[];
};

export default function SearchListItem({
	movie,
	location,
	genresList,
}: SearchListItemType) {
	const genres = genresList
		.filter((el) => movie.genre_ids.includes(el.id))
		.map((el) => el.name)
		.join(", ");

	return (
		<li key={movie.id} id={String(movie.id)}>
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
					<p>
						Release date: {movie.release_date.split("-").reverse().join("-")}
					</p>
					<div className={style.rating}>
						<RatingStars rating={movie.vote_average} />
					</div>
					<p>Votes {movie.vote_count}</p>
				</div>
			</Link>
		</li>
	);
}