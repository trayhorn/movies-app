import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import style from "./HomePage.module.css";

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
		<>
			<h1 className={style.title}>Now trending</h1>
			<MoviesList moviesToRender={movies} />
		</>
	);
}