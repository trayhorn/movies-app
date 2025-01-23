import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	getSearchedMovies,
	addToFavorites,
	getAllGenres,
	discoverMovie,
} from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import style from './MoviesPage.module.css';
import { Formik, Field, Form } from "formik";

export default function MoviesPage() {
	const [searchedMovies, setSearchedMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [genresList, setGenresList] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get('query') ?? '';
	const year = searchParams.get('year') ?? '';
	const genres = searchParams.get("genres") ?? "";
	const vote_average = searchParams.get("vote_average") ?? "";

  const handleSubmit = (e) => {
		e.preventDefault();
		const query = e.target.elements.search.value;
		if (query === '') alert('Your query is empty!');
    setSearchParams({ query });
	}

	useEffect(() => {
		async function renderGenres() {
			try {
				const {data} = await getAllGenres();
				setGenresList(data.genres);
			} catch (error) {
				console.log(error);
			}
		}

		renderGenres();
	}, [])

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

	useEffect(() => {
		async function getFilteredMovies() {
			try {
				const { data } = await discoverMovie(genres, year, vote_average);
				setFilteredMovies(data.results);
			} catch (error) {
				console.log(error);
			}
		}

		getFilteredMovies();
	}, [year, genres, vote_average]);

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
					/>
				</label>

				<button className={style.searchButton} type="submit">
					Search
				</button>
			</form>

			{genresList && (
				<Formik
					initialValues={{
						genres: "80",
						year: "2012",
						vote_average: "6",
					}}
					onSubmit={(values) => setSearchParams({ ...values })}
				>
					<Form>
						<Field component="select" name="genres">
							{genresList.map(({ id, name }) => {
								return (
									<option key={id} value={id}>
										{name}
									</option>
								);
							})}
						</Field>
						<Field type="text" name="year" />
						<Field type="number" name="vote_average" />
						<button type="submit">Search</button>
					</Form>
				</Formik>
			)}

			{filteredMovies && (
				<MoviesList
					moviesToRender={filteredMovies}
					handleFavorites={addToFavorites}
				/>
			)}

			{searchQuery !== "" && (
				<MoviesList
					moviesToRender={searchedMovies}
					handleFavorites={addToFavorites}
				/>
			)}
		</>
	);
}