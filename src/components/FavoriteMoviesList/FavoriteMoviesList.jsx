import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./FavoriteMoviesList.scss";
import Dropdown from "./Dropdown";

export default function FavoriteMoviesList({ moviesToRender, lists }) {
	const location = useLocation();

	return (
		<ul className="favoritesList">
			{moviesToRender.map((movie) => {
				return (
					<li className="movie_card" key={movie.id}>
						<Link
							to={`/movies/${movie.id}`}
							state={{ from: location }}
							className="movie_link"
						>
							<div className="movie_posterContainer">
								<img
									className="movie_poster"
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>
							</div>
							<p className="movie_title">{movie.title}</p>
						</Link>
						{lists.length > 0 && <Dropdown movie={movie} lists={lists} />}
					</li>
				);
			})}
		</ul>
	);
}

FavoriteMoviesList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	lists: PropTypes.array
};
