import { Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import './MoviesList.scss';


export default function MoviesList({
	moviesToRender,
	renderIcon,
	renderDropdown,
}) {
	const location = useLocation();
	const { listId } = useParams();

	return (
		<ul className="gallery">
			{moviesToRender.map((movie) => {
				return (
					<li className="galleryItem" key={movie.id}>
						<Link
							to={`/movies/${movie.id}`}
							state={{ from: location }}
							className="link"
						>
							<div className="posterContainer">
								<img
									className="poster"
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>
							</div>
							<p className="movieTitle">{movie.title}</p>
						</Link>

						{renderIcon && renderIcon(listId, movie.id)}

						{renderDropdown && renderDropdown(movie)}
					</li>
				);
			})}
		</ul>
	);
}

MoviesList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	renderIcon: PropTypes.node,
	renderDropdown: PropTypes.node
};