import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPopularMovies } from "../../api";
import style from "./HomePage.module.css";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const location = useLocation();

  useEffect(() => {
    async function fetchMovies() {
			try {
				const {data} = await getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMovies();
  }, [])
  return (
		<main>
			<h1 className={style.title}>Now trending</h1>
			<ul className={style.gallery}>
				{movies.map((movie) => {
					return (
						<li className={style.galleryItem} key={movie.id}>
							<Link
								to={`/movies/${movie.id}`}
								state={{ from: location }}
								className={style.link}
							>
								<div>
									<img
										className={style.poster}
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt=""
									/>
								</div>
								<p className={style.movieTitle}>{movie.title}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}