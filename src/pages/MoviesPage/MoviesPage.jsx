import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchedMovies, addToFavorites } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import style from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get('query') ?? '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
	}

	useEffect(() => {
		if (searchQuery === "") {
			return;
		} else {
			async function findMovie() {
				try {
					const { data } = await getSearchedMovies(searchQuery);
					setSearchedMovies(data.results);
				} catch (error) {
					console.log(error);
				}
			}
			findMovie();
		}
	}, [searchQuery]);

  return (
		<>
			<form className={style.searchForm} onSubmit={handleSubmit}>
				<label className={style.searchLabel}>
					What are you looking for?
					<input
						className={style.searchInput}
						autoComplete="off"
						type="text"
						name="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</label>

				<button className={style.searchButton} type="submit">
					Search
				</button>
			</form>
			{searchQuery !== "" && (
				<MoviesList
					moviesToRender={searchedMovies}
					handleFavorites={addToFavorites}
				/>
			)}
		</>
	);
}