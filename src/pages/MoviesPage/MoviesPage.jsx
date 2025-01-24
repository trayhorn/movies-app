import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	addToFavorites,
	getAllGenres,
	discoverMovie,
} from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { Formik, Field, Form } from "formik";

export default function MoviesPage() {
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [genresList, setGenresList] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	const year = searchParams.get('year') ?? '';
	const genres = searchParams.get("genres") ?? "";
	const vote_average = searchParams.get("vote_average") ?? "";

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
		if (year === '' || genres === '' || vote_average === '') {
			return
		}
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
		</>
	);
}