import { useEffect, useState } from "react";
import axios from "axios";
import { getPopularMovies } from "../../api";

export default function HomePage() {
	const [movies, setMovies] = useState([]);

  const TOKEN =
		"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjEzZGE5MGEzOWViYTQ0YzgyY2UzZGI2YmMzODI1NiIsIm5iZiI6MTY3MjQwOTkxMS45NjIsInN1YiI6IjYzYWVmMzM3NWFkNzZiMDA5NGM3NTliNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O7XeFTi3Y6f78Lj4PpbUGh74sMF0PPe1RkeK-cd9nis";

	const options = {
		headers: {
			Authorization: TOKEN,
		},
	};

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
  })
  return (
		<main>
			<h1>HomePage</h1>
			<ul>
				{movies.map((movie) => {
					return (
						<li key={movie.id}>
							<a href="#">{movie.title}</a>
						</li>
					);
				})}
			</ul>
		</main>
	);
}