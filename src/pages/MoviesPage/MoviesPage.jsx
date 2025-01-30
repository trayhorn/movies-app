import style from "./MoviesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllGenres, discoverMovie } from "../../api";
import MoviesSearchList from "../../components/MoviesSearchList/MoviesSearchList";
import { Formik, Field, Form } from "formik";

export default function MoviesPage() {
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [genresList, setGenresList] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	const hasMoreRef = useRef(true);

	const genres = searchParams.get("genres");
	const vote_average = searchParams.get("vote_average");
	const release_date_from = searchParams.get("release_date_from");
	const release_date_to = searchParams.get("release_date_to");


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
		async function getFilteredMovies() {
			try {
				const { data } = await discoverMovie(
					page,
					genres,
					vote_average,
					release_date_from,
					release_date_to
				);

				if (data.total_pages === page) hasMoreRef.current = false;

				setFilteredMovies((prevState) =>
					page === 1 ? data.results : [...prevState, ...data.results]
				);
			} catch (error) {
				console.log(error);
			}
		}

		getFilteredMovies();
	}, [genres, release_date_from, release_date_to, vote_average, page]);

  return (
		<>
			{genresList && (
				<Formik
					initialValues={{
						genres: "",
						release_date_from: "",
						release_date_to: "",
						vote_average: "6",
					}}
					onSubmit={(values) => {
						const filteredValues = Object.fromEntries(
							Object.entries(values).filter(([_, value]) => value !== "")
						);
						setPage(1);
						setSearchParams(filteredValues);
					}}
				>
					<Form className={style.form}>
						<label className={style.label} htmlFor="">
							Genre
						</label>
						<Field component="select" name="genres">
							{genresList.map(({ id, name }) => {
								return (
									<option key={id} value={id}>
										{name}
									</option>
								);
							})}
						</Field>
						<label className={style.label} htmlFor="">
							Release date from
						</label>
						<Field type="date" name="release_date_from" />
						<label className={style.label} htmlFor="">
							Release date to
						</label>
						<Field type="date" name="release_date_to" />
						<label className={style.label} htmlFor="">
							Vote average
						</label>
						<Field type="number" name="vote_average" />
						<button type="submit">Search</button>
					</Form>
				</Formik>
			)}

			{filteredMovies && (
				<MoviesSearchList
					moviesToRender={filteredMovies}
					fetchMore={() => setPage((prev) => prev + 1)}
					hasMore={hasMoreRef.current}
				/>
			)}
		</>
	);
}