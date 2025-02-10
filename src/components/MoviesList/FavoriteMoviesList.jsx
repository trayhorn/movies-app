import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./FavoriteMoviesList.scss";
import { useEffect, useState, useRef } from "react";

export default function FavoriteMoviesList({ moviesToRender, lists }) {
	const location = useLocation();

	const [openId, setOpenId] = useState(false);

	const handleClick = (e) => {
		if (e.target.classList.contains('add-button') || e.target.classList.contains('.dropdown') || e.target.classList.contains('.dropdown li')) {
			return;
		} else {
			setOpenId(null);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, []);

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
						<div className="addToListWrapper">
							<button className="add-button" onClick={() => setOpenId(movie.id === openId ? null : movie.id)}>Add</button>
							<div className="addToList">
								{openId === movie.id && (
									<ul className="dropdown">{lists.map(el => {
										return <li key={el.id}>{el.name}</li>
									})}</ul>
								)}
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

FavoriteMoviesList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
};
