import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const TOKEN =
		"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjEzZGE5MGEzOWViYTQ0YzgyY2UzZGI2YmMzODI1NiIsIm5iZiI6MTY3MjQwOTkxMS45NjIsInN1YiI6IjYzYWVmMzM3NWFkNzZiMDA5NGM3NTliNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O7XeFTi3Y6f78Lj4PpbUGh74sMF0PPe1RkeK-cd9nis";

	const options = {
		headers: {
			Authorization: TOKEN,
		},
	};

  useEffect(() => {
    function fetchMovies() {
			return axios
				.get("https://api.themoviedb.org/3/movie/popular", options)
				.then(({ data }) => console.log(data));
		}

		fetchMovies();
  })
  return (
    <div>HomePage</div>
  )
}