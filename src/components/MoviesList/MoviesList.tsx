import { Link, useLocation, useParams } from "react-router-dom";
import './MoviesList.scss';
import { MovieToRender } from "../../types/types";

type MoviesList = {
	moviesToRender: MovieToRender[];
	renderIcon?: (listId: string, movieId: string) => JSX.Element;
	renderDropdown?: (movie: MovieToRender) => JSX.Element;
};


export default function MoviesList({
	moviesToRender,
	renderIcon,
	renderDropdown,
}: MoviesList) {
	const location = useLocation();
	const { listId } = useParams();
	console.log(" in MoviesList: ", listId);

	return (
		<ul className="gallery">
			{moviesToRender.map((movie: MovieToRender) => {
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

						{renderIcon && listId && renderIcon(listId, movie.id)}

						{renderDropdown && renderDropdown(movie)}
					</li>
				);
			})}
		</ul>
	);
}