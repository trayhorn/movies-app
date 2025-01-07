import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../../api";

export default function HomePage() {
	const [movies, setMovies] = useState([]);

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
			<h1>HomePage</h1>
			<ul>
				{movies.map((movie) => {
					return (
						<li key={movie.id}>
							<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}