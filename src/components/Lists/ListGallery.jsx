// This component is almost identical to MoviesList

import { Link, useLocation, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import style from "../MoviesList/MoviesList.module.css";
import "./ListGallery.scss";

export default function ListGallery({ moviesToRender, handleClick }) {
	const { listId } = useParams();
	const location = useLocation();

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
							</div>
							<p className={style.movieTitle}>{movie.title}</p>
						</Link>
						<div className="delete-icon_container">
							<RxCross2
								size="1.5rem"
								className="icon"
								onClick={() => handleClick(listId, movie.id)}
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

ListGallery.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	handleClick: PropTypes.func
};
