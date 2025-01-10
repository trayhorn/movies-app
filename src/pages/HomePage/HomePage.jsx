import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import style from "./HomePage.module.css";
import Loader from "../../components/utils/Loader";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
			try {
				setLoading(true);
				const {data} = await getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
			
		}

		fetchMovies();
  }, [])
  return (
		<>
			<h1 className={style.title}>Now trending</h1>
			{loading ? <Loader /> : <MoviesList moviesToRender={movies} />}
		</>
	);
}