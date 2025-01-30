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
	const sort_by = searchParams.get('sort_by');


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
					release_date_to,
					sort_by
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
	}, [genres, release_date_from, release_date_to, vote_average, sort_by, page]);

  return (
		<>
			{genresList && (
				<Formik
					initialValues={{
						genres: "",
						release_date_from: "",
						release_date_to: "",
						vote_average: "6",
						sort_by: "popularity.desc",
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
						<label className={style.label} htmlFor="">
							Sort by
						</label>
						<Field component="select" name="sort_by">
							<option value="original_title.asc">original_title.asc</option>
							<option value="original_title.desc">original_title.desc</option>
							<option value="popularity.asc">popularity.asc</option>
							<option value="popularity.desc">popularity.desc</option>
							<option value="revenue.asc">revenue.asc</option>
							<option value="revenue.desc">revenue.desc</option>
							<option value="primary_release_date.asc">
								primary_release_date.asc
							</option>
							<option value="title.asc">title.asc</option>
							<option value="title.desc">title.desc</option>
							<option value="primary_release_date.desc">
								primary_release_date.desc
							</option>
							<option value="vote_average.asc">vote_average.asc</option>
							<option value="vote_average.desc">vote_average.desc</option>
							<option value="vote_count.asc">vote_count.asc</option>
							<option value="vote_count.desc">vote_count.desc</option>
						</Field>

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